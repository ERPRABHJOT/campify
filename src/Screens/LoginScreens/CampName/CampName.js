import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomInput from '../../../Components/CustomInput/CustomInput'
import CustomTextInput from '../../../Components/CustomTextInput/CustomTextInput'
import { Auth } from 'aws-amplify';
import { ALERT_TYPE, Root, Toast } from 'react-native-alert-notification';

const CampName = ({ navigation, route }) => {


    const [show, setshow] = useState(true);  // password show and hide
    const [shows, setShows] = useState(true);  // confirm password show and hide
    const [checked, setchecked] = useState(false);  //for checkbox confirmation
    const [name, setName] = useState('campify');
    const [password, setPassword] = useState('');  //get confirm pass value
    const [username, setUsername] = useState('');
    const [confirmpass, setConfirmpass] = useState('') //get confirm pass value
    const [email, setEmail] = useState('');  //get email value
    const [emailValidError, setEmailValidError] = useState('');  //email validate
    const [family_name, setFamilyNAme] = useState('');
    const [group, setGroup] = useState([]) //get groups name from api
    const [activities, setActivities] = useState([]) //get activities name from api
    const [checkBoxOne, setCheckBoxOne] = useState('');

    let furtherAssistanceData = []
    if (checkBoxOne) {
        furtherAssistanceData.push(checkBoxOne)
    }
    // for campUser type set  
    let [campData, setCampData] = useState({}) //get camp data from api

    const { code } = route.params;
    let response = fetch('https://mobile-api-dev.campify.io/auth/code/' + code, {
        method: 'GET',
    }).then((result) => {
        result.json().then((response) => {
            setCampData(response)
            setActivities(response.activities)
            setGroup(response.groups)

        })
    }).catch((err) => {
    })

    let Groupss = () => {
        let data = group.map((grp) => {
            return (
                <View>
                    <Text style={styles.gpatText}>{grp.group_name}, </Text>
                </View>
            )
        });

        return data
    }

    let Activities = () => {
        let data = activities.map((act) => {
            return (
                <View><Text style={styles.gpatText}> {act.activity_name}, </Text></View>
            )
        });

        return data
    }

    // Email Validator
    const handleValidEmail = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (val.length === 0) {
            setEmailValidError('email address must be enter');

        } else if (reg.test(val) === false) {
            setEmailValidError('enter valid email address');

        } else if (reg.test(val) === true) {
            setEmailValidError('');

        }
    };

    //signup functionalty start here
    const signUp = async () => {
        if (family_name == "") {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'Fullname is required',
            })
            setLoading(false)
        } else if (username == "") {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'Email is required',
            })
            setLoading(false)
        } else if (password == "") {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'password is required',
            })
            setLoading(false)
        } else if (confirmpass == "") {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'Confirmpassword is required',
            })
            setLoading(false)
        }
        else if (password != confirmpass) {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'Entered Password and Confirm password Not Matched ',
            })
            setLoading(false)

        }
        else if (checked == "") {
            Toast.show({
                onPress: () => { Toast.hide() },
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: 'Accept Terms and Conditions',
            })
            setLoading(false)
        }
        else {
            try {
                setEmail(username);
                console.log(email);
                await Auth.signUp({ username, password, attributes: { email, family_name, name } })
                navigation.navigate('VerifyCode', {
                    username: username
                });
            }
            catch (error) {
                console.log('❌ Error signing up...', error);
                Toast.show({
                    onPress: () => { Toast.hide() },
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: '' + error,
                })
            }
        }

    }

    return (
        <Root>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <SafeAreaView style={styles.mainHead}>
                    <View style={{ padding: 20 }}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/Vector.png')} /></TouchableOpacity>
                            <Text style={styles.texthead}>Go back</Text>
                        </View>
                        <View style={{ paddingVertical: 30 }}>
                            <Image style={styles.image} source={require('../../../assets/image1.png')} />
                            <View style={{ paddingVertical: 30 }}>
                                <Text style={styles.textSec}>You have been invited to join </Text>
                                <Text style={styles.textPara}>{campData.camp_name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textHeading}>{campData.role_name} Groups - </Text>
                                    {campData.role_name === "ADMIN" ?
                                        <Text style={styles.gpatText}> / All Groups - All Activites </Text> : campData.role_name === "COUNSELLOR" ? <Groupss></Groupss> : <Activities></Activities>}
                                </View>
                                <View style={styles.bottomBorder}></View>
                            </View>

                        </View>
                        <View>
                            <Text style={styles.textHeading}>Full name</Text>
                            <CustomInput value={family_name} setValue={setFamilyNAme} />
                        </View>
                        <View>
                            <Text style={styles.textHeading}>Email address</Text>
                            <CustomInput onChangeText={value => {
                                setEmail(value);
                                handleValidEmail(value);
                            }} value={username} setValue={setUsername} />
                        </View>
                        <View>
                            <Text style={styles.textHeading}>Password</Text>
                            <CustomTextInput value={password} setValue={setPassword} secureTextEntry={show} />
                            <View style={{ alignSelf: 'flex-end' }}>
                                <TouchableOpacity onPress={() => setshow(!show)}>
                                    <Image style={styles.eye} source={require('../../../assets/eye.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textHeading}>Confirm password</Text>
                            <CustomTextInput value={confirmpass} setValue={setConfirmpass} secureTextEntry={shows} />
                            <View style={{ alignSelf: 'flex-end' }}>
                                <TouchableOpacity onPress={() => setShows(!shows)}>
                                    <Image style={styles.eye} source={require('../../../assets/eye.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.newDiv} >
                            <View style={Platform.OS === 'ios' ? styles.checkboxDIV : styles.androidcheckbox} >
                                <Pressable onPress={() => {
                                    if (checkBoxOne == "") {
                                        setCheckBoxOne("")
                                    } else {
                                        setCheckBoxOne("")
                                    }
                                }} >
                                    {checkBoxOne == "" ?
                                        <View style={[{ borderColor: "#A4A4A4" }, styles.box2]}></View>
                                        :
                                        <View style={[{ alignItems: 'center', justifyContent: 'center' }, styles.box2]}><Image source={require('../../../assets/check.png')} style={styles.box2} /></View>
                                    }
                                </Pressable>
                            </View>
                            <Text style={styles.accountText2}>I agree to the</Text>
                            <TouchableOpacity><Text style={styles.accountText}>Terms and Conditions</Text></TouchableOpacity>
                        </View>
                        <View>
                            <View style={{ backgroundColor: '#2FBAF3', borderRadius: 10, paddingVertical: 5 }}>
                                <TouchableOpacity onPress={signUp}>
                                    <View style={{ marginVertical: 10 }}>
                                        <Text style={styles.logText}>Sign up</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </Root>
    )
}


export default CampName

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
    bottomBorder: {
        borderWidth: 1,
        color: '#DFDFDF',
        marginVertical: 10
    },
    accountText: {
        color: '#2FBAF3',
        fontWeight: '500',
        fontSize: 15,
        marginVertical: 10
    },
    accountText2: {
        color: '#000',
        fontWeight: '500',
        fontSize: 15,
        marginVertical: 10,
        marginHorizontal: 8
    },
    newDiv: {
        flexDirection: 'row',
        padding: 10
    },
    checkBox: {
        backgroundColor: '#fff',
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 12,
        height: 40,
        width: 40
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
    checkboxDIV: {
        marginVertical: 7
    },
    androidcheckbox: {
        marginVertical: 12
    },
    gpatText: {
        color: '#000',
        fontSize: 15,
        fontWeight: '500'
    },
    box2: {
        height: 18,
        width: 18,
        borderWidth: 1,
        borderBottomWidth: 2,
        borderRightWidth: 2,
    },
})