import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {AchatDto} from '../../../model/stock/Achat.model';
import {AchatCriteria} from '../../../criteria/stock/AchatCriteria.model';

export class AchatAdminService extends AbstractService<AchatDto, AchatCriteria>{

    constructor() {
        super(ADMIN_URL , 'achat/');
    }

};
