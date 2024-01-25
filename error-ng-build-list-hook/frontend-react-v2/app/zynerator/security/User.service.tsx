import {UserDto} from "../dto/UserDto.model";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL  as string;
import AbstractService from "app/zynerator/service/AbstractService";


import { AxiosResponse } from "axios";
import axios from 'axios';
import {UserCriteria} from "../criteria/UserCriteria.model";

const CHANGE_PASSWORD_URL = process.env.NEXT_PUBLIC_CHANGE_PASSWORD_URL as string;

export class UserService extends AbstractService<UserDto, UserCriteria>{


    constructor() {
        super(ADMIN_URL, 'user/');
    }



    changePassword(username: string, password: string): Promise<AxiosResponse<any>> {
        let user = new UserDto();
        user.password = password;
        user.username = username;
        return axios.put(CHANGE_PASSWORD_URL, user);
    }


};
