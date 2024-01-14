package ma.fstg.stocky.zynerator.service;

import ma.fstg.stocky.zynerator.audit.AuditBusinessObjectEnhanced;
import ma.fstg.stocky.zynerator.criteria.BaseCriteria;
import ma.fstg.stocky.zynerator.repository.AbstractRepository;

public abstract class AbstractReferentielServiceImpl<T extends AuditBusinessObjectEnhanced, CRITERIA extends BaseCriteria, REPO extends AbstractRepository<T, Long>> extends AbstractServiceImpl<T, CRITERIA, REPO> {

    public AbstractReferentielServiceImpl(REPO dao) {
        super(dao);
    }

}
