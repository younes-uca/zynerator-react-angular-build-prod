import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ClientAdminView from "../../../../component/admin/view/commun/client/view/client-view-admin.component";
import ClientAdminList from "../../../../component/admin/view/commun/client/list/client-list-admin.component";
import ClientAdminEdit from "../../../../component/admin/view/commun/client/edit/client-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackClientAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ClientAdminList"
                component={ClientAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ClientAdminUpdate"
                component={ClientAdminEdit}
            />
            <Stack.Screen
                name="ClientAdminDetails"
                component={ClientAdminView}
            />
        </Stack.Navigator>
    );
}

export default StackClientAdmin;
