import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomFlatList from '../../Components/CustomFlatList/CustomFlatList'
import { AuthContext } from '../../../context/AuthContext'
import { Dimensions } from 'react-native';
import {StatusBar,Box,HStack,Pressable,} from 'native-base';

const Newsfeed  = ({ navigation, initials }) => {

  const { role, campStatus } = useContext(AuthContext)  // get user role type from login credential
  const windowWidth = Dimensions.get("window").width;  // set width for responsiveness
  const windowHeight = Dimensions.get("window").height;  // set Height for responsiveness
  navigation.setOptions({ headerShown: false });
  
  return (
    <View style={{ backgroundColor: '#fff' }} >
      {campStatus == "OPEN" ? role == "ADMIN" ? <View style={{ backgroundColor: '#fff' }}>
        <HeaderBar navigation={navigation} />
        <ScrollView  >
          <CustomFlatList style={{ marginVertical: 10 }} />
        </ScrollView>
        <View style={{ position: 'absolute', backgroundColor: '#fff', alignItems: 'flex-end', marginHorizontal: 330, marginVertical: 600 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Createannouncement')} >
            <View style={{ padding: 10 }}>
              <View style={Platform.OS === 'ios' ? styles.iosDiv : styles.android}>
                <View style={styles.plusBorder}>
                  <Image source={require('../../assets/plus.png')} style={styles.plusIcon} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View> : <View style={{ backgroundColor: '#fff' }}>
        <HeaderBar navigation={navigation} />
        <ScrollView  >
          <CustomFlatList style={{ marginVertical: 10 }} />
        </ScrollView>
      </View> : role == "ADMIN" ? <View style={{ backgroundColor: '#fff' }}>
        <HeaderBar navigation={navigation} />
        <View style={{ padding: 10, }}>
          <View style={styles.backgroundText}><Text style={styles.notText}>🎉 This camp is not active</Text></View></View>
        <ScrollView  >
          <CustomFlatList style={{ marginVertical: 10 }} />
        </ScrollView>
      </View> : <View ><HeaderBar navigation={navigation} /><Counsellor></Counsellor></View>}
    </View>
  )
}

export default Newsfeed;

// header top  for toggle 
function HeaderBar(props) {
  console.log("Props in HeaderBar", props);
  return <>
    <StatusBar barStyle="light-content" />
    <Box safeAreaTop />
    <HStack px="1" bg="red" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350" backgroundColor='#fff'>
      <HStack alignItems="center" flexDirection='column' display='flex' backgroundColor='#fff'>
        <Pressable onPress={() => props.navigation.toggleDrawer()}>
          <View style={styles.cloud}>
            <View style={styles.flexHome}>
              <Image style={styles.iconsPng2} source={require('../../assets/tab.png')} />
              <Image style={styles.iconsPng} source={require('../../assets/Home.png')} />
              <Text style={styles.textHeader}>Home</Text>
            </View>
            <Image source={require('../../assets/Frame.png')} style={styles.img2} />
          </View>
        </Pressable>
      </HStack>
    </HStack>
  </>;
}

// counsellor component
function Counsellor(props) {
  console.log("Props in Counsellor", props);
  return <>
    <StatusBar barStyle="light-content" />
    <Box safeAreaTop />
    <HStack flexDirection='column' display='flex' backgroundColor='#fff'>
      <Pressable onPress={() => props.navigation.toggleDrawer()}>
        <View style={styles.cloud}>
          <View style={{ backgroundColor: '#fff' }}>
            <Image style={styles.image} source={require('../../assets/Board.png')} />
            <Text style={styles.texthead}>This camp is not available</Text>
            <Text style={styles.text1}>Please contact your camp director</Text>
            <View style={{ marginVertical: 150 }} />
          </View>
        </View>
      </Pressable>
    </HStack>
  </>;
}



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 10
  },
  img2: {
    height: 55,
    width: 190,
    marginHorizontal: 40
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  homeImg: {
    height: 25,
    width: 30,
    marginHorizontal: 10
  },
  textHead: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginVertical: 2
  },
  logo: {
    height: 500,
    width: 350,
    marginHorizontal: 20,
    marginVertical: 50
  },
  plusBorder: {
    backgroundColor: '#2F8DE4',
    borderRadius: 99,
    height: 60,
    width: 60,
    elevation: 0.5
  },
  plusIcon: {
    height: 32,
    width: 32,
    margin: 14
  },
  iosDiv: {
    marginVertical: 90
  },
  android: {
    marginTop: -40
  },
  textHeader: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 5
  },
  iconsPng: {
    height: 22,
    width: 24,
    marginHorizontal: 8
  },
  flexHome: {
    flexDirection: 'row',
    padding: 10
  },
  cloud: {
    flexDirection: 'row',
  },
  iconsPng2: {
    height: 20,
    width: 24,
    marginVertical: 2,
    marginHorizontal: 8
  },
  notText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff'
  },
  backgroundText: {
    backgroundColor: '#1DA2AA',
    padding: 10,
    borderRadius: 22
  },
  image: {
    height: 320,
    width: 400,
    marginVertical: 30
  },
  text: {
    fontWeight: '500',
    fontSize: 25,
    color: '#000',
    textAlign: 'center'
  },
  text1: {
    fontWeight: '500',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginVertical: 5
  },
  texthead: {
    color: '#000',
    fontSize: 19,
    fontWeight: '500',
    marginHorizontal: 10,
    textAlign: 'center'
  },
})