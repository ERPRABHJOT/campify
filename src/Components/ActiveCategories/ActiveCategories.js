import React, { useState, useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, LayoutAnimation, Platform, UIManager, Image, Pressable
} from 'react-native';
import { AuthContext } from '../../../context/AuthContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// activity category
export default function ActiveCategories() {
  return (
    <View style={styles.container}>
      <Item />

    </View>
  );
}

function Item() {

  const [checkBoxOne, setCheckBoxOne] = useState("")
  const [checkBoxTwo, setCheckBoxTwo] = useState("")
  const [checkBoxThree, setCheckBoxThree] = useState("")
  const [checkBoxFour, setCheckBoxFour] = useState("")


  let furtherAssistanceData = []
  if (checkBoxOne) {
    furtherAssistanceData.push(checkBoxOne)
  }
  if (checkBoxTwo) {
    furtherAssistanceData.push(checkBoxTwo)
  }
  if (checkBoxThree) {
    furtherAssistanceData.push(checkBoxThree)
  }
  if (checkBoxFour) {
    furtherAssistanceData.push(checkBoxFour)
  }


  const { info } = useContext(AuthContext)

  const GetData = ({ item, index }) => {

    const [open, setopen] = useState(false); // for show and hide categories
    const onPress = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setopen(!open);
    };

    return (
      <View>
        <TouchableOpacity style={[styles.item, !open && { height: 40 }]} onPress={() => onPress()} activeOpacity={1}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              {open ?
                <Image source={require('../../assets/Polygon1.png')}  />
                :
                <Image source={require('../../assets/Polygon.png')} />
              }


              <Text style={styles.subText}>{item.activity_category_name} ({item.activity_category_id})</Text>
            </View>
            <View>
              <Pressable>
                {open == "" ?
                  <View style={[{ borderColor: "#A4A4A4" }, styles.box]}></View>
                  :
                  <View style={[{ borderColor: "#0085FF",backgroundColor:'#0085FF',alignItems:'center',justufyContent:'center' }, styles.box]}>
                  <Text style={{color:'#fff',fontSize:23, fontWeight:'700',marginTop:-6}}>–</Text>
                 </View>
                }
              </Pressable>
            </View>

          </View>

          <View>

            {item.subcategories.map((sub) => {
              const [play, setPlay] = useState(false)
              const [cat, setCat] = useState(false);
              const onCat = () => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setPlay(!play);
                setCat(!cat)
              }
              return (

                <View>
                  <TouchableOpacity style={[styles.subitem, !open && { height: 40 }]} onPress={() => onCat()} activeOpacity={1}>
                  <View style={{ borderColor: '#BBDCFF', borderWidth: 0.4, marginVertical: 5,marginBottom:16 }}></View>

                    <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                    <View style={{ flexDirection: 'row',}}>

                      {play ?
                        <Image source={require('../../assets/Polygon1.png')} />
                        :
                        <Image source={require('../../assets/Polygon.png')} />
                      }
                      <Text style={styles.subText}>
                        {sub.activity_subcategory_name} ({sub.activity_subcategory_id})
                      </Text>

                      </View>
                      <View style={{marginRight:10}}>
                        <Pressable>
                          {play ?

                            <View style={[{ borderColor: '#065987', backgroundColor: '#065987', alignItems: 'center', justifyContent: 'center' }, styles.box2]}>
                              <Image source={require('../../assets/check.png')} style={styles.box2} /></View>
                            :
                            <View style={[{ borderColor: "#A4A4A4",borderRadius:3 }, styles.box2]}></View>


                          }
                        </Pressable>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {
                    cat && (
                      <View>

                        {sub.activities.map((sub2) => {
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
      data={info.activity_categories}
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
    height: 15,
    width: 15,
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

  },
  minusIcon:{
    height:80,
    width:80
  }
});
