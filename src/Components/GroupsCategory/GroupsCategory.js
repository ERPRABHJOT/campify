import { FlatList } from 'native-base';
import React, { useState, useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Image, Pressable
} from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
// for play and pause button in group  category
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function GroupsCategory() {
  return (
    <View style={styles.container}>
      <Item1 />
    </View>
  );
}

function Item1() {
  const { info } = useContext(AuthContext) //get data from asyncstorage

  const GetData = ({ item, index }) => {

    const [opencat, setopencat] = useState(false)  //set play button
    const onPress = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setopencat(!opencat);
    };
    return (
      <View>
        <TouchableOpacity style={[styles.item, !opencat && { height: 40 }]} onPress={() => { onPress() }} activeOpacity={1}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'row' }}>
              {opencat ?
                <Image source={require('../../assets/Polygon1.png')} />
                :
                <Image source={require('../../assets/Polygon.png')} />
              }

              <Text style={styles.subText}>{item.group_category_name} ({item.group_category_id})</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable >
                {opencat ?
                  <View style={[{ borderColor: "#0085FF", backgroundColor: '#0085FF', alignItems: 'center', justufyContent: 'center' }, styles.box]}>
                    <Text style={{ color: '#fff', fontSize: 23, fontWeight: '700', marginTop: -6 }}>–</Text>
                  </View>
                  :
                  <View style={[{ borderColor: "#A4A4A4" }, styles.box]}></View>
                }
              </Pressable>
            </View>

          </View>
          <View >
            {item.subcategories.map((sub) => {

              const [play, setPlay] = useState(false)
              const [cat, setCat] = useState(false)
              const onCat = () => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setCat(!cat);
                setPlay(!play);
              };
              return (

                <View>

                  <TouchableOpacity style={[styles.subitem, !opencat && { height: 40 }]} onPress={() => onCat()} activeOpacity={1}>
                    <View style={{ borderColor: '#BBDCFF', borderWidth: 0.4, marginVertical: 5, marginBottom: 16 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", marginRight: 10 }}>

                      <View style={{ flexDirection: 'row' }}>
                        {play ?
                          <Image source={require('../../assets/Polygon1.png')} />
                          :
                          <Image source={require('../../assets/Polygon.png')} />
                        }
                        <Text style={styles.subText}>
                          {sub.group_subcategory_name} ({sub.group_subcategory_id})
                        </Text>

                      </View>
                      <View>
                        <Pressable>
                          {play ?
                            <View style={[{ borderColor: '#065987', backgroundColor: '#065987', alignItems: 'center', justifyContent: 'center' }, styles.box2]}>
                              <Image source={require('../../assets/check.png')} style={styles.box2} /></View>
                            :
                            <View style={[{ borderColor: "#A4A4A4" }, styles.box2]}></View>
                          }
                        </Pressable>
                      </View>
                    </View>

                  </TouchableOpacity>

                  {
                    cat && (
                      <View>

                        {sub.groups.map((sub2) => {
                          return (
                            <Text style={styles.textgp}>
                              {sub2}
                            </Text>
                          )
                        })
                        }
                      </View>

                    )
                  }

                </View>
              )

            })
            }

          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <FlatList
      data={info.group_categories}
      keyExtractor={subcategories => subcategories.id}
      renderItem={({ item, index }) =>
        (<GetData item={item} index={index}></GetData>)} />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 5,
  },
  subitem: {
    width: '100%',
    overflow: 'hidden',
    margin: 10,

  },
  box: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,

  },
  box2: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  textgp: {
    color: '#000',
    fontSize: 18,
    marginHorizontal: 30,
    padding: 10
  },
  subText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
    marginHorizontal: 10

  }
});
