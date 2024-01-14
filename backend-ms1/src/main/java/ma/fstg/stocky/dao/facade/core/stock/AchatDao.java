package ma.fstg.stocky.dao.facade.core.stock;

import org.springframework.data.jpa.repository.Query;
import ma.fstg.stocky.zynerator.repository.AbstractRepository;
import ma.fstg.stocky.bean.core.stock.Achat;
import org.springframework.stereotype.Repository;
import ma.fstg.stocky.bean.core.stock.Achat;
import java.util.List;


@Repository
public interface AchatDao extends AbstractRepository<Achat,Long>  {
    Achat findByReference(String reference);
    int deleteByReference(String reference);

    List<Achat> findByClientId(Long id);
    int deleteByClientId(Long id);
    long countByClientCin(String cin);

    @Query("SELECT NEW Achat(item.id,item.reference) FROM Achat item")
    List<Achat> findAllOptimized();

}
