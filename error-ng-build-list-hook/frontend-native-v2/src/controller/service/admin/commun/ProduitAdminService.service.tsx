import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {ProduitDto} from '../../../model/commun/Produit.model';
import {ProduitCriteria} from '../../../criteria/commun/ProduitCriteria.model';

export class ProduitAdminService extends AbstractService<ProduitDto, ProduitCriteria>{

    constructor() {
        super(ADMIN_URL , 'produit/');
    }

};
