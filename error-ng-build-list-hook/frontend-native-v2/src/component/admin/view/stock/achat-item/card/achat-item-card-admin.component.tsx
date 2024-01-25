import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AchatItemAdminCard = ({ produitName ,prixUnitaire ,prixVente ,quantite ,quantiteAvoir ,remise ,achatName , onPressDelete, onUpdate, onDetails }) =>{

return (

    <SafeAreaView>

        <View style={{ flexDirection: 'row', width: '100%' }} >

            <TouchableOpacity onPress={onDetails} style={{ height: 170, marginHorizontal: 10, borderRadius: 15, marginVertical: 10, elevation: 13, backgroundColor: 'white', width: '95%', flexDirection: 'row', justifyContent: 'space-between' }} >

                <View style={{ marginLeft: 15, marginVertical: 10 }}>

                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Produit: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{produitName}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Prix unitaire: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{prixUnitaire}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Prix vente: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{prixVente}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Quantite: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{quantite}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Quantite avoir: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{quantiteAvoir}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Remise: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{remise}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Achat: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{achatName}</Text>
                    </View>

                </View>


                <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => onPressDelete()} style={styles.deleteButton}>
                        <Ionicons name="trash-outline" size={25} color={'red'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onUpdate()} style={styles.updateButton}>
                        <Ionicons name="pencil-outline" size={25} color={'blue'} />
                    </TouchableOpacity>

                </View>

            </TouchableOpacity>

        </View>

    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    card: {
        height: 170,
        marginHorizontal: 10,
        borderRadius: 15,
        marginVertical: 10,
        elevation: 13,
        backgroundColor: 'white',
        width: '90%',
        flexDirection: 'row',
        marginRight: '25%',
    },

    deleteButton: {
        margin: 15
    },

    updateButton: {
        margin: 15
    },

    buttons: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        right: '10%'
    },

    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5
    }
});

export default AchatItemAdminCard;
