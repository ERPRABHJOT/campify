
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllGroup from '../../Screens/HomeScreens/AllGroup/AllGroup';

const TopTabNavigation = ({ navigation }) => {
    const Tab = createMaterialTopTabNavigator();
    return (

        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#000',
                tabBarHideOnKeyboard: true,
                tabBarItemStyle: {
                    height: 50,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
            }}
        >

            <Tab.Screen name="AllGroup" component={AllGroup} options={{ tabBarLabel: "AllGroup" }} />
            <Tab.Screen name="CustomGroup" component={CustomGroup} options={{ tabBarLabel: "CustomGroup" }} />

        </Tab.Navigator>

    )
}
export default TopTabNavigation
const styles = StyleSheet.create({
    Boder: {
        height: 618,
        width: '97%',
        borderWidth: 1,
        borderColor: '#000000',
        marginHorizontal: 7,
        marginVertical: 10,
        borderRadius: 10,
    },
    FLEX: {
        flexDirection: 'row',
        marginVertical: 30,
        justifyContent: 'space-around'
    },
    iconn: {
        marginTop: 5,
        height: 30,
        width: 30
    },
})





