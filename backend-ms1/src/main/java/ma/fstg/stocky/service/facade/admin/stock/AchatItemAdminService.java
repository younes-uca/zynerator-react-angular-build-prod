package ma.fstg.stocky.service.facade.admin.stock;

import java.util.List;
import ma.fstg.stocky.bean.core.stock.AchatItem;
import ma.fstg.stocky.dao.criteria.core.stock.AchatItemCriteria;
import ma.fstg.stocky.zynerator.service.IService;



public interface AchatItemAdminService extends  IService<AchatItem,AchatItemCriteria>  {

    List<AchatItem> findByProduitId(Long id);
    int deleteByProduitId(Long id);
    long countByProduitReference(String reference);
    List<AchatItem> findByAchatId(Long id);
    int deleteByAchatId(Long id);
    long countByAchatReference(String reference);



}
