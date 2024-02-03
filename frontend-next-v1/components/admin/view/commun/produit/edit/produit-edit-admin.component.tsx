import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {TabView, TabPanel} from 'primereact/tabview';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { InputSwitch } from 'primereact/inputswitch';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';


import {MessageService} from '@/utils/zynerator/service/MessageService';


import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

import useEditHook from "@/utils/zyhook/useEdit.hook";


import {ProduitAdminService} from '@/controller/service/admin/commun/ProduitAdminService.service';
import  {ProduitDto}  from '@/controller/model/commun/Produit.model';
import {ProduitCriteria} from "@/controller/criteria/commun/ProduitCriteria.model";




type ProduitEditAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: ProduitDto
    update: (item: ProduitDto) => void,
    list: ProduitDto[],
    service: ProduitAdminService,
    t: TFunction
}
const Edit: React.FC<ProduitEditAdminType> = ({visible, onClose, showToast, selectedItem, update, list, service, t}) => {


    const isFormValid = () => {
    let errorMessages = new Array<string>();
        if(item.reference == '')
            errorMessages.push("reference is required")
        return errorMessages.length == 0 ;
    }
    const emptyItem = new ProduitDto();


    const {
        item,
        setItem,
        submitted,
        setSubmitted,
        activeIndex,
        setActiveIndex,
        activeTab,
        setActiveTab,
        onInputTextChange,
        onInputDateChange,
        onInputNumerChange,
        onMultiSelectChange,
        onBooleanInputChange,
        onDropdownChange,
        onTabChange,
        hideDialog,
        editItem,
        formateDate,
        parseToIsoFormat,
        adaptDate
        } = useEditHook<ProduitDto, ProduitCriteria>({list, selectedItem, onClose, update, showToast,service, t, isFormValid})



    useEffect(() => {


        }, []);







    const itemDialogFooter = ( <>
        <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" onClick={editItem} /> </>
    );



    return(
    <Dialog visible={visible} style={{width: '70vw'}} header={t("produit.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("produit.tabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="reference">{t("produit.reference")}</label>
                        <InputText id="reference" value={item ? item.reference : ''} onChange={(e) => onInputTextChange(e, 'reference')} required className={classNames({'p-invalid': submitted && !item.reference})} />
                        {submitted && !item.reference && <small className="p-invalid">Reference is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="libelle">{t("produit.libelle")}</label>
                        <InputText id="libelle" value={item ? item.libelle : ''} onChange={(e) => onInputTextChange(e, 'libelle')} required className={classNames({'p-invalid': submitted && !item.libelle})} />
                        {submitted && !item.libelle && <small className="p-invalid">Libelle is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="barcode">{t("produit.barcode")}</label>
                        <InputText id="barcode" value={item ? item.barcode : ''} onChange={(e) => onInputTextChange(e, 'barcode')} required className={classNames({'p-invalid': submitted && !item.barcode})} />
                        {submitted && !item.barcode && <small className="p-invalid">Barcode is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="discription">{t("produit.discription")}</label>
                        <InputText id="discription" value={item ? item.discription : ''} onChange={(e) => onInputTextChange(e, 'discription')} required className={classNames({'p-invalid': submitted && !item.discription})} />
                        {submitted && !item.discription && <small className="p-invalid">Discription is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="prixAchatMoyen">{t("produit.prixAchatMoyen")}</label>
                        <InputNumber id="prixAchatMoyen" value={item ? item.prixAchatMoyen : 0} onChange={(e) => onInputNumerChange(e, 'prixAchatMoyen')}/>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="quantite">{t("produit.quantite")}</label>
                        <InputNumber id="quantite" value={item ? item.quantite : 0} onChange={(e) => onInputNumerChange(e, 'quantite')}/>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="seuilAlert">{t("produit.seuilAlert")}</label>
                        <InputNumber id="seuilAlert" value={item ? item.seuilAlert : 0} onChange={(e) => onInputNumerChange(e, 'seuilAlert')}/>
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Edit;


