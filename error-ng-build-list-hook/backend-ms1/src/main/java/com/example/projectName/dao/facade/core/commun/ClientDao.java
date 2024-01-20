package com.example.projectName.dao.facade.core.commun;

import org.springframework.data.jpa.repository.Query;
import com.example.projectName.zynerator.repository.AbstractRepository;
import com.example.projectName.bean.core.commun.Client;
import org.springframework.stereotype.Repository;
import com.example.projectName.bean.core.commun.Client;
import java.util.List;


@Repository
public interface ClientDao extends AbstractRepository<Client,Long>  {
    Client findByCin(String cin);
    int deleteByCin(String cin);


    @Query("SELECT NEW Client(item.id,item.nom) FROM Client item")
    List<Client> findAllOptimized();

}
