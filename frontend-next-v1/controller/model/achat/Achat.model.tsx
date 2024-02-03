import {BaseDto} from "@/utils/zynerator/dto/BaseDto.model";

import {ClientDto} from '@/controller/model/commun/Client.model';

export class AchatDto extends BaseDto{

    public reference: string;

   public dateAchat: null | Date;

    public total: null | number;

    public totalPaye: null | number;

    public description: string;

    public client: null | ClientDto ;


    constructor() {
        super();
        this.reference = '';
        this.dateAchat = null;
        this.total = null;
        this.totalPaye = null;
        this.description = '';
        this.client = null;
        }

    getClassName() {
        return "Achat";
    }
}
