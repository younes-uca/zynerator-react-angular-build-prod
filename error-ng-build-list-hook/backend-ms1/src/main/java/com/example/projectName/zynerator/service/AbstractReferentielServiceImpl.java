package com.example.projectName.zynerator.service;

import com.example.projectName.zynerator.audit.AuditBusinessObjectEnhanced;
import com.example.projectName.zynerator.criteria.BaseCriteria;
import com.example.projectName.zynerator.repository.AbstractRepository;

public abstract class AbstractReferentielServiceImpl<T extends AuditBusinessObjectEnhanced, CRITERIA extends BaseCriteria, REPO extends AbstractRepository<T, Long>> extends AbstractServiceImpl<T, CRITERIA, REPO> {

    public AbstractReferentielServiceImpl(REPO dao) {
        super(dao);
    }

}
