package ma.fstg.stocky.service.impl.admin.commun;


import ma.fstg.stocky.bean.core.commun.Client;
import ma.fstg.stocky.dao.criteria.core.commun.ClientCriteria;
import ma.fstg.stocky.dao.facade.core.commun.ClientDao;
import ma.fstg.stocky.dao.specification.core.commun.ClientSpecification;
import ma.fstg.stocky.service.facade.admin.commun.ClientAdminService;
import ma.fstg.stocky.zynerator.service.AbstractServiceImpl;
import ma.fstg.stocky.zynerator.util.ListUtil;
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
