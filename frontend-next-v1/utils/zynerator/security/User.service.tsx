import {UserDto} from "../dto/UserDto.model";

// import { ADMIN_URL, API_URL } from "layout/AppConfig";
// import AbstractService from "app/zynerator/service/AbstractService";


import { AxiosResponse } from "axios";
import axios from 'axios';
// import {UserCriteria} from "../criteria/UserCriteria.model";
import { ADMIN_URL, API_URL } from "@/layout/AppConfig";
import AbstractService from "../service/AbstractService";
import { UserCriteria } from "../criteria/UserCriteria.model";

export class UserService extends AbstractService<UserDto, UserCriteria>{

    constructor() {
        super(API_URL, 'users/');
    }

    getDashboardKPI(): Promise<AxiosResponse<any>> {
        return axios.get(`${ADMIN_URL}dashboard/utilisateur`);
    }

};
