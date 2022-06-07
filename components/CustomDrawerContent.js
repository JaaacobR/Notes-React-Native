import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import EditScreen from './EditScreen.js'


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    stretch: {
        width: '90%'
        
    },
});

function CustomDrawerContent(props) {

    



    return (
        <DrawerContentScrollView {...props}>



            <DrawerItem
                label=""
                icon={() => <Image style={styles.stretch} source={require('../assets/notatka.jpg')} />}
                onPress={() => console.log("test")}
            />
           
            {/* <DrawerItem name='ekran' component={EditScreen} /> */}
            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;