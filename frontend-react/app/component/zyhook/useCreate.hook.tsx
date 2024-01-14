import React, {Dispatch, SetStateAction, useState} from "react";
import {CalendarChangeEvent} from "primereact/calendar";
import {InputNumberChangeEvent} from "primereact/inputnumber";
import {MultiSelectChangeEvent} from "primereact/multiselect";
import {DropdownChangeEvent} from "primereact/dropdown";
import {BaseDto} from "app/zynerator/dto/BaseDto.model";
import {MessageService} from "app/zynerator/service/MessageService";
import {format} from "date-fns";
import AbstractService from "app/zynerator/service/AbstractService";
import {BaseCriteria} from "app/zynerator/criteria/BaseCriteria.model";
import {Toast} from "primereact/toast";

type CreateHookType<T extends BaseDto, C extends BaseCriteria> = {
    list: T[],
    emptyItem: T,
    onClose: () => void,
    add: (item: T) => void,
    showToast: React.Ref<Toast>,
    service: AbstractService<T, C>,
    isFormValid: () => boolean
}
const useCreateHook = <T extends BaseDto, C extends BaseCriteria>({list, emptyItem, onClose, add, showToast, service, isFormValid}: CreateHookType<T, C>) => {

    const [items, setItems] = useState<T[]>(list);
    const [item, setItem] = useState<T>(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);

    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            service.save(item).then(({data}) => {

                if (data == null) {
                    MessageService.showError(showToast, "Error Création !", "Opération faite avec erreur.");
                    onClose();
                    setSubmitted(false);
                } else {
                    add(data);
                    MessageService.showSuccess(showToast, "Création !", "Opération faite avec success.");
                    onClose();
                    setSubmitted(false);
                }
            });
        }
    };
    const formateDate = (field: string) => {
        return (rowData: any) => {
            if (rowData[field]) {
                return format(new Date(rowData[field]), "dd/MM/yyyy");
            }
        };
    };

    const onInputTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const value = (e.target && e.target.value) || '';
        setItem({...item, [name]: value});
    };

    const onInputDateChange = (e: CalendarChangeEvent, name: string) => {
        const value = (e.value) || '';
        setItem({...item, [name]: value});
    };

    const onInputNumerChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value === null ? null : +e.value;
        setItem((prevItem) => ({...prevItem, [name]: val,}));
    };

    const onMultiSelectChange = (e: MultiSelectChangeEvent, field: string) => {
        if (e && e.value) {
            setItem(prevState => ({...prevState, [field]: e.value,}));
        }
    };

    const onBooleanInputChange = (e: any, name: string) => {
        const val = e.value;
        setItem((prevItem) => ({...prevItem, [name]: val,}));
    };
    const onDropdownChange = (e: DropdownChangeEvent, field: string) => {
        setItem((prevState) => ({...prevState, [field]: e.value}));
    };

    const onTabChange = (e: { index: number }) => {
        setActiveIndex(e.index);
    };

    const hideDialog = () => {
        setSubmitted(false);
        onClose();
    };


    return {
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
    }
};

export default useCreateHook;
