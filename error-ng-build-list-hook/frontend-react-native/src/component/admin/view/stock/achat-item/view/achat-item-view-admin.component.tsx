import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

import  {AchatItemDto}  from '../../../../../../controller/model/stock/AchatItem.model';

type AchatItemViewScreenRouteProp = RouteProp<{ AchatItemDetails: { achatItem : AchatItemDto } }, 'AchatItemDetails'>;

type Props = { route: AchatItemViewScreenRouteProp; };

const AchatItemAdminView: React.FC<Props> = ({ route }) => {

    const { achatItem } = route.params;
    const [isAchatItemCollapsed, setIsAchatItemCollapsed] = useState(false);



    const achatItemCollapsible = () => {
        setIsAchatItemCollapsed(!isAchatItemCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={achatItemCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Achat item</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isAchatItemCollapsed}>

                <View style={styles.itemCard}>

                    <View>

                        <Text style={styles.infos}>Id: {achatItem.id}</Text>
                        <Text style={styles.infos}>Produit: {achatItem?.produit?.reference}</Text>
                        <Text style={styles.infos}>Prix unitaire: {achatItem.prixUnitaire}</Text>
                        <Text style={styles.infos}>Prix vente: {achatItem.prixVente}</Text>
                        <Text style={styles.infos}>Quantite: {achatItem.quantite}</Text>
                        <Text style={styles.infos}>Quantite avoir: {achatItem.quantiteAvoir}</Text>
                        <Text style={styles.infos}>Remise: {achatItem.remise}</Text>
                        <Text style={styles.infos}>Achat: {achatItem?.achat?.reference}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

const styles = StyleSheet.create({
    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5,
        fontSize: 15,
        fontWeight: 'bold',
    },

    itemCard: {
        marginVertical: 5,
        backgroundColor: '#f8f8ff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AchatItemAdminView;
