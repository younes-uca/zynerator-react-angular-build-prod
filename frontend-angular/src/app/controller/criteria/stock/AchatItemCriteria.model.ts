import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {ProduitCriteria} from '../commun/ProduitCriteria.model';
import {AchatCriteria} from './AchatCriteria.model';

export class AchatItemCriteria  extends BaseCriteria  {

    public id: number;
     public prixUnitaire: number;
     public prixUnitaireMin: number;
     public prixUnitaireMax: number;
     public prixVente: number;
     public prixVenteMin: number;
     public prixVenteMax: number;
     public quantite: number;
     public quantiteMin: number;
     public quantiteMax: number;
     public quantiteAvoir: number;
     public quantiteAvoirMin: number;
     public quantiteAvoirMax: number;
     public remise: number;
     public remiseMin: number;
     public remiseMax: number;
  public produit: ProduitCriteria ;
  public produits: Array<ProduitCriteria> ;
  public achat: AchatCriteria ;
  public achats: Array<AchatCriteria> ;

}
