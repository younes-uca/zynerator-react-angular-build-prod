package com.example.projectName.service.impl.admin.stock;


import com.example.projectName.bean.core.stock.Achat;
import com.example.projectName.dao.criteria.core.stock.AchatCriteria;
import com.example.projectName.dao.facade.core.stock.AchatDao;
import com.example.projectName.dao.specification.core.stock.AchatSpecification;
import com.example.projectName.service.facade.admin.stock.AchatAdminService;
import com.example.projectName.zynerator.service.AbstractServiceImpl;
import com.example.projectName.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;





import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.example.projectName.service.facade.admin.stock.AchatItemAdminService ;
import com.example.projectName.bean.core.stock.AchatItem ;
import com.example.projectName.service.facade.admin.commun.ClientAdminService ;
import com.example.projectName.bean.core.commun.Client ;

import java.util.List;
@Service
public class AchatAdminServiceImpl extends AbstractServiceImpl<Achat, AchatCriteria, AchatDao> implements AchatAdminService {


    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public Achat create(Achat t) {
        super.create(t);
        if (t.getAchatItems() != null) {
                t.getAchatItems().forEach(element-> {
                    element.setAchat(t);
                    achatItemService.create(element);
            });
        }
        return t;

    }

    public Achat findWithAssociatedLists(Long id){
        Achat result = dao.findById(id).orElse(null);
        if(result!=null && result.getId() != null) {
            result.setAchatItems(achatItemService.findByAchatId(id));
        }
        return result;
    }
    @Transactional
    public void deleteAssociatedLists(Long id) {
        achatItemService.deleteByAchatId(id);
    }


    public void updateWithAssociatedLists(Achat achat){
    if(achat !=null && achat.getId() != null){
            List<List<AchatItem>> resultAchatItems= achatItemService.getToBeSavedAndToBeDeleted(achatItemService.findByAchatId(achat.getId()),achat.getAchatItems());
            achatItemService.delete(resultAchatItems.get(1));
            ListUtil.emptyIfNull(resultAchatItems.get(0)).forEach(e -> e.setAchat(achat));
            achatItemService.update(resultAchatItems.get(0),true);
    }
    }



    public Achat findByReferenceEntity(Achat t){
        return  dao.findByReference(t.getReference());
    }

    public List<Achat> findByClientId(Long id){
        return dao.findByClientId(id);
    }
    public int deleteByClientId(Long id){
        return dao.deleteByClientId(id);
    }
    public long countByClientCin(String cin){
        return dao.countByClientCin(cin);
    }

    public List<Achat> findAllOptimized() {
        return dao.findAllOptimized();
    }





    public void configure() {
        super.configure(Achat.class, AchatSpecification.class);
    }


    @Autowired
    private AchatItemAdminService achatItemService ;
    @Autowired
    private ClientAdminService clientService ;

    public AchatAdminServiceImpl(AchatDao dao) {
        super(dao);
    }

}
