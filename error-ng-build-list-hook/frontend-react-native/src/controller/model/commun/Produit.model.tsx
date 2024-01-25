import {BaseDto} from "../../../zynerator/dto/BaseDto.model";


export class ProduitDto extends BaseDto{

    public reference: string;

    public libelle: string;

    public barcode: string;

    public discription: string;

    public prixAchatMoyen: null | number;

    public quantite: null | number;

    public seuilAlert: null | number;



    constructor() {
        super();
        this.reference = 'select a produit';
        this.libelle = '';
        this.barcode = '';
        this.discription = '';
        this.prixAchatMoyen = null;
        this.quantite = null;
        this.seuilAlert = null;
        }

}
