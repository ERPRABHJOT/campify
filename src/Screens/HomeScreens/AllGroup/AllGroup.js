import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Pressable, Dimensions, LayoutAnimation, Platform, UIManager } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import CustomCategory from '../../../Components/GroupsCategory/GroupsCategory'
import { AuthContext } from '../../../../context/AuthContext';
import { CheckBox } from 'react-native-elements';


const AllGroup = () => {

  const { info } = useContext(AuthContext)  // get the data from asyncstorage
  const [check, setCheck] = useState([]) // to check data
   // group component
  const Groups = () => {
    const groupnames = info.groups.map((items) => {
      return (
        <View style={styles.bottomBorder22}>
          <Text style={styles.text22}>
            {items.group_name}
          </Text>
        </View>)
    })
    return groupnames
  }
  //  custom group
  const CustomGroup = () => {

    useEffect(() => {
      console.log("start")
      console.log(info.groups)
      console.log("end")
      setCheck(info.groups)
      console.log(typeof (check))
      console.log(check[0])

      console.log("end2")
    }, []);

    const customgroups = info.groups.map((items, index) => {

      const [dataa, setData] = useState([
        { id: 1, checked: false },
      ])  // data check
      function onCheckChanged(id) {
        let data = [...dataa];
        console.log("Changing data", data);
        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        setData(data);
      }


      return (

        <View>

          {
            dataa.map((item, key) =>

            <TouchableOpacity onPress={() => onCheckChanged(item.id)}>
                {item.checked ?
                  <View style={styles.cont}>
                    <Text style={styles.text2}>
                      {items.group_name}
                    </Text>
                    <CheckBox title={item.key} key={key} checked={item.checked} onPress={() => onCheckChanged(item.id)} />
                  </View>
                  :
                  <View style={styles.cont2}>
                    <Text style={styles.text2}>
                      {items.group_name}
                    </Text>
                    <CheckBox title={item.key} key={key} checked={item.checked} onPress={() => onCheckChanged(item.id)} />
                  </View>
                }
              </TouchableOpacity>

            )
          }

        </View>
      )
    })

    return customgroups

  }
  
  const [radio, setRadio] = useState({
    radio1: false,
    radio2: false,
    radio3: false,
  });

  const [checkBoxOne, setCheckBoxOne] = useState("")
  const [checkBoxTwo, setCheckBoxTwo] = useState("")
  const [checkBoxThree, setCheckBoxThree] = useState("")
  const [checkBoxFour, setCheckBoxFour] = useState("")
  const [checkBoxFive, setCheckBoxFive] = useState("")
  const [checkBoxSix, setCheckBoxSix] = useState("")
  const [checkBoxSeven, setCheckBoxSeven] = useState("")
  const [checkBoxEight, setCheckBoxEight] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const onSubmit = () => {
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
    if (checkBoxFive) {
      furtherAssistanceData.push(checkBoxFive)
    }
    if (checkBoxSix) {
      furtherAssistanceData.push(checkBoxSix)
    }
    if (checkBoxSeven) {
      furtherAssistanceData.push(checkBoxSeven)
    }
    if (checkBoxEight) {
      furtherAssistanceData.push(checkBoxEight)
    }
  }

  return (
    <View>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <View style={styles.field}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
              <Pressable onPress={() => setRadio({ radio1: true, radio2: false, radio3: false, })} style={styles.raw} >
                <View style={styles.radioBox}>
                  <Text style={{ position: 'absolute', color: '#1A324A' }}>All groups</Text>
                  {radio.radio1 && <View style={styles.radioBtn}>
                    <Text style={styles.radioText}>All groups</Text>
                  </View>}
                </View>
              </Pressable>
              <Pressable onPress={() => setRadio({ radio1: false, radio2: true, radio3: false, })} style={styles.raw}>
                <View style={styles.radioBox}>
                  <Text style={{ position: 'absolute', color: '#1A324A' }}>Custom groups</Text>
                  {radio.radio2 && <View style={styles.radioBtn}>
                    <Text style={styles.radioText}>Custom groups</Text>
                  </View>}
                </View>
              </Pressable>
              <Pressable onPress={() => setRadio({ radio1: false, radio2: false, radio3: true, })} style={styles.raw} >
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.radioBox}>
                    <Text style={{ position: 'absolute', color: '#1A324A' }}>Categories</Text>
                    {radio.radio3 && <View style={styles.radioBtn}>
                      <Text style={styles.radioText}>Categories</Text>
                    </View>}
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
          <Text style={styles.txtEnd}>This message will be shared with all the groups in your camp.</Text>
        </View>
        {radio.radio1 == true ? <View style={{ padding: 10 }}>
          <TouchableOpacity><View style={styles.text2}></View></TouchableOpacity>
          <View style={{ marginTop: -20 }}>
            <Groups></Groups>
          </View>
        </View> : radio.radio2 == true ? <View style={{ padding: 10 }}>
          <View><CustomGroup></CustomGroup></View>
        </View> : <View><CustomCategory /></View>}
        <View style={{ marginVertical: 100 }} />
      </ScrollView>
    </View>
  )
}

export default AllGroup


const styles = StyleSheet.create({
  firstRaw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignContent: 'center',
    backgroundColor: '#2FBAF3',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 20
  },
  border: {
    backgroundColor: '#2FBAF3',
    paddingVertical: 20
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
    marginVertical: 15,
    marginHorizontal: 10,
  },
  text22: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginVertical: 8,
  },
  icon: {
    height: 40,
    width: 40
  },
  nameDiv: {
    padding: 10
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
    marginVertical: 5
  },
  txt: {
    color: '#717171',
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10
  },
  palaceBorder: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E1E1E1',
    padding: 10
  },
  txtEnd: {
    color: '#747474',
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 10
  },
  textColor: {
    fontWeight: '600',
    color: "#187498",
    paddingTop: 10,
    letterSpacing: 0.75,
  },
  raw: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioBox: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 999,
    width: 120,
    height: 40
  },
  radioBtn: {
    margin: 2,
    height: 40,
    width: 120,
    backgroundColor: "#4090E5",
    borderWidth: 1,
    borderColor: "#187498",
    borderRadius: 999,
    overflow: "hidden"
  },
  radioText: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    margin: 10
  },
  bottomBordersimple: {
    marginVertical: 5,
    borderColor: '#ECECEC',

  },
  bottomBorder: {
    marginVertical: 5,
    borderColor: '#ECECEC',
    borderBottomWidth: 1,
    borderRadius: 15,

  },
  bottomBorder22: {
    borderColor: '#ECECEC',
    borderBottomWidth: 1,
    margin: 5

  },
  Boder: {
    height: 'auto',
    width: '97%',
    borderWidth: 1,
    borderColor: '#000000',
    marginHorizontal: 7,
    marginVertical: 10,
    borderRadius: 20,
  },
  FLEX: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  root: {
    padding: 20,
    flexGrow: 1
  },
  text: {
    color: "#000"
  },

  cont: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: -5,
    borderWidth: 1.4,
    borderColor: '#0085FF',
    backgroundColor:'#e3f5fc',
    marginVertical: 10,
    borderRadius: 12,
  },
  cont2: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: -5,
    marginVertical: 10,
  },
  box: {
    height: 22,
    width: 22,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    marginVertical: 10
  },
  contPart: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingVertical: 10
  },
  textAdd: {
    fontSize: 11,
    color: '#000'
  },
  inputCont: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 100,
    borderColor: "#A3A1A1",
    paddingHorizontal: 10
  }

})