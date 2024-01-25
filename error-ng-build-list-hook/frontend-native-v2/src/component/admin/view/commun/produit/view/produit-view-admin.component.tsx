import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

import  {ProduitDto}  from '../../../../../../controller/model/commun/Produit.model';

type ProduitViewScreenRouteProp = RouteProp<{ ProduitDetails: { produit : ProduitDto } }, 'ProduitDetails'>;

type Props = { route: ProduitViewScreenRouteProp; };

const ProduitAdminView: React.FC<Props> = ({ route }) => {

    const { produit } = route.params;
    const [isProduitCollapsed, setIsProduitCollapsed] = useState(false);



    const produitCollapsible = () => {
        setIsProduitCollapsed(!isProduitCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={produitCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Produit</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isProduitCollapsed}>

                <View style={styles.itemCard}>

                    <View>

                        <Text style={styles.infos}>Id: {produit.id}</Text>
                        <Text style={styles.infos}>Reference: {produit.reference}</Text>
                        <Text style={styles.infos}>Libelle: {produit.libelle}</Text>
                        <Text style={styles.infos}>Barcode: {produit.barcode}</Text>
                        <Text style={styles.infos}>Discription: {produit.discription}</Text>
                        <Text style={styles.infos}>Prix achat moyen: {produit.prixAchatMoyen}</Text>
                        <Text style={styles.infos}>Quantite: {produit.quantite}</Text>
                        <Text style={styles.infos}>Seuil alert: {produit.seuilAlert}</Text>

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

export default ProduitAdminView;
