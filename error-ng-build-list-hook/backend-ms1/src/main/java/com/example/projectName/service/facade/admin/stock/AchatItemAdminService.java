package com.example.projectName.service.facade.admin.stock;

import java.util.List;
import com.example.projectName.bean.core.stock.AchatItem;
import com.example.projectName.dao.criteria.core.stock.AchatItemCriteria;
import com.example.projectName.zynerator.service.IService;



public interface AchatItemAdminService extends  IService<AchatItem,AchatItemCriteria>  {

    List<AchatItem> findByProduitId(Long id);
    int deleteByProduitId(Long id);
    long countByProduitReference(String reference);
    List<AchatItem> findByAchatId(Long id);
    int deleteByAchatId(Long id);
    long countByAchatReference(String reference);



}
