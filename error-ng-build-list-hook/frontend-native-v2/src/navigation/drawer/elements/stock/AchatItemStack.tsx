import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AchatItemAdminView from "../../../../component/admin/view/stock/achat-item/view/achat-item-view-admin.component";
import AchatItemAdminList from "../../../../component/admin/view/stock/achat-item/list/achat-item-list-admin.component";
import AchatItemAdminEdit from "../../../../component/admin/view/stock/achat-item/edit/achat-item-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackAchatItemAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AchatItemAdminList"
                component={AchatItemAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AchatItemAdminUpdate"
                component={AchatItemAdminEdit}
            />
            <Stack.Screen
                name="AchatItemAdminDetails"
                component={AchatItemAdminView}
            />
        </Stack.Navigator>
    );
}

export default StackAchatItemAdmin;
