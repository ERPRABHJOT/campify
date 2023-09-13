import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState} from 'react'
import { Dropdown } from 'react-native-element-dropdown';
const CustonDropdown = () => {

    const [value, setValue] = useState(null); // dropdown value set
    const [isFocus, setIsFocus] = useState(false);  //dropdown  value focus

    // dropdown  data
    const data = [
        { label: 'All groups', value: 'eat' },
        { label: 'Custom groups', value: 'booking' },
        { label: 'Category', value: 'pickup' },
    ];

  return (
    <SafeAreaView>
        <View>
        <View style={styles.palaceBorder}>
            <TouchableOpacity><Image source={require('../../assets/Play.png')} style={styles.icon} /></TouchableOpacity>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: '#0085FF' , backgroundColor:'#0085FF1A'}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={data}
                            maxHeight={170}
                            labelField="label"
                            valueField="value"
                            placeholder={'Category name (8)'}
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }} />
                    </View>
    </View>
    </SafeAreaView>
  ) 
}

export default CustonDropdown

const styles = StyleSheet.create({
    palaceBorder:{
        padding:10,
    },

})