import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {ClientCriteria} from 'app/controller/criteria/commun/ClientCriteria';

export class AchatCriteria  extends  BaseCriteria {

    public id: number;

    public reference: string;
    public referenceLike: string;
    public dateAchat: Date;
    public dateAchatFrom: Date;
    public dateAchatTo: Date;
     public total: null | number;
     public totalMin: null | number;
     public totalMax: null | number;
     public totalPaye: null | number;
     public totalPayeMin: null | number;
     public totalPayeMax: null | number;
    public description: string;
    public descriptionLike: string;
  public client: ClientCriteria ;
  public clients: Array<ClientCriteria> ;
      public achatItems: Array<AchatItemCriteria>;

    constructor() {
        super();
        this.reference = '';
        this.referenceLike = '';
        this.dateAchat = null;
        this.dateAchatFrom  = null;
        this.dateAchatTo = null;
        this.total = null;
        this.totalMin = null;
        this.totalMax = null;
        this.totalPaye = null;
        this.totalPayeMin = null;
        this.totalPayeMax = null;
        this.description = '';
        this.descriptionLike = '';
        this.client ;
        this.clients = new Array<ClientCriteria>() ;
    }

}
