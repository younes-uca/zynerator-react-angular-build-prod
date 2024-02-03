import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {ProduitAdminService} from '../../../../../../controller/service/admin/commun/ProduitAdminService.service';
import  {ProduitDto}  from '../../../../../../controller/model/commun/Produit.model';
import ProduitAdminCard from "../card/produit-card-admin.component";


const ProduitAdminList: React.FC = () =>  {

    const [produits, setProduits] = useState<ProduitDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ProduitResponse = AxiosResponse<ProduitDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [produitId, setProduitId] = useState(0);

    const service = new ProduitAdminService();

    const handleDeletePress = (id: number) => {
        setProduitId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(produitId);
            setProduits((prevProduits) => prevProduits.filter((produit) => produit.id !== produitId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting produit:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [produitResponse] = await Promise.all<ProduitResponse>([
            service.getList(),
            ]);
            setProduits(produitResponse.data);
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
            const produitResponse = await service.find(id);
            const produitData = produitResponse.data;
            navigation.navigate('ProduitUpdate', { produit: produitData });
        } catch (error) {
            console.error('Error fetching produit data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const produitResponse = await service.find(id);
            const produitData = produitResponse.data;
            navigation.navigate('ProduitDetails', { produit: produitData });
        } catch (error) {
            console.error('Error fetching produit data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Produit List</Text>

        <View style={{ marginBottom: 100 }}>
            {produits && produits.length > 0 ? ( produits.map((produit) => (
                <ProduitAdminCard key={produit.id}
                    reference = {produit.reference}
                    libelle = {produit.libelle}
                    barcode = {produit.barcode}
                    discription = {produit.discription}
                    prixAchatMoyen = {produit.prixAchatMoyen}
                    quantite = {produit.quantite}
                    seuilAlert = {produit.seuilAlert}
                    onPressDelete={() => handleDeletePress(produit.id)}
                    onUpdate={() => handleFetchAndUpdate(produit.id)}
                    onDetails={() => handleFetchAndDetails(produit.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No produits found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Produit'} />

    </ScrollView>

);
};

export default ProduitAdminList;
