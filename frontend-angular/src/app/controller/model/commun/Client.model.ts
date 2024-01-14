import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ClientDto extends BaseDto{

    public cin: string;

    public nom: string;


    public email: string;


    public description: string;

    public creance: null | number;

    

    constructor() {
        super();

        this.cin = '';
        this.nom = '';
        this.email = '';
        this.description = '';
        this.creance = null;

        }

}
