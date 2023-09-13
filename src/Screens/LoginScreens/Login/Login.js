import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'
import CustomTextInput from '../../../Components/CustomTextInput/CustomTextInput'
import { Auth, } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Root, Toast } from 'react-native-alert-notification';
import { AuthContext } from '../../../../context/AuthContext';

const Login = (props) => {

    const { updateIdToken } = useContext(AuthContext);  // idToken from asyncstorage
    AsyncStorage.setItem("props", JSON.stringify(props));
    const [show, setshow] = useState(false)    // for activity indicator show and hide
    const [email, setEmail] = useState(null)   // for email value get
    const [pass, setPassword] = useState(null)   // for password value get
    const [shouldShow, setShouldShow] = useState(true); // for password field show and hide

    // login button functionality start here
    function SignIn() {
        let username = email;
        let password = pass;
        console.log("Signing in...")
        try {
            Auth.signIn(username.trim(), password.trim())
                .then(user => {
                    console.log("User is ", user);
                    props.updateAuthState('loggedIn');
                    updateIdToken(user.signInUserSession.idToken.jwtToken)
                }).catch((err) => {
                    Toast.show({
                        onPress: () => { Toast.hide() },
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: 'Wrong user name or password',
                    })
                    setLoading(false)
                });
        }
        catch {
            if (!(email && password)) {
                Toast.show({
                    onPress: () => { Toast.hide() },
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: 'Email or Password Required',
                })
            }
        }
        setshow(true)
        setTimeout(() => {
            setshow(false)
        }, 3000)
    }

    return (
        <Root>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <SafeAreaView style={styles.mainConst}>
                    <View>
                        <Image style={styles.image} source={require('../../../assets/Frame1.png')} />
                    </View>
                    <View style={styles.emailView}>
                        <View>
                            <Text style={styles.textHeading}>Email address</Text>
                            <CustomTextInput value={email} setValue={setEmail} placeholder={"email"} />
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.textHeading}>Password</Text>

                            <View style={styles.container}>
                                <TextInput
                                    value={pass}
                                    onChangeText={setPassword}
                                    style={styles.input}
                                    placeholder='Password'
                                    placeholderTextColor={'#000'}
                                    autoCapitalize='none'
                                    secureTextEntry={shouldShow}
                                />
                                <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
                                    {shouldShow ?
                                        <Image source={require('../../../assets/eye.png')} style={styles.showpd} />
                                        :
                                        <Image source={require('../../../assets/eye11.png')} style={styles.showpd} />
                                    }
                                </TouchableOpacity>

                            </View>
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotColor}>Forgot Password</Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 20, backgroundColor: '#2FBAF3', borderRadius: 10 }}>
                            <TouchableOpacity onPress={SignIn}>
                                <View style={{ marginVertical: 12 }}>
                                    <Text style={styles.logText}>Log in</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <ActivityIndicator color="#2FBAF3" animating={show} />
                        <View style={styles.newDiv}  >
                            <Text style={styles.accountText2}>New to Campify?</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('CreateAccount')}>
                                <Text style={styles.accountText}>Create an account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

            </ScrollView>
        </Root>
    )
}
export default Login
const styles = StyleSheet.create({
    mainConst: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        height: 200,
        width: 390,
        marginVertical: 40
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
        fontSize: 15,
        textAlign: 'right'
    },
    accountText: {
        color: '#2FBAF3',
        fontWeight: '500',
        fontSize: 15,
        marginHorizontal: 8
    },
    accountText2: {
        color: '#000',
        fontWeight: '500',
        fontSize: 15
    },
    newDiv: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    wrongText: {
        color: '#D43535',
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center',
        paddingVertical: 15
    },
    wrongBackround: {
        backgroundColor: '#FFE0E0',
        height: 45,
        borderRadius: 8
    },
    eye: {
        height: 20,
        width: 25,
        marginTop: -38,
        marginHorizontal: 10
    },
    logText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    },
    showpd: {
        height: 25,
        width: 25,
        margin: 12
    },
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E1E1E1',
        paddingHorizontal: 10,
        marginVertical: 5,
        elevation: 5,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})


