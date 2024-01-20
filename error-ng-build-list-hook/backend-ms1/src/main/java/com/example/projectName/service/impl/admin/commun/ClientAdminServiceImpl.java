package com.example.projectName.service.impl.admin.commun;


import com.example.projectName.bean.core.commun.Client;
import com.example.projectName.dao.criteria.core.commun.ClientCriteria;
import com.example.projectName.dao.facade.core.commun.ClientDao;
import com.example.projectName.dao.specification.core.commun.ClientSpecification;
import com.example.projectName.service.facade.admin.commun.ClientAdminService;
import com.example.projectName.zynerator.service.AbstractServiceImpl;
import com.example.projectName.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;





import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
@Service
public class ClientAdminServiceImpl extends AbstractServiceImpl<Client, ClientCriteria, ClientDao> implements ClientAdminService {





    public Client findByReferenceEntity(Client t){
        return  dao.findByCin(t.getCin());
    }


    public List<Client> findAllOptimized() {
        return dao.findAllOptimized();
    }





    public void configure() {
        super.configure(Client.class, ClientSpecification.class);
    }



    public ClientAdminServiceImpl(ClientDao dao) {
        super(dao);
    }

}
