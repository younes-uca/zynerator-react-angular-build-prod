import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AchatAdminService} from '../../../../../../controller/service/admin/stock/AchatAdminService.service';
import  {AchatDto}  from '../../../../../../controller/model/stock/Achat.model';

import {ClientDto} from '../../../../../../controller/model/stock/Client.model';
import {ClientAdminService} from '../../../../../../controller/service/admin/stock/ClientAdminService.service';
import {ProduitDto} from '../../../../../../controller/model/stock/Produit.model';
import {ProduitAdminService} from '../../../../../../controller/service/admin/stock/ProduitAdminService.service';
import {AchatItemDto} from '../../../../../../controller/model/stock/AchatItem.model';
import {AchatItemAdminService} from '../../../../../../controller/service/admin/stock/AchatItemAdminService.service';

type AchatUpdateScreenRouteProp = RouteProp<{ AchatUpdate: { achat: AchatDto } }, 'AchatUpdate'>;

type Props = { route: AchatUpdateScreenRouteProp; };

const AchatAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { achat } = route.params;


    const emptyProduit = new ProduitDto();
    const [produits, setProduits] = useState<ProduitDto[]>([]);
    const [produitModalVisible, setProduitModalVisible] = useState(false);
    const [selectedProduit, setSelectedProduit] = useState<ProduitDto>(emptyProduit);

    const emptyClient = new ClientDto();
    const [clients, setClients] = useState<ClientDto[]>([]);
    const [clientModalVisible, setClientModalVisible] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientDto>(emptyClient);


    const service = new AchatAdminService();
    const clientAdminService = new ClientAdminService();
    const produitAdminService = new ProduitAdminService();
    const achatItemAdminService = new AchatItemAdminService();

    const [achatItemsElements, setAchatItemsElements] = useState<AchatItemDto[]>([]);
    const [achatItems, setAchatItems] = useState<AchatItemDto>(new AchatItemDto());
    const [isEditModeAchatItems, setIsEditModeAchatItems] = useState(false);
    const [editIndexAchatItems, setEditIndexAchatItems] = useState(null);

    const [isAchatItemsElementCollapsed, setIsAchatItemsElementCollapsed] = useState(true);
    const [isAchatItemsElementsCollapsed, setIsAchatItemsElementsCollapsed] = useState(true);
    const [isAchatItems, setIsAchatItems] = useState(false);
    const [isEditAchatItemsMode, setIsEditAchatItemsMode] = useState(false);


    const { control, handleSubmit } = useForm<AchatDto>({
        defaultValues: {
            id: achat.id ,
            reference: achat.reference ,
            dateAchat: achat.dateAchat ,
            total: achat.total ,
            totalPaye: achat.totalPaye ,
            description: achat.description ,
        },
    });



    const handleCloseProduitModal = () => {
        setProduitModalVisible(false);
    };

    const onProduitSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedProduit(item);
        setProduitModalVisible(false);
    };
    const handleCloseClientModal = () => {
        setClientModalVisible(false);
    };

    const onClientSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedClient(item);
        setClientModalVisible(false);
    };


    useEffect(() => {
        clientAdminService.getList().then(({data}) => setClients(data)).catch(error => console.log(error));

        produitAdminService.getList().then(({data}) => setProduits(data)).catch(error => console.log(error));
    }, []);



    const handleUpdate = async (item: AchatDto) => {
        item.client = selectedClient;
        Keyboard.dismiss();
        console.log('Data to be updated:', item);
        try {
            await service.update(item);
            navigation.navigate('Achat');
        } catch (error) {
            console.error('Error saving achat:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Update Achat</Text>

            <CustomInput control={control} name={'reference'} placeholder={'Reference'} keyboardT="default" />
            <CustomInput control={control} name={'dateAchat'} placeholder={'Date achat'} keyboardT="numeric" />
            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />

            <TouchableOpacity onPress={() => setClientModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedClient?.nom}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Achat"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />

        {clients &&
            <FilterModal visibility={clientModalVisible} placeholder={"Select a Client"} onItemSelect={onClientSelect} items={clients} onClose={handleCloseClientModal} variable={'nom'} />
        }

    </SafeAreaView>
);
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15
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
    },

    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
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
        marginBottom: 10,
    }

});

export default AchatAdminEdit;
