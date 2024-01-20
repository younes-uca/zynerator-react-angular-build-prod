package com.example.projectName.service.facade.admin.stock;

import java.util.List;
import com.example.projectName.bean.core.stock.Achat;
import com.example.projectName.dao.criteria.core.stock.AchatCriteria;
import com.example.projectName.zynerator.service.IService;



public interface AchatAdminService extends  IService<Achat,AchatCriteria>  {

    List<Achat> findByClientId(Long id);
    int deleteByClientId(Long id);
    long countByClientCin(String cin);



}
