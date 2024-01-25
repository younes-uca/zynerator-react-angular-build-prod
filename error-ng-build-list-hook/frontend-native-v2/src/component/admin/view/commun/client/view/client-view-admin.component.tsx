import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

import  {ClientDto}  from '../../../../../../controller/model/commun/Client.model';

type ClientViewScreenRouteProp = RouteProp<{ ClientDetails: { client : ClientDto } }, 'ClientDetails'>;

type Props = { route: ClientViewScreenRouteProp; };

const ClientAdminView: React.FC<Props> = ({ route }) => {

    const { client } = route.params;
    const [isClientCollapsed, setIsClientCollapsed] = useState(false);



    const clientCollapsible = () => {
        setIsClientCollapsed(!isClientCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={clientCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Client</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isClientCollapsed}>

                <View style={styles.itemCard}>

                    <View>

                        <Text style={styles.infos}>Id: {client.id}</Text>
                        <Text style={styles.infos}>Cin: {client.cin}</Text>
                        <Text style={styles.infos}>Nom: {client.nom}</Text>
                        <Text style={styles.infos}>Tel: {client.tel}</Text>
                        <Text style={styles.infos}>Email: {client.email}</Text>
                        <Text style={styles.infos}>Adresse: {client.adresse}</Text>
                        <Text style={styles.infos}>Description: {client.description}</Text>
                        <Text style={styles.infos}>Creance: {client.creance}</Text>

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

export default ClientAdminView;
