import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {TabView, TabPanel} from 'primereact/tabview';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import {InputSwitch, InputSwitchChangeEvent} from 'primereact/inputswitch';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';
import {MessageService} from '@/utils/zynerator/service/MessageService';

import {AchatAdminService} from '@/controller/service/admin/achat/AchatAdminService.service';
import  {AchatDto}  from '@/controller/model/achat/Achat.model';
import {AchatCriteria} from "@/controller/criteria/achat/AchatCriteria.model";

import {ClientDto} from '@/controller/model/commun/Client.model';
import {ClientAdminService} from '@/controller/service/admin/commun/ClientAdminService.service';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";
import useCreateHook from "@/utils/zyhook/useCreate.hook";



type AchatCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: AchatDto) => void,
    showToast: React.Ref<Toast>,
    list: AchatDto[],
    service: AchatAdminService,
    t: TFunction
}
const Create: React.FC<AchatCreateAdminType> = ({visible, onClose, add, showToast, list, service, t}) => {


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
            onTabChange,
            onDropdownChange,
            hideDialog,
            saveItem,
            formateDate
        } = useCreateHook<AchatDto, AchatCriteria>({list, emptyItem, onClose, add, showToast,service, isFormValid})
    const [clients, setClients] = useState<ClientDto[]>([]);


    const clientAdminService = new ClientAdminService();
    useEffect(() => {
        clientAdminService.getList().then(({data}) => setClients(data)).catch(error => console.log(error));
    }, []);








    const itemDialogFooter = ( <>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={saveItem} /> </>
    );

return(
        <Dialog visible={visible} style={{width: '70vw'}} header={t("achat.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("achat.tabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="reference">{t("achat.reference")}</label>
                        <InputText id="reference" value={item.reference} onChange={(e) => onInputTextChange(e, 'reference')} required className={classNames({'p-invalid': submitted && !item.reference})} />
                        {submitted && !item.reference && <small className="p-invalid">Reference is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="dateAchat">{t("achat.dateAchat")}</label>
                        <Calendar id="dateAchat" value={item.dateAchat} onChange={(e) => onInputDateChange(e, 'dateAchat')} dateFormat="dd/mm/yy"  showIcon={true} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="total">{t("achat.total")}</label>
                        <InputNumber id="total" value={item.total} onChange={(e) => onInputNumerChange(e, 'total')} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="totalPaye">{t("achat.totalPaye")}</label>
                        <InputNumber id="totalPaye" value={item.totalPaye} onChange={(e) => onInputNumerChange(e, 'totalPaye')} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="description">{t("achat.description")}</label>
                        <span className="p-float-label">
                        <InputTextarea id="description" value={item.description} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30}/>
                    </span>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="client">{t("achat.client")}</label>
                        <Dropdown  id="clientDropdown"  value={item.client} options={clients} onChange={(e) => onDropdownChange(e, 'client')}   placeholder={t("achat.clientPlaceHolder")} filter filterPlaceholder={t("achat.clientPlaceHolderFilter")} optionLabel="nom" showClear/>
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
