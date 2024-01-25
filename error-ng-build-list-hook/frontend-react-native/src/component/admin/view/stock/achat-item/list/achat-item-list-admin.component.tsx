import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {AchatItemAdminService} from '../../../../../../controller/service/admin/stock/AchatItemAdminService.service';
import  {AchatItemDto}  from '../../../../../../controller/model/stock/AchatItem.model';
import AchatItemAdminCard from "../card/achat-item-card-admin.component";


const AchatItemAdminList: React.FC = () =>  {

    const [achatItems, setAchatItems] = useState<AchatItemDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type AchatItemResponse = AxiosResponse<AchatItemDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [achatItemId, setAchatItemId] = useState(0);

    const service = new AchatItemAdminService();

    const handleDeletePress = (id: number) => {
        setAchatItemId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(achatItemId);
            setAchatItems((prevAchatItems) => prevAchatItems.filter((achatItem) => achatItem.id !== achatItemId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting achat item:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [achatItemResponse] = await Promise.all<AchatItemResponse>([
            service.getList(),
            ]);
            setAchatItems(achatItemResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const handleFetchAndUpdate = async (id: number) => {
        try {
            const achatItemResponse = await service.find(id);
            const achatItemData = achatItemResponse.data;
            navigation.navigate('AchatItemUpdate', { achatItem: achatItemData });
        } catch (error) {
            console.error('Error fetching achat item data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const achatItemResponse = await service.find(id);
            const achatItemData = achatItemResponse.data;
            navigation.navigate('AchatItemDetails', { achatItem: achatItemData });
        } catch (error) {
            console.error('Error fetching achat item data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Achat item List</Text>

        <View style={{ marginBottom: 100 }}>
            {achatItems && achatItems.length > 0 ? ( achatItems.map((achatItem) => (
                <AchatItemAdminCard key={achatItem.id}
                    produitName = {achatItem.produit.reference}
                    prixUnitaire = {achatItem.prixUnitaire}
                    prixVente = {achatItem.prixVente}
                    quantite = {achatItem.quantite}
                    quantiteAvoir = {achatItem.quantiteAvoir}
                    remise = {achatItem.remise}
                    achatName = {achatItem.achat.reference}
                    onPressDelete={() => handleDeletePress(achatItem.id)}
                    onUpdate={() => handleFetchAndUpdate(achatItem.id)}
                    onDetails={() => handleFetchAndDetails(achatItem.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No achat items found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'AchatItem'} />

    </ScrollView>

);
};

export default AchatItemAdminList;
