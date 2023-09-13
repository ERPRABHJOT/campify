import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../../Components/CustomInput/CustomInput'
import { ALERT_TYPE, Root, Toast } from 'react-native-alert-notification';



const CreateAccount = ({ navigation }) => {

    const [code, setCode] = useState('')  // camp validate code 

    // camp invitation functionalty
    const campidvalidate = async () => {
        if (code.length != 6) {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'Enter a 6 digit code',
            })
        }
        else if (code) {
            let response = await fetch('https://mobile-api-dev.campify.io/auth/code/' + code, {
                method: 'GET',
            }).then((result) => {
                if (result.status == 200) {
                    navigation.navigate('CampName', {
                        code: code
                    }
                    )
                } else if (result.status == 404) {
                    navigation.navigate('BordingScreen')
                    Toast.show({
                        onPress: () => { Toast.hide() },
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: 'invalid code!',
                    })

                } else {
                    Toast.show({
                        onPress: () => { Toast.hide() },
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: result.status,
                    })

                    console.log(result.status)
                }
            })
                .catch((e) => {
                    alert(e)
                });
        }
        else if (!(code)) {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'Enter Invition Code',
            })
        }
    }
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
                        <View style={{ marginVertical: 20 }}><Text style={styles.textPara}>Let's first find your Camp</Text></View>
                        <Text style={styles.textSec}>Please enter here the code that was provided to you to associate your account to your camp.</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.textHeading}>Camp Invitation Code</Text>
                        <CustomInput value={code} setValue={setCode} />
                        <Text style={styles.textSec}>Dont have a code? Please contact your Camp director</Text>
                    </View>
                    <View style={{ marginVertical: 40, backgroundColor: '#2FBAF3', borderRadius: 10 }}>
                        <TouchableOpacity onPress={campidvalidate}>
                            <View style={{ marginVertical: 12 }}>
                                <Text style={styles.logText}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                    </View>
                </View>
            </SafeAreaView>
        </Root>
    )
}

export default CreateAccount

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
    sucesText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#D43535',
        fontWeight: '500'
    },
    sucesBor: {
        backgroundColor: '#FFE0E0',
        padding: 10,
        borderRadius: 8,
    },
    logText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    }
})