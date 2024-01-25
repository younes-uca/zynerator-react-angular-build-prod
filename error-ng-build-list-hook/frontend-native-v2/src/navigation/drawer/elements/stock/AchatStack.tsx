import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AchatAdminView from "../../../../component/admin/view/stock/achat/view/achat-view-admin.component";
import AchatAdminList from "../../../../component/admin/view/stock/achat/list/achat-list-admin.component";
import AchatAdminEdit from "../../../../component/admin/view/stock/achat/edit/achat-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackAchatAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AchatAdminList"
                component={AchatAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AchatAdminUpdate"
                component={AchatAdminEdit}
            />
            <Stack.Screen
                name="AchatAdminDetails"
                component={AchatAdminView}
            />
        </Stack.Navigator>
    );
}

export default StackAchatAdmin;
