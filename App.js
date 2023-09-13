import { Text} from 'react-native'
import React, { useState, useEffect , useContext } from 'react'
import DrawerNavigation from './src/Screens/DrawerNavigation/DrawerNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from "native-base";
import AuthenticationNavigator from './src/Screens/Navigation/Navigation';
import Amplify, { Analytics, Auth } from "aws-amplify";
import { AuthProvider } from './context/AuthContext'

import {
  Authenticator,
  withAuthenticator,
  AmplifyTheme,
  Greetings,
  ConfirmSignIn,
  RequireNewPassword,
  VerifyContact,
  TOTPSetup,
  Loading,
} from "aws-amplify-react-native";

// import { Authenticator } from '@aws-amplify/ui-react';
var clientId = "2438hs8jc4st5m534s58vga01d";
var poolId = "us-east-1_11ASbFLHw";

const AWS_DEV_POOL = {
  userPoolId: 'us-east-1_LabifA7Bx',
  userPoolWebClientId: '7sn0ddq83dab1h5io79npcu78m',
  region: 'us-east-1',
};

const AWS_PROD_POOL = {
  userPoolId: 'us-east-1_C6NHbKv0D',
  userPoolWebClientId: '2lne0s9a9215b2smpkks7b576g',
  region: 'us-east-1',
};

Analytics.disable();
// Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: AWS_DEV_POOL.userPoolId,
    userPoolWebClientId: AWS_DEV_POOL.userPoolWebClientId,
    identityPoolId: "us-east-1:2a30ac6e-17d3-4166-821f-fa2842411bfa",
    // identityPoolName: "amplify_backend_manager_d3h2xdy2hdtcff",
    // mandatorySignIn: true,
    // storage: MemoryStorageNew,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
  Storage: {
    AWSS3: {
      bucket: 'campify-mobile-app-storage102733-dev',
      region: 'us-east-1', //OPTIONAL -  Amazon service region
    }
  }
});
// Amplify.Logger.LOG_LEVEL = 'DEBUG';
class Root extends React.Component {
  constructor(props) {
    super();
  }
}
import CustomDropButton from './src/Components/CustomDropButton/CustomDropDown'


const App = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  useEffect(() => {
    checkAuthState();
    console.log("Starting Campify")
  }, []);
  async function checkAuthState() {
    try {
      console.log("checkAuthState")
      await Auth.currentAuthenticatedUser();
      console.log('✅ User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('❌ User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          {console.log("isUserLoggedIn", isUserLoggedIn)}
          {isUserLoggedIn === 'initializing' && <Text> Loading... </Text>}
          {isUserLoggedIn === 'loggedIn' && (
            <DrawerNavigation updateAuthState={updateAuthState} />
          )}
          {isUserLoggedIn === 'loggedOut' && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
          )}
        </NavigationContainer>
    </NativeBaseProvider>
    </AuthProvider>
  );
}
export default App;