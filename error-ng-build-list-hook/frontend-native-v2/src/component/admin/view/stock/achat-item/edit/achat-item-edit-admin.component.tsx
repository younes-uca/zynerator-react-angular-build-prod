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

import {AchatItemAdminService} from '../../../../../../controller/service/admin/stock/AchatItemAdminService.service';
import  {AchatItemDto}  from '../../../../../../controller/model/stock/AchatItem.model';

import {ProduitDto} from '../../../../../../controller/model/commun/Produit.model';
import {ProduitAdminService} from '../../../../../../controller/service/admin/commun/ProduitAdminService.service';
import {AchatDto} from '../../../../../../controller/model/stock/Achat.model';
import {AchatAdminService} from '../../../../../../controller/service/admin/stock/AchatAdminService.service';

type AchatItemUpdateScreenRouteProp = RouteProp<{ AchatItemUpdate: { achatItem: AchatItemDto } }, 'AchatItemUpdate'>;

type Props = { route: AchatItemUpdateScreenRouteProp; };

const AchatItemAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { achatItem } = route.params;


    const emptyProduit = new ProduitDto();
    const [produits, setProduits] = useState<ProduitDto[]>([]);
    const [produitModalVisible, setProduitModalVisible] = useState(false);
    const [selectedProduit, setSelectedProduit] = useState<ProduitDto>(emptyProduit);

    const emptyAchat = new AchatDto();
    const [achats, setAchats] = useState<AchatDto[]>([]);
    const [achatModalVisible, setAchatModalVisible] = useState(false);
    const [selectedAchat, setSelectedAchat] = useState<AchatDto>(emptyAchat);


    const service = new AchatItemAdminService();
    const produitAdminService = new ProduitAdminService();
    const achatAdminService = new AchatAdminService();


    const { control, handleSubmit } = useForm<AchatItemDto>({
        defaultValues: {
            id: achatItem.id ,
            prixUnitaire: achatItem.prixUnitaire ,
            prixVente: achatItem.prixVente ,
            quantite: achatItem.quantite ,
            quantiteAvoir: achatItem.quantiteAvoir ,
            remise: achatItem.remise ,
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



    const handleUpdate = async (item: AchatItemDto) => {
        item.produit = selectedProduit;
        item.achat = selectedAchat;
        Keyboard.dismiss();
        console.log('Data to be updated:', item);
        try {
            await service.update(item);
            navigation.navigate('AchatItem');
        } catch (error) {
            console.error('Error saving achat item:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Update Achat item</Text>


            <TouchableOpacity onPress={() => setProduitModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedProduit?.reference}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAchatModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedAchat?.reference}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Achat item"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />

        {produits &&
            <FilterModal visibility={produitModalVisible} placeholder={"Select a Produit"} onItemSelect={onProduitSelect} items={produits} onClose={handleCloseProduitModal} variable={'reference'} />
        }
        {achats &&
            <FilterModal visibility={achatModalVisible} placeholder={"Select a Achat"} onItemSelect={onAchatSelect} items={achats} onClose={handleCloseAchatModal} variable={'reference'} />
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

export default AchatItemAdminEdit;
