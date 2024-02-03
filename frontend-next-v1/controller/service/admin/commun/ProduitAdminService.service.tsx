import { ADMIN_URL } from '@/layout/AppConfig';
import AbstractService from "@/utils/zynerator/service/AbstractService";

import {ProduitDto} from '@/controller/model/commun/Produit.model';
import {ProduitCriteria} from '@/controller/criteria/commun/ProduitCriteria.model';

export class ProduitAdminService extends AbstractService<ProduitDto, ProduitCriteria>{

    constructor() {
        super(ADMIN_URL , 'produit/');
    }

};
