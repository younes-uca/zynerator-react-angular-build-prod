package ma.fstg.stocky.dao.facade.core.commun;

import org.springframework.data.jpa.repository.Query;
import ma.fstg.stocky.zynerator.repository.AbstractRepository;
import ma.fstg.stocky.bean.core.commun.Client;
import org.springframework.stereotype.Repository;
import ma.fstg.stocky.bean.core.commun.Client;
import java.util.List;


@Repository
public interface ClientDao extends AbstractRepository<Client,Long>  {
    Client findByCin(String cin);
    int deleteByCin(String cin);


    @Query("SELECT NEW Client(item.id,item.nom) FROM Client item")
    List<Client> findAllOptimized();

}
