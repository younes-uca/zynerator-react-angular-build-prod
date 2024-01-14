package ma.fstg.stocky.service.impl.admin.commun;


import ma.fstg.stocky.bean.core.commun.Produit;
import ma.fstg.stocky.dao.criteria.core.commun.ProduitCriteria;
import ma.fstg.stocky.dao.facade.core.commun.ProduitDao;
import ma.fstg.stocky.dao.specification.core.commun.ProduitSpecification;
import ma.fstg.stocky.service.facade.admin.commun.ProduitAdminService;
import ma.fstg.stocky.zynerator.service.AbstractServiceImpl;
import ma.fstg.stocky.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;





import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
@Service
public class ProduitAdminServiceImpl extends AbstractServiceImpl<Produit, ProduitCriteria, ProduitDao> implements ProduitAdminService {





    public Produit findByReferenceEntity(Produit t){
        return  dao.findByReference(t.getReference());
    }


    public List<Produit> findAllOptimized() {
        return dao.findAllOptimized();
    }





    public void configure() {
        super.configure(Produit.class, ProduitSpecification.class);
    }



    public ProduitAdminServiceImpl(ProduitDao dao) {
        super(dao);
    }

}
