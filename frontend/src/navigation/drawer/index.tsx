import CustomDrawer from "../../zynerator/CustomDrawer/CustomDrawer";
import HomeScreen from "../../component/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AchatAdmin from "../../component/admin/view/stock/achat/container/achat-container-admin.component";
import AchatItemAdmin from "../../component/admin/view/stock/achat-item/container/achat-item-container-admin.component";
import ClientAdmin from "../../component/admin/view/commun/client/container/client-container-admin.component";
import ProduitAdmin from "../../component/admin/view/commun/produit/container/produit-container-admin.component";
import AboutScreen from "../../component/AboutScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    return (

        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#ffa500',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontWeight: 'bold',
                    fontSize: 15,
                },
            }}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Achat"
                component={AchatAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="AchatItem"
                component={AchatItemAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Client"
                component={ClientAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Produit"
                component={ProduitAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>

    );
}

export default DrawerNavigation;
