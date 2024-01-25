import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {AchatAdminService} from '../../../../../../controller/service/admin/stock/AchatAdminService.service';
import  {AchatDto}  from '../../../../../../controller/model/stock/Achat.model';
import AchatAdminCard from "../card/achat-card-admin.component";


const AchatAdminList: React.FC = () =>  {

    const [achats, setAchats] = useState<AchatDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type AchatResponse = AxiosResponse<AchatDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [achatId, setAchatId] = useState(0);

    const service = new AchatAdminService();

    const handleDeletePress = (id: number) => {
        setAchatId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(achatId);
            setAchats((prevAchats) => prevAchats.filter((achat) => achat.id !== achatId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting achat:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [achatResponse] = await Promise.all<AchatResponse>([
            service.getList(),
            ]);
            setAchats(achatResponse.data);
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
            const achatResponse = await service.find(id);
            const achatData = achatResponse.data;
            navigation.navigate('AchatAdminUpdate', { achat: achatData });
        } catch (error) {
            console.error('Error fetching achat data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const achatResponse = await service.find(id);
            const achatData = achatResponse.data;
            navigation.navigate('AchatAdminDetails', { achat: achatData });
        } catch (error) {
            console.error('Error fetching achat data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Achat List</Text>

        <View style={{ marginBottom: 100 }}>
            {achats && achats.length > 0 ? ( achats.map((achat) => (
                <AchatAdminCard key={achat.id}
                    reference = {achat.reference}
                    dateAchat = {achat.dateAchat}
                    total = {achat.total}
                    totalPaye = {achat.totalPaye}
                    description = {achat.description}
                    clientName = {achat.client.nom}
                    onPressDelete={() => handleDeletePress(achat.id)}
                    onUpdate={() => handleFetchAndUpdate(achat.id)}
                    onDetails={() => handleFetchAndDetails(achat.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No achats found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Achat'} />

    </ScrollView>

);
};

export default AchatAdminList;
