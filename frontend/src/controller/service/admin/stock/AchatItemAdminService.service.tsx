import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {AchatItemDto} from '../../../model/stock/AchatItem.model';
import {AchatItemCriteria} from '../../../criteria/stock/AchatItemCriteria.model';

export class AchatItemAdminService extends AbstractService<AchatItemDto, AchatItemCriteria>{

    constructor() {
        super(ADMIN_URL , 'achatItem/');
    }

};
