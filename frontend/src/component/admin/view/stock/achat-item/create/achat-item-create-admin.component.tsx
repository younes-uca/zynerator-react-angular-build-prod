import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AchatItemAdminService} from '../../../../../../controller/service/admin/stock/AchatItemAdminService.service';
import  {AchatItemDto}  from '../../../../../../controller/model/stock/AchatItem.model';

import {AchatDto} from '../../../../../../controller/model/stock/Achat.model';
import {AchatAdminService} from '../../../../../../controller/service/admin/stock/AchatAdminService.service';
import {ProduitDto} from '../../../../../../controller/model/stock/Produit.model';
import {ProduitAdminService} from '../../../../../../controller/service/admin/stock/ProduitAdminService.service';

const AchatItemAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isAchatItemCollapsed, setIsAchatItemCollapsed] = useState(true);


    const emptyProduit = new ProduitDto();
    const [produits, setProduits] = useState<ProduitDto[]>([]);
    const [produitModalVisible, setProduitModalVisible] = useState(false);
    const [selectedProduit, setSelectedProduit] = useState<ProduitDto>(emptyProduit);

    const emptyAchat = new AchatDto();
    const [achats, setAchats] = useState<AchatDto[]>([]);
    const [achatModalVisible, setAchatModalVisible] = useState(false);
    const [selectedAchat, setSelectedAchat] = useState<AchatDto>(emptyAchat);


    const service = new AchatItemAdminService();
    const achatAdminService = new AchatAdminService();
    const produitAdminService = new ProduitAdminService();


    const { control, handleSubmit, reset } = useForm<AchatItemDto>({
        defaultValues: {
        produit: undefined,
        prixUnitaire: null ,
        prixVente: null ,
        quantite: null ,
        quantiteAvoir: null ,
        remise: null ,
        achat: undefined,
        },
    });

    const achatItemCollapsible = () => {
        setIsAchatItemCollapsed(!isAchatItemCollapsed);
    };

    const handleCloseProduitModal = () => {
        setProduitModalVisible(false);
    };

    const onProduitSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedProduit(item);
        setProduitModalVisible(false);
    };
    const handleCloseAchatModal = () => {
        setAchatModalVisible(false);
    };

    const onAchatSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedAchat(item);
        setAchatModalVisible(false);
    };


    useEffect(() => {
        produitAdminService.getList().then(({data}) => setProduits(data)).catch(error => console.log(error));
        achatAdminService.getList().then(({data}) => setAchats(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: AchatItemDto) => {
        item.produit = selectedProduit;
        item.achat = selectedAchat;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedProduit(emptyProduit);
            setSelectedAchat(emptyAchat);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving achatItem:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create AchatItem</Text>

            <TouchableOpacity onPress={achatItemCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>AchatItem</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isAchatItemCollapsed}>
                        <TouchableOpacity onPress={() => setProduitModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedProduit.reference}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setAchatModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedAchat.reference}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save AchatItem"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {produits !== null && produits.length > 0 ? ( <FilterModal visibility={produitModalVisible} placeholder={"Select a Produit"} onItemSelect={onProduitSelect} items={produits} onClose={handleCloseProduitModal} variable={'reference'} /> ) : null}
        {achats !== null && achats.length > 0 ? ( <FilterModal visibility={achatModalVisible} placeholder={"Select a Achat"} onItemSelect={onAchatSelect} items={achats} onClose={handleCloseAchatModal} variable={'reference'} /> ) : null}
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        //paddingHorizontal: 5,
        marginTop: 15,
        marginBottom: 10
    },

    input: {
        height: 50,
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        flexDirection: 'row'
    },

    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 10
    },

    itemInput: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15,
        height: 50,
    },

    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5,
        fontSize: 15,
        fontWeight: 'bold'
    },

    itemCard: {
        marginVertical: 5,
        backgroundColor: '#f8f8ff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    placeHolder: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        padding: 15,
        marginTop: 15,
    }
});

export default AchatItemAdminCreate;
