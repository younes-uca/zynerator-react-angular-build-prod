import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {ClientCriteria} from 'app/controller/dto/commun/Client.model';

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
        this.reference = '';
        this.dateAchat = null;
        this.total = null;
        this.totalPaye = null;
        this.description = '';
        this.client;
        this.achatItems = new Array<AchatItemDto>();
        }

    getClassName() {
        return "Achat";
    }
}
