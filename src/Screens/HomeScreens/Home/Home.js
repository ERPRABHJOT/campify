import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'native-base';
const Home = () => {
  return (
    <SafeAreaView >
      <View style={styles.topBorder}>
        <View style={styles.row2}>
          <View style={styles.row}>
            <TouchableOpacity><Image source={require('../../../assets/Home.png')} style={styles.homeImg} /></TouchableOpacity>
            <Text style={styles.textHead}>Home</Text>
          </View>
          <Image source={require('../../../assets/Frame.png')} style={styles.img2} />
        </View>
      </View>
      <View>
        <ScrollView style={{ position: 'relative' }}>
          <View style={{ padding: 10 }}>
            <View style={styles.annouceBorder}>
              <View style={{ flexDirection: 'row', padding: 15 }}>
                <Image source={require('../../../assets/Right.png')} style={{ height: 27, width: 27 }} />
                <Text style={styles.annouceText}>Announcement published successfully</Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: '#F5FCFF' }}>
            <View style={styles.borderConst}>
              <View style={styles.nameDiv}>
                <View style={styles.rowDic}>
                  <Image source={require('../../../assets/NameIcon.png')} style={styles.icon} />
                  <Text style={styles.text2}>Hansel Baez,</Text>
                  <Text style={styles.textGrey}>Title</Text>
                </View>
                <Text style={styles.textGrey}>7 hours ago</Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Image source={require('../../../assets/Rect.png')} style={styles.rectImg} />
                <Text style={styles.textPara}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec efficitur nulla. Praesent viverra feugiat diam id consequat. Pellentesque luctus dui eget sem maximus, vel dictum diam tristique.
                </Text>
              </View>
            </View>
            <View style={styles.borderConst}>
              <View style={styles.nameDiv}>
                <View style={styles.rowDic}>
                  <Image source={require('../../../assets/NameIcon.png')} style={styles.icon} />
                  <Text style={styles.text2}>Hansel Baez,</Text>
                  <Text style={styles.textGrey}>Title</Text>
                </View>
                <Text style={styles.textGrey}>7 hours ago</Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.textPara}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec efficitur nulla. Praesent viverra feugiat diam id consequat. Pellentesque luctus dui eget sem maximus, vel dictum diam tristique.
                </Text>
              </View>
            </View>
            <View style={styles.borderConst}>
              <View style={styles.nameDiv}>
                <View style={styles.rowDic}>
                  <Image source={require('../../../assets/NameIcon.png')} style={styles.icon} />
                  <Text style={styles.text2}>Hansel Baez,</Text>
                  <Text style={styles.textGrey}>Title</Text>
                </View>
                <Text style={styles.textGrey}>7 hours ago</Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Image source={require('../../../assets/Rect2.png')} style={styles.rectImg} />
                <Text style={styles.textPara}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec efficitur nulla. Praesent viverra feugiat diam id consequat. Pellentesque luctus dui eget sem maximus, vel dictum diam tristique.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={{ position: 'absolute', padding: 100, marginVertical: 100 }}>
          <View style={styles.plusBorder}>
            <TouchableOpacity><Image source={require('../../../assets/plus.png')} style={styles.plusIcon} /></TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default Home
const styles = StyleSheet.create({
  textHead: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginVertical: 2
  },
  homeImg: {
    height: 25,
    width: 30,
    marginHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 10
  },
  img2: {
    height: 60,
    width: 190
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowDic: {
    flexDirection: 'row',
  },
  icon: {
    height: 40,
    width: 40
  },
  text2: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginVertical: 8,
    marginHorizontal: 5
  },
  textGrey: {
    color: '#7D7D7D',
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 11,
  },
  nameDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  rectImg: {
    height: 200,
    width: 350
  },
  textPara: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 5
  },
  borderConst: {
    backgroundColor: '#fff',
    padding: 20
  },
  plusBorder: {
    backgroundColor: '#2F8DE4',
    borderRadius: 99,
    height: 70,
    width: 70
  },
  plusIcon: {
    height: 40,
    width: 40,
    margin: 15
  },
  annouceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
    marginVertical: 5
  },
  annouceBorder: {
    backgroundColor: '#1DAA3C',
    borderRadius: 50
  }
})

