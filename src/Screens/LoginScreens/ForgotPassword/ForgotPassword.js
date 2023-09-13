import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../../Components/CustomInput/CustomInput'
import { Auth } from 'aws-amplify';
import { } from 'react-native-gesture-handler';


const ForgotPassword = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [isVerifCodeSent, setIsVerifCodeSent] = useState('')
  const [username, setUsername] = useState('')  // username get from user
  const [error, setError] = useState('')       //error show
  const [showSpinner, setShowSpinner] = useState('')  // for spinner
  const [password, setPassword] = useState('')   //passsword confirmation
  const [newPassword, setNewPassword] = useState('')  // new password

  // forgot code send to email
  let sendCode = () => {
    if (password != newPassword) {
      console.log('hiii')
      Alert.alert("your passwords don't match")
    }
    let setEmail = ({ showSpinner: true }, () => {
      Auth.forgotPassword(username)
      console.log('hiii')
      Alert.alert("your passwords don't match")
        .then(data => {
          setEmail({ isVerifCodeSent: true, error: null, showSpinner: false });
        })
        .catch(err => {
          setEmail({ showSpinner: false }, () => {
            error(err)
          })
        });
    });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.mainConst}>
        <View>
          <Image style={styles.image} source={require('../../../assets/Frame1.png')} />
        </View>
        <View style={styles.emailView}>
          <Text style={styles.textPara}>Forgot Password?</Text>
          <Text style={styles.textline}>Don’t worry! it happens. Please enter the address associated with your account</Text>
          <View style={{ marginVertical: 30 }}>
            <Text style={styles.textHeading}>Email address</Text>
            <CustomInput value={username} setValue={setUsername} style="text-transform:uppercase" />
            <View>
            </View>
            <View style={{ backgroundColor: '#2FBAF3', borderRadius: 10, height: 50 }}>
              <TouchableOpacity onPress={sendCode}>
                <View style={{ marginVertical: 15 }}>
                  <Text style={styles.logText}>Send</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.accountText}>Go back to Log in</Text></TouchableOpacity>
        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  mainConst: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    height: 210,
    width: 390,
    marginVertical: 30
  },
  textPara: {
    color: '#144F8E',
    fontSize: 28,
    fontWeight: '600'
  },
  textline: {
    fontSize: 14,
    color: '#6F6F6F',
    fontWeight: '500',
    marginVertical: 20
  },
  textHeading: {
    color: '#000',
    fontWeight: '500',
    fontSize: 18
  },
  emailView: {
    padding: 15,
    marginVertical: 50
  },
  forgotColor: {
    color: '#2FBAF3',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'right'
  },
  accountText: {
    color: '#2FBAF3',
    fontWeight: '500',
    fontSize: 15,
    marginHorizontal: 8,
    textAlign: 'center',
    marginVertical: 20
  },
  sucesText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#0D853D',
    fontWeight: '500'
  },
  sucesBor: {
    backgroundColor: '#E5FFE0',
    padding: 10,
    borderRadius: 8,
  },
  logText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center'
  }

})