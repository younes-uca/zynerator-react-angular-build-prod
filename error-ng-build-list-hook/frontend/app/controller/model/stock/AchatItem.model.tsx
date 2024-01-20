import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {Achat} from 'app/controller/dto/stock/Achat.model';
import {Produit} from 'app/controller/dto/commun/Produit.model';

export class AchatItemDto extends BaseDto{

    public prixUnitaire: null | number;

    public prixVente: null | number;

    public quantite: null | number;

    public quantiteAvoir: null | number;

    public remise: null | number;

    public produit: null | ProduitDto ;
    public achat: null | AchatDto ;


    constructor() {
        super();
        this.prixUnitaire = null;
        this.prixVente = null;
        this.quantite = null;
        this.quantiteAvoir = null;
        this.remise = null;
        this.produit = null;
        this.achat = null;
        }

    getClassName() {
        return "Achat item";
    }
}
