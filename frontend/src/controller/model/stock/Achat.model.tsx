import {BaseDto} from "../../../zynerator/dto/BaseDto.model";

import {ClientDto} from '../commun/Client.model';

export class AchatDto extends BaseDto{

    public reference: string;

   public dateAchat: Date;

    public total: null | number;

    public totalPaye: null | number;

    public description: string;

    public client: ClientDto ;
     public achatItems: Array<AchatItemDto>;


    constructor() {
        super();
        this.reference = 'select a achat';
        this.dateAchat = null;
        this.total = null;
        this.totalPaye = null;
        this.description = '';
        this.client = new ClientDto() ;
        this.achatItems = new Array<AchatItemDto>();
        }

}
