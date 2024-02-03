import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProduitAdminView from "../../../../component/admin/view/commun/produit/view/produit-view-admin.component";
import ProduitAdminList from "../../../../component/admin/view/commun/produit/list/produit-list-admin.component";
import ProduitAdminEdit from "../../../../component/admin/view/commun/produit/edit/produit-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackProduitAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProduitAdminList"
                component={ProduitAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProduitAdminUpdate"
                component={ProduitAdminEdit}
            />
            <Stack.Screen
                name="ProduitAdminDetails"
                component={ProduitAdminView}
            />
        </Stack.Navigator>
    );
}

export default StackProduitAdmin;
