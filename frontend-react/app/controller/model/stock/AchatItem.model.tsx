import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {ProduitCriteria} from 'app/controller/dto/commun/Produit.model';
import {AchatCriteria} from 'app/controller/dto/stock/Achat.model';

export class AchatItemDto extends BaseDto{

    public prixUnitaire: null | number;

    public prixVente: null | number;

    public quantite: null | number;

    public quantiteAvoir: null | number;

    public remise: null | number;

    public produit: ProduitDto ;
    public achat: AchatDto ;


    constructor() {
        super();
        this.prixUnitaire = null;
        this.prixVente = null;
        this.quantite = null;
        this.quantiteAvoir = null;
        this.remise = null;
        this.produit;
        this.achat;
        }

    getClassName() {
        return "Achat item";
    }
}
