package ma.fstg.stocky.dao.facade.core.stock;

import ma.fstg.stocky.zynerator.repository.AbstractRepository;
import ma.fstg.stocky.bean.core.stock.AchatItem;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface AchatItemDao extends AbstractRepository<AchatItem,Long>  {

    List<AchatItem> findByProduitId(Long id);
    int deleteByProduitId(Long id);
    long countByProduitReference(String reference);
    List<AchatItem> findByAchatId(Long id);
    int deleteByAchatId(Long id);
    long countByAchatReference(String reference);


}
