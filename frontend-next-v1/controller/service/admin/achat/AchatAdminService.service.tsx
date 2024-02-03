import { ADMIN_URL } from '@/layout/AppConfig';
import AbstractService from "@/utils/zynerator/service/AbstractService";

import {AchatDto} from '@/controller/model/achat/Achat.model';
import {AchatCriteria} from '@/controller/criteria/achat/AchatCriteria.model';

export class AchatAdminService extends AbstractService<AchatDto, AchatCriteria>{

    constructor() {
        super(ADMIN_URL , 'achat/');
    }

};
