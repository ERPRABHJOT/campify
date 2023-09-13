import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, LogBox, } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../context/AuthContext';


const CustomDrawer = props => {

  const { username , updateUsername , updateRole, updateCampId, logout, updateCampStatus , updateinfo , info} = useContext(AuthContext)
  const [value, setValue] = useState("TestCamp"); // camp data set
  const [isFocus, setIsFocus] = useState(false);
  const [dataa, setData] = useState([]);  //data from api
  const [full_name, setFull_name] = useState([]); //set full name
  const [camp_name, setCamp_name] = useState([]);
  const [group, setGroup] = useState([]) //group data
  const [placeholder, setPlaceholder] = useState()
  const [idToken, setIdToken] = useState()  //get token
   //group components
  let Groups = (dataa) => {
    let data = dataa.camps.map((cmp) => {
      return (
        { label: cmp.camp_name, value: cmp.camp_name, role: cmp.role_name, campid: cmp.camp_id, campStatus: cmp.camp_status , info:cmp }
      )
    });
    return data
  
  }
  //to store data in async storage
  let storeData = async (data) => {
    try {
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify(data)
      );
    } catch (error) {
    }
  };
   //to get data in async storage
  let retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
      }
    } catch (error) {
    }
  };
   //get token from asyncstorage
  const gettoken = async () => {
    let token = await AsyncStorage.getItem("idToken");
    setIdToken(token)
  }
  function Circle() {
    try {
      return (<View style={{ backgroundColor: '#2FCFE4', borderRadius: 99, height: 30, width: 30, marginVertical: 5 }}>
        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: '500', margin: 3 }}>
          {dataa.full_name[0].toUpperCase()}
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

  useEffect(() => {

    gettoken()
    fetch('https://mobile-api-dev.campify.io/profile/', {
      method: "GET",
      headers: {
        'Authorization': 'bearer ' + idToken,
      }
    })
      .then((result) => {
        result.json().then((response) => {
          setData(response)
          setGroup(Groups(response))
          setPlaceholder(response.camps[0].camp_name)
          updateRole(response.camps[0].role_name)
          updateCampStatus(response.camps[0].camp_status)
          updateinfo(response.camps[0])
          updateUsername(response.full_name)
          updateCampId(response.camps[0].camp_id)
          storeData(response)
          retrieveData()
        })
      })
      .catch((error) => console.log("error =" + error))
  }, [idToken]);
  async function signOut() {
    try {
      await Auth.signOut();
      props.updateAuthState('loggedOut');
      logout()
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#fff' }}>
        <ImageBackground>
          <Image
            source={require('../../assets/Campify-Login.png')}
            style={{ padding: 20, height: 45, width: 126, marginHorizontal: 20, marginVertical: 20 }}
          />
        </ImageBackground>
        <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#2FBAF3', width: 250, marginHorizontal: 15, backgroundColor: '#E6F7FD', padding: 10 }}>
          <Dropdown
            style={[isFocus && { borderColor: '#969696' }]}
            placeholderStyle={{ backgroundColor: '' }}
            selectedTextStyle={{ color: '#000', marginHorizontal: 20 }}
            data={group}
            maxHeight={170}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              updateRole(item.role)
              updateCampId(item.campid)
              updateCampStatus(item.campStatus)
              updateinfo(item.info)
              setIsFocus(false);
            }} />
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#4090E51A', marginVertical: 10, width: 250, marginHorizontal: 20 }}></View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, }}>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Circle></Circle>
            <Text style={{ fontSize: 15, marginLeft: 5, color: '#000', fontWeight: '600' }} value={full_name} setValue={setFull_name}>
            {username}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { signOut() }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ height: 20, width: 20 }} source={require('../../assets/Logout.png')} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: '#000',
                fontWeight: '600',
              }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default CustomDrawer;
