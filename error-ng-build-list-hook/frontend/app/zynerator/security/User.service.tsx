import {UserDto} from "../dto/UserDto.model";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL  as string;
import AbstractService from "app/zynerator/service/AbstractService";


import { AxiosResponse } from "axios";
import axios from 'axios';
import {UserCriteria} from "../criteria/UserCriteria.model";

export class UserService extends AbstractService<UserDto, UserCriteria>{

    constructor() {
        super(ADMIN_URL, 'user/');
    }

    getDashboardKPI(): Promise<AxiosResponse<any>> {
        return axios.get(`${ADMIN_URL}dashboard/utilisateur`);
    }

};
