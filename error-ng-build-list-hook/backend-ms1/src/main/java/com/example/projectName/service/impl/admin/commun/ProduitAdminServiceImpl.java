package com.example.projectName.service.impl.admin.commun;


import com.example.projectName.bean.core.commun.Produit;
import com.example.projectName.dao.criteria.core.commun.ProduitCriteria;
import com.example.projectName.dao.facade.core.commun.ProduitDao;
import com.example.projectName.dao.specification.core.commun.ProduitSpecification;
import com.example.projectName.service.facade.admin.commun.ProduitAdminService;
import com.example.projectName.zynerator.service.AbstractServiceImpl;
import com.example.projectName.zynerator.util.ListUtil;
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
