import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../../Components/CustomInput/CustomInput'
import { Auth,} from 'aws-amplify';
import { ALERT_TYPE,Root, Toast } from 'react-native-alert-notification';

const VerifyCode = ({ navigation, route }) => {

    const [showValue, setshowValue] = useState(false);  //alert show
    const [authCode, setAuthCode] = useState('');  // get the input code
    const [loading, setLoading] = useState('');  //loadin function
    const { username } = route.params;   //username getting from previous screen

    // confirm signup button
    async function confirmSignUp() {
        try {
            console.log(username, authCode)
            await Auth.confirmSignUp(username, authCode);
            console.log(':white_tick: Code confirmed');
            navigation.navigate('Login')
        } catch (error) {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'Enter Verify Code',
            });
            setLoading(false)
        }
    }

    // Resend code
    let resendCode = () => {
        if (!username) {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'please enter your email',
            });
            return false;
        }
        Auth.resendSignUp(username)
            .then(() => {
                Toast.show({
                    onPress: () => { Toast.hide() },
                    type: ALERT_TYPE.SUCCESS,
                    title: 'SUCCESS',
                    textBody: 'Code Sent',
                });
                setLoading(false)
            })
            .catch(err => {
                Toast.show({
                    onPress: () => { Toast.hide() },
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: 'Code was not sent succesfully',
                });
                setLoading(false)
            });
    };
    return (
        <Root>
            <SafeAreaView style={styles.mainHead}>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.row}>
                            <Image source={require('../../../assets/Vector.png')} />
                            <Text style={styles.texthead}>Go back</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 30 }} >
                        <Image style={styles.image} source={require('../../../assets/image1.png')} />
                        <View style={{ marginVertical: 20 }}><Text style={styles.textPara}>We have sent you a verification code to {username}</Text></View>
                        <Text style={styles.textSec}>Please enter the submitted code to complete your registration process.</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.textHeading}>Verification code</Text>
                        <CustomInput value={authCode} setValue={setAuthCode} />
                    </View>
                    <View style={{ marginVertical: 40, backgroundColor: '#2FBAF3', borderRadius: 10 }}>
                        <TouchableOpacity onPress={confirmSignUp} >
                            <View style={{ marginVertical: 12 }}>
                                <Text style={styles.logText}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.textHeading2}>Did you not receive the code?</Text>
                    <TouchableOpacity onPress={resendCode} ><Text style={styles.resend}  >Re-send it again</Text></TouchableOpacity>
                </View>
                {showValue ? <View style={{ padding: 10, marginVertical: 30 }}>
                    <View style={styles.codeBack}>
                        <Text style={styles.codeText}>This code is invalid</Text>
                    </View>
                </View> : null}
            </SafeAreaView>
        </Root>
    )
}

export default VerifyCode

const styles = StyleSheet.create({
    mainHead: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
    },
    texthead: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        marginHorizontal: 10
    },
    image: {
        width: 200,
        height: 55,
        marginHorizontal: -25
    },
    textPara: {
        color: '#144F8E',
        fontSize: 28,
        fontWeight: '600'
    },
    textSec: {
        color: '#6F6F6F',
        fontSize: 14,
        fontWeight: '500'
    },
    textHeading: {
        color: '#000',
        fontWeight: '500',
        fontSize: 15
    },
    textHeading2: {
        color: '#000',
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center'
    },
    resend: {
        color: '#2FBAF3',
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center'
    },
    codeText: {
        color: '#D43535',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        marginVertical: 10
    },
    codeBack: {
        backgroundColor: '#FFE0E0',
        borderRadius: 12,
    },
    logText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    }
})