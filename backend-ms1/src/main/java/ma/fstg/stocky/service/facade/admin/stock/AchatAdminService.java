package ma.fstg.stocky.service.facade.admin.stock;

import java.util.List;
import ma.fstg.stocky.bean.core.stock.Achat;
import ma.fstg.stocky.dao.criteria.core.stock.AchatCriteria;
import ma.fstg.stocky.zynerator.service.IService;



public interface AchatAdminService extends  IService<Achat,AchatCriteria>  {

    List<Achat> findByClientId(Long id);
    int deleteByClientId(Long id);
    long countByClientCin(String cin);



}
