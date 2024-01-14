/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef } from '/types/types';
import { LayoutContext } from '/layout/context/layoutcontext';
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { AuthService } from 'app/zynerator/security/Auth.service';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';


const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const router = useRouter();

    const authService = new AuthService();

    const signOut = () => {
        authService.signOut();
        router.push("/auth");
    }


    useImperativeHandle(ref, () => ({
        /*menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current*/
    }));


    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" className="w-full" />;


    const languages = ['en', 'fr', 'es','ar'];
    //appel de i18n qui la translation
    const { t, i18n } = useTranslation();
    const [showOptions, setShowOptions] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        setShowOptions(false);
    };


    return (

        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>GED</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <div>
                    <Dropdown
                        value={selectedLanguage}
                        options={languages.map(lang => ({ label: t(lang), value: lang }))}
                        onChange={(e) => {
                            setSelectedLanguage(e.value);
                            handleLanguageChange(e.value);
                        }}
                        className=" p-dropdown rounded-md  text-lg   hover:border-bleu-300 focus:border-bleu-300  " />
                </div>

                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>

                <button type="button" className="p-link layout-topbar-button" onClick={signOut}>
                    <i className="pi pi-sign-out"></i>
                    <span>Deconnexion</span>
                </button>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;