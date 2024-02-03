import {BaseDto} from "../../../zynerator/dto/BaseDto.model";


export class ClientDto extends BaseDto{

    public cin: string;

    public nom: string;

    public tel: string;

    public email: string;

    public adresse: string;

    public description: string;

    public creance: null | number;



    constructor() {
        super();
        this.cin = '';
        this.nom = 'select a client';
        this.tel = '';
        this.email = '';
        this.adresse = '';
        this.description = '';
        this.creance = null;
        }

}
