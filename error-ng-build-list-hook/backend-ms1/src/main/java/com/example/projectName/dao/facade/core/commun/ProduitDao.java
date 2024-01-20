package com.example.projectName.dao.facade.core.commun;

import org.springframework.data.jpa.repository.Query;
import com.example.projectName.zynerator.repository.AbstractRepository;
import com.example.projectName.bean.core.commun.Produit;
import org.springframework.stereotype.Repository;
import com.example.projectName.bean.core.commun.Produit;
import java.util.List;


@Repository
public interface ProduitDao extends AbstractRepository<Produit,Long>  {
    Produit findByReference(String reference);
    int deleteByReference(String reference);


    @Query("SELECT NEW Produit(item.id,item.reference) FROM Produit item")
    List<Produit> findAllOptimized();

}
