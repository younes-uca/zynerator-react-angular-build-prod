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


import {AchatAdminService} from '@/controller/service/admin/achat/AchatAdminService.service';
import  {AchatDto}  from '@/controller/model/achat/Achat.model';
import {AchatCriteria} from "@/controller/criteria/achat/AchatCriteria.model";


import {ClientDto} from '@/controller/model/commun/Client.model';
import {ClientAdminService} from '@/controller/service/admin/commun/ClientAdminService.service';


type AchatEditAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: AchatDto
    update: (item: AchatDto) => void,
    list: AchatDto[],
    service: AchatAdminService,
    t: TFunction
}
const Edit: React.FC<AchatEditAdminType> = ({visible, onClose, showToast, selectedItem, update, list, service, t}) => {


    const isFormValid = () => {
    let errorMessages = new Array<string>();
        if(item.reference == '')
            errorMessages.push("reference is required")
        return errorMessages.length == 0 ;
    }
    const emptyItem = new AchatDto();


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
        } = useEditHook<AchatDto, AchatCriteria>({list, selectedItem, onClose, update, showToast,service, t, isFormValid})

    const [clients, setClients] = useState<ClientDto[]>([]);


    const clientAdminService = new ClientAdminService();
    useEffect(() => {
    clientAdminService.getList().then(({data}) => setClients(data)).catch(error => console.log(error));


        }, []);







    const itemDialogFooter = ( <>
        <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" onClick={editItem} /> </>
    );



    return(
    <Dialog visible={visible} style={{width: '70vw'}} header={t("achat.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("achat.tabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="reference">{t("achat.reference")}</label>
                        <InputText id="reference" value={item ? item.reference : ''} onChange={(e) => onInputTextChange(e, 'reference')} required className={classNames({'p-invalid': submitted && !item.reference})} />
                        {submitted && !item.reference && <small className="p-invalid">Reference is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="dateAchat">{t("achat.dateAchat")}</label>
                        <Calendar id="dateAchat" value={adaptDate(item?.dateAchat)} onChange={(e) => onInputDateChange(e, 'dateAchat')} dateFormat="dd/mm/yy" showIcon={true} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="total">{t("achat.total")}</label>
                        <InputNumber id="total" value={item ? item.total : 0} onChange={(e) => onInputNumerChange(e, 'total')}/>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="totalPaye">{t("achat.totalPaye")}</label>
                        <InputNumber id="totalPaye" value={item ? item.totalPaye : 0} onChange={(e) => onInputNumerChange(e, 'totalPaye')}/>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="description">{t("achat.description")}</label>
                        <span className="p-float-label">
                            <InputTextarea id="description" value={item ? item.description : ''} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30}/>
                        </span>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="client">{t("achat.client")}</label>
                        <Dropdown  id="clientDropdown"  value={item ? item.client : ''} options={clients} onChange={(e) => onDropdownChange(e, 'client')}   placeholder="Sélectionnez un client" filter filterPlaceholder="Rechercher un client" optionLabel="nom" showClear />
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Edit;


