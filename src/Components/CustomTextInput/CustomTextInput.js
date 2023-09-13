import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default CustomTextInput = ({ value, setValue, placeholder, secureTextEntry, keyboardType}) => {
    
  return (
    <View style={styles.container} >
      <TextInput 
        value={value}
        onChangeText={setValue}
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={'#000'}  
        autoCapitalize='none' 
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#E1E1E1',
        paddingHorizontal: 10,
       marginVertical:5,
        elevation:5,
        height:50,
        justifyContent:'center'
    },
    input:{}
})
