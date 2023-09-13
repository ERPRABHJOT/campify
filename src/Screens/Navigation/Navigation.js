import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from '../LoginScreens/CreateAccount/CreateAccount';
import Login from '../LoginScreens/Login/Login';
import ForgotPassword from '../LoginScreens/ForgotPassword/ForgotPassword';
import CampName from '../LoginScreens/CampName/CampName';
import VerifyCode from '../LoginScreens/VerifyCode/VerifyCode';
import BordingScreen from '../LoginScreens/BordingScreen/BordingScreen'

const Navigation = (props) => {

  const Stack = createStackNavigator(); //stack the screen

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }} >
      <Stack.Screen name="Login">
        {screenProps => (
          <Login {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </Stack.Screen>

      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CampName" component={CampName} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="BordingScreen" component={BordingScreen} />
    </Stack.Navigator>

  )
}

export default Navigation;

