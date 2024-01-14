package ma.fstg.stocky.dao.facade.core.commun;

import org.springframework.data.jpa.repository.Query;
import ma.fstg.stocky.zynerator.repository.AbstractRepository;
import ma.fstg.stocky.bean.core.commun.Produit;
import org.springframework.stereotype.Repository;
import ma.fstg.stocky.bean.core.commun.Produit;
import java.util.List;


@Repository
public interface ProduitDao extends AbstractRepository<Produit,Long>  {
    Produit findByReference(String reference);
    int deleteByReference(String reference);


    @Query("SELECT NEW Produit(item.id,item.reference) FROM Produit item")
    List<Produit> findAllOptimized();

}
