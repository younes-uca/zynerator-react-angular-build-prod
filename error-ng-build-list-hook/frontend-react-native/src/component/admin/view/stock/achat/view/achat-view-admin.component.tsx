import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

import  {AchatDto}  from '../../../../../../controller/model/stock/Achat.model';

type AchatViewScreenRouteProp = RouteProp<{ AchatDetails: { achat : AchatDto } }, 'AchatDetails'>;

type Props = { route: AchatViewScreenRouteProp; };

const AchatAdminView: React.FC<Props> = ({ route }) => {

    const { achat } = route.params;
    const [isAchatCollapsed, setIsAchatCollapsed] = useState(false);

    const [isAchatItemsCollapsed, setIsAchatItemsCollapsed] = useState(true);

    const achatItemsCollapsible = () => {
        setIsAchatItemsCollapsed(!isAchatItemsCollapsed);
    };

    const achatCollapsible = () => {
        setIsAchatCollapsed(!isAchatCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={achatCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Achat</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isAchatCollapsed}>

                <View style={styles.itemCard}>

                    <View>

                        <Text style={styles.infos}>Id: {achat.id}</Text>
                        <Text style={styles.infos}>Reference: {achat.reference}</Text>
                        <Text style={styles.infos}>Date achat: {achat.dateAchat}</Text>
                        <Text style={styles.infos}>Total: {achat.total}</Text>
                        <Text style={styles.infos}>Total paye: {achat.totalPaye}</Text>
                        <Text style={styles.infos}>Description: {achat.description}</Text>
                        <Text style={styles.infos}>Client: {achat?.client?.nom}</Text>

                    </View>

                </View>

            </Collapsible>

            <TouchableOpacity onPress={achatItemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Achat items</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isAchatItemsCollapsed}>

                {achat.achatItems && achat.achatItems.length > 0 ? ( achat.achatItems.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>Produit: {item?.produit?.reference}</Text>
                            <Text style={styles.infos}>Prix unitaire : {item.prixUnitaire}</Text>
                            <Text style={styles.infos}>Prix vente : {item.prixVente}</Text>
                            <Text style={styles.infos}>Quantite : {item.quantite}</Text>
                            <Text style={styles.infos}>Quantite avoir : {item.quantiteAvoir}</Text>
                            <Text style={styles.infos}>Remise : {item.remise}</Text>

                        </View>
                    </View>
                    )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No achat items</Text>
                    </View>
                )}

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

export default AchatAdminView;
