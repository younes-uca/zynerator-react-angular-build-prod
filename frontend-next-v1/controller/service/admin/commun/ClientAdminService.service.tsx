import { ADMIN_URL } from '@/layout/AppConfig';
import AbstractService from "@/utils/zynerator/service/AbstractService";

import {ClientDto} from '@/controller/model/commun/Client.model';
import {ClientCriteria} from '@/controller/criteria/commun/ClientCriteria.model';

export class ClientAdminService extends AbstractService<ClientDto, ClientCriteria>{

    constructor() {
        super(ADMIN_URL , 'client/');
    }

};
