/* eslint-disable @next/next/no-img-element */
"use client"
import { AppMenuItem } from 'types/layout';
import { MenuProvider } from './context/menucontext';
import AppMenuitem from './AppMenuitem';
import {AuthService} from '@/utils/zynerator/security/Auth.service';
import React, {useEffect, useState} from 'react';


const AppMenu = () => {

    const [model,setModel] = useState<AppMenuItem[]>([] as AppMenuItem[]);
    const authService = new AuthService();
        const modelAdmin: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard'}]
        },


        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '',
            items: [

                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            to: '/auth/error'
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            to: '/auth/access'
                        }
                    ]
                },
                {
                    label: 'Achat',
                    icon: 'pi pi-fw pi-plus-circle',
                    items: [
                      {
                      label: 'Liste achat',
                     to: '/admin/view/achat/achat'
                      },
                    ]
                    },
                {
                    label: 'Client',
                    icon: 'pi pi-fw pi-plus-circle',
                    items: [
                      {
                      label: 'Liste client',
                     to: '/admin/view/commun/client'
                      },
                    ]
                    },
                {
                    label: 'Produit',
                    icon: 'pi pi-fw pi-plus-circle',
                    items: [
                      {
                      label: 'Liste produit',
                     to: '/admin/view/commun/produit'
                      },
                    ]
                    },
            ]
        },

    ];

    useEffect(()=>{
        const roleConnectedUser = authService.getRoleConnectedUser();
        if(roleConnectedUser === 'ROLE_ADMIN'){
            setModel(modelAdmin)
        }
    },[])

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label}/> :
                        <li className="menu-separator"></li>;
                })}


            </ul>
        </MenuProvider>
    );
};


export default AppMenu;
