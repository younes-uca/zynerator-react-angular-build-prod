package com.example.projectName.service.impl.admin.stock;


import com.example.projectName.bean.core.stock.AchatItem;
import com.example.projectName.dao.criteria.core.stock.AchatItemCriteria;
import com.example.projectName.dao.facade.core.stock.AchatItemDao;
import com.example.projectName.dao.specification.core.stock.AchatItemSpecification;
import com.example.projectName.service.facade.admin.stock.AchatItemAdminService;
import com.example.projectName.zynerator.service.AbstractServiceImpl;
import com.example.projectName.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;





import org.springframework.beans.factory.annotation.Autowired;

import com.example.projectName.service.facade.admin.stock.AchatAdminService ;
import com.example.projectName.bean.core.stock.Achat ;
import com.example.projectName.service.facade.admin.commun.ProduitAdminService ;
import com.example.projectName.bean.core.commun.Produit ;

import java.util.List;
@Service
public class AchatItemAdminServiceImpl extends AbstractServiceImpl<AchatItem, AchatItemCriteria, AchatItemDao> implements AchatItemAdminService {






    public List<AchatItem> findByProduitId(Long id){
        return dao.findByProduitId(id);
    }
    public int deleteByProduitId(Long id){
        return dao.deleteByProduitId(id);
    }
    public long countByProduitReference(String reference){
        return dao.countByProduitReference(reference);
    }
    public List<AchatItem> findByAchatId(Long id){
        return dao.findByAchatId(id);
    }
    public int deleteByAchatId(Long id){
        return dao.deleteByAchatId(id);
    }
    public long countByAchatReference(String reference){
        return dao.countByAchatReference(reference);
    }






    public void configure() {
        super.configure(AchatItem.class, AchatItemSpecification.class);
    }


    @Autowired
    private AchatAdminService achatService ;
    @Autowired
    private ProduitAdminService produitService ;

    public AchatItemAdminServiceImpl(AchatItemDao dao) {
        super(dao);
    }

}
