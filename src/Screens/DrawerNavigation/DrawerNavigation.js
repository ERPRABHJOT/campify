import { StyleSheet,Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Newsfeed from '../HomeScreens/Newsfeed';
import Calendar from './Calendar';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from '../../Components/CustomDrawer/CustomDrawer';
import Createannouncement from '../HomeScreens/Createannouncement';
import { createStackNavigator } from '@react-navigation/stack';


const Drawer = createDrawerNavigator();  // create drawer navigation
const Home = (props) => {
  const Stack = createStackNavigator(); //create stack of screens
  return (
    <Stack.Navigator
      options={{
        headerShown: false,
      }} >
      <Stack.Screen name='Newsfeed' component={Newsfeed} />
      <Stack.Screen 
        name="Createannouncement" 
        component={Createannouncement}
        options={{ headerShown: false }}
         />
    </Stack.Navigator>
  )
}

const DrawerNavigation = (props, item) => {
  return (
    <Drawer.Navigator
      drawerContent={drawerProps => <CustomDrawer {...drawerProps} {...props} />}
      scr
        drawerActiveBackgroundeenOptions={{Color: '#4090E514',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Image style={styles.iconsPng} source={require('../../assets/Home.png')} />
          ),
        }}
      />
      <Drawer.Screen name="Calendar" component={Calendar}
        options={{
          drawerIcon: ({ color }) => (
            <Image style={styles.iconsPng} source={require('../../assets/Calendar.png')} />
          ),
        }}
      />
    </Drawer.Navigator>

  )
}





export default DrawerNavigation

const styles = StyleSheet.create({
  iconsPng: {
    height: 20,
    width: 20
  }
})



