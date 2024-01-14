package ma.fstg.stocky.service.impl.admin.stock;


import ma.fstg.stocky.bean.core.stock.Achat;
import ma.fstg.stocky.dao.criteria.core.stock.AchatCriteria;
import ma.fstg.stocky.dao.facade.core.stock.AchatDao;
import ma.fstg.stocky.dao.specification.core.stock.AchatSpecification;
import ma.fstg.stocky.service.facade.admin.stock.AchatAdminService;
import ma.fstg.stocky.zynerator.service.AbstractServiceImpl;
import ma.fstg.stocky.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;





import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ma.fstg.stocky.service.facade.admin.stock.AchatItemAdminService ;
import ma.fstg.stocky.bean.core.stock.AchatItem ;
import ma.fstg.stocky.service.facade.admin.commun.ClientAdminService ;
import ma.fstg.stocky.bean.core.commun.Client ;

import java.util.List;
@Service
public class AchatAdminServiceImpl extends AbstractServiceImpl<Achat, AchatCriteria, AchatDao> implements AchatAdminService {


    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public Achat create(Achat t) {
    
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
