package  com.example.projectName.dao.specification.core.stock;

import com.example.projectName.dao.criteria.core.stock.AchatCriteria;
import com.example.projectName.bean.core.stock.Achat;
import com.example.projectName.zynerator.specification.AbstractSpecification;


public class AchatSpecification extends  AbstractSpecification<AchatCriteria, Achat>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("reference", criteria.getReference(),criteria.getReferenceLike());
        addPredicate("dateAchat", criteria.getDateAchat(), criteria.getDateAchatFrom(), criteria.getDateAchatTo());
        addPredicateBigDecimal("total", criteria.getTotal(), criteria.getTotalMin(), criteria.getTotalMax());
        addPredicateBigDecimal("totalPaye", criteria.getTotalPaye(), criteria.getTotalPayeMin(), criteria.getTotalPayeMax());
        addPredicateFk("client","id", criteria.getClient()==null?null:criteria.getClient().getId());
        addPredicateFk("client","id", criteria.getClients());
        addPredicateFk("client","cin", criteria.getClient()==null?null:criteria.getClient().getCin());
    }

    public AchatSpecification(AchatCriteria criteria) {
        super(criteria);
    }

    public AchatSpecification(AchatCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
