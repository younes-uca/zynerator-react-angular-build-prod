package ma.fstg.stocky.service.impl.admin.stock;


import ma.fstg.stocky.bean.core.stock.AchatItem;
import ma.fstg.stocky.dao.criteria.core.stock.AchatItemCriteria;
import ma.fstg.stocky.dao.facade.core.stock.AchatItemDao;
import ma.fstg.stocky.dao.specification.core.stock.AchatItemSpecification;
import ma.fstg.stocky.service.facade.admin.stock.AchatItemAdminService;
import ma.fstg.stocky.zynerator.service.AbstractServiceImpl;
import ma.fstg.stocky.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;





import org.springframework.beans.factory.annotation.Autowired;

import ma.fstg.stocky.service.facade.admin.stock.AchatAdminService ;
import ma.fstg.stocky.bean.core.stock.Achat ;
import ma.fstg.stocky.service.facade.admin.commun.ProduitAdminService ;
import ma.fstg.stocky.bean.core.commun.Produit ;

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
