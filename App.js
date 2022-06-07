import * as React from "react";
import { Image, FlatList, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

import S1 from "./components/S1";
import S2 from "./components/S2";
import EditScreen from './components/EditScreen.js'
import AddCategory from "./components/AddCategory.js";
import CustomDrawerContent from "./components/CustomDrawerContent.js";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: "10%",
    height: "70%",
  },
  
});

function App() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Notatki"
            component={S1}
            options={{
              drawerIcon: () => (
                <Image
                  style={styles.stretch}
                  source={require("./assets/notatka.jpg")}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Dodaj"
            component={S2}
            options={{
              drawerIcon: () => (
                <Image
                  style={styles.stretch}
                  source={require("./assets/notatka.jpg")}
                />
              ),
            }}
          />
          <Drawer.Screen name="Dodaj kategorię" component={AddCategory} options={{
              drawerIcon: () => (
                <Image
                  style={styles.stretch}
                  source={require("./assets/notatka.jpg")}
                />
              ),
            }} />
          <Drawer.Screen name="edit" component={EditScreen} options={{
            drawerItemStyle: {height: 0}
          }}/>
          
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
export default App;
