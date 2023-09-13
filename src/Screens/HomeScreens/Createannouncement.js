import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, Dimensions, Modal, } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import AllGroup from './AllGroup/AllGroup';
import Activities from '../Activities';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Amplify, { Storage } from 'aws-amplify';
import { AuthContext } from '../../../context/AuthContext';



Storage.configure({ level: 'protected' }); // aws bucket storing data

const Createannouncement = ({ navigation }) => {

    const { info, username } = useContext(AuthContext)
    const [text, onChangeText] = React.useState("");  //get announcement text
    const [value, setValue] = useState();  // dropdown value 
    const [isFocus, setIsFocus] = useState(false); // dropdown value 
    const [show, setShow] = useState(false); // cancel button modal show
    const [asset, setAsset] = useState(null);   //for image data set
    const [progressText, setProgressText] = useState('');  //image progress upload
    const [isLoading, setisLoading] = useState(false);
    const [galleryPhoto, setGalleryPhoto] = useState(); //for open gallary
    const [idToken, setIdToken] = useState()  // get user token from asyncstorage

    let CampId = info.camp_id.toString();  // camp id to post data
    let details = ["item_name string",]  //audience detail to post data

    // dropdown data
    const data = [
        { label: 'General', value: 'general' },
        { label: 'Groups', value: 'groups' },
        { label: 'Activities', value: 'activities' },
    ];


    let options = {
        saveToPhotos: true,
        mediaType: "photo",
    }

    //get token
    const gettoken = async () => {
        let token = await AsyncStorage.getItem("idToken");
        setIdToken(token)
        // console.log("ashu" + token)
    }

    useEffect(() => {
        gettoken();
    }, [])

    //pick photo from gallary
    const openGallery = async () => {
        const result = await launchImageLibrary(options)
        setGalleryPhoto(result.assets[0].uri);
        setAsset(result.assets[0]);
    };

    const fetchResourceFromURI = async uri => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };
    // upload image data to aws bucket
    const uploadResource = async () => {
        if (!text) return;
        setisLoading(true);
        const img = await fetchResourceFromURI(asset.uri);
        let name = `image-${new Date().toDateString()}.jpg`
        return Storage.put(name, img, {
            level: 'public',
            contentType: asset.type,
            progressCallback(uploadProgress) {
                setProgressText(
                    `Progress: ${Math.round(
                        (uploadProgress.loaded / uploadProgress.total) * 100,
                    )} %`,
                );
                console.log(
                    `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
                );
            },
        })
            .then(res => {
                setProgressText('Upload Done: 100%');
                setAsset(null);
                setisLoading(false);
                Storage.get(res.key)
                    .then(result =>
                        console.log('9999999', result))
                    .catch(err => {
                        setProgressText('Upload Error');
                        console.log(err);
                    });
            })
            .catch(err => {
                setisLoading(false);
                setProgressText('Upload Error');
                console.log(err);
            });
    };

    // create camp announcement or posting announcement data
    const campcreate = async () => {
        try {
            if (!(text && asset)) {
                alert('All fields are reqiured')
                return
            }

            uploadResource();

            console.log(asset.uri, '555555555')


            fetch('https://mobile-api-dev.campify.io/news/', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'bearer ' + idToken,
                },
                body: JSON.stringify({
                    image_url: asset.uri, content: text, news_audience_name: value,
                    audience_details: details, camp_id: CampId
                })
            }).then((result) => {
                result.json().then((response) => {
                    console.log(response, "Response")

                    navigation.navigate('Newsfeed')

                })
            })
        } catch (error) {
            alert(error);
        }
    }

    // username circle  view
    function Circle() {
        try {
            return (<View style={{ backgroundColor: '#2FCFE4', borderRadius: 99, height: 30, width: 30, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: '500', margin: 3 }}>
                    {username[0].toUpperCase()}
                </Text>
            </View>)

        }
        catch {
            return (<View style={{ backgroundColor: '#2FCFE4', borderRadius: 99, height: 30, width: 30, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: '500', margin: 3 }}>
                </Text>
            </View>
            )
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: '#2FBAF3' }}>
            <View style={styles.mainView}>
                <View style={styles.border}>
                    <View style={styles.firstRaw}>
                        <TouchableOpacity onPress={() => setShow(!show)}><Text style={styles.text}>Cancel</Text></TouchableOpacity>
                        <Text style={styles.txtCreate}>Create announcement</Text>
                        <TouchableOpacity onPress={() => campcreate()}><Text style={styles.text}>Create</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.mainView}>
                <View style={styles.nameDiv}>
                    <View style={styles.rowDic}>
                        <Circle></Circle>
                        <Text style={styles.text2}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View style={{ padding: 10 }}>
                    <View style={styles.bottomBorder}>
                        <TextInput
                            multiline
                            numberOfLines={10}
                            style={styles.input}
                            onChangeText={onChangeText}
                            placeholder='Type here your announcement'
                            value={text}
                        />
                    </View>
                    <Text style={styles.text1}>*This field is required</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <View style={styles.rowDic}>
                        <TouchableOpacity onPress={openGallery}><Image source={require('../../assets/Gallery.png')} style={styles.icon} /></TouchableOpacity>
                        <Text style={styles.text2}>Add picture</Text>
                        <Text style={styles.txt}>Optional</Text>
                    </View>
                    {
                        galleryPhoto ?
                            <Image style={{ height: 200, width: 370, marginVertical: 5 }} source={{ uri: galleryPhoto }}></Image>
                            : null}
                </View>
                <View style={{ padding: 10, marginVertical: 10 }}>
                    <View style={styles.borderEnd}></View>
                    <View style={{ marginVertical: 15 }}>
                        <Text style={styles.text2}>Show message to</Text>

                        <View style={styles.palaceBorder}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: '#969696' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={data}
                                maxHeight={170}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select Item'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }} />
                        </View>

                    </View>
                </View>
                <View style={{ marginTop: -20 }}>
                    {value === 'groups' ? <AllGroup />
                        :
                        <Text style={styles.txtEnd}>This announcement will be displayed to all your counselors, staff and admins.</Text>}
                </View>
                <View style={{ marginTop: -10 }}>
                    {value === 'activities' ? <Activities />
                        :
                        null}
                </View>
                <View style={{ marginVertical: 100 }} />
                <View >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={show}
                    >
                        <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'flex-end' }}>
                            <View style={{ backgroundColor: '#ffff', borderRadius: 20, flex: 0.3, padding: 10, margin: 10 }}>
                                <Text style={styles.modalText}>Cancel this announcement?</Text>
                                <Text style={styles.modalText2}>By cancelling you will lose all the content you have already written.</Text>
                                <View style={{ marginVertical: 25 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Newsfeed')}>
                                        <View style={styles.modalBorder}>
                                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' }} >Continue</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Createannouncement

const styles = StyleSheet.create({
    firstRaw: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignContent: 'center',
        backgroundColor: '#2FBAF3',
    },
    mainView: {
        backgroundColor: 'white',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    border: {
        backgroundColor: '#2FBAF3',
        paddingVertical: 5
    },
    mainConst: {
        backgroundColor: '#2FBAF3',
    },
    rowDic: {
        flexDirection: 'row',
    },
    text2: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        marginVertical: 8,
        marginHorizontal: 5,
    },
    icon: {
        height: 40,
        width: 40
    },
    nameDiv: {
        padding: 10
    },
    bottomBorder: {
        borderColor: '#ECECEC',
        borderWidth: 1,
        height: 200,
        borderLeftColor: '#fff',
        borderRightColor: '#fff'
    },
    input: {
        color: '#000',
        fontSize: 15,
        fontWeight: '500',
        width: Dimensions.get('window').width * 0.90,
    },
    text1: {
        color: '#7E7E7E',
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 15
    },
    txt: {
        color: '#717171',
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 8
    },
    borderEnd: {
        borderColor: '#ECECEC',
        borderWidth: 1,
    },
    palaceBorder: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E1E1E1',
        padding: 10
    },
    txtEnd: {
        color: '#000',
        fontSize: 13,
        fontWeight: '500',
        padding: 10,
        backgroundColor: '#fff'
    },
    txtCreate: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    modalText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginVertical: 25
    },
    modalText2: {
        color: '#000',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    modalBorder: {
        backgroundColor: '#2FBAF3',
        padding: 15,
        borderRadius: 12
    }

})