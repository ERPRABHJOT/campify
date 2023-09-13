import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import DropDownItem from 'react-native-drop-down-item';

const CustomDropDown = () => {


  state = {
    contents: [
      {
        title: 'Category name (8)',
        body: 'Group 01',

      },
      {
        title: 'Category name (8)',
        body: 'Group 01',
      },
      {
        title: 'Category name (8)',
        body: 'Group 01',
      },
      

    ],
  };


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          {
            this.state.contents
              ? this.state.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    header={
                      <View style={{  borderColor:'#BBDCFF',borderBottomWidth:1, width:350, marginVertical:5}}>
                        <Text style={styles.title}>{param.title}</Text>
                      </View>
                    }  
                  >
                    <Text style={styles.body}>{param.body}</Text>
                    <Text style={styles.body}>{param.body}</Text>
                    <Text style={styles.body}>{param.body}</Text>
                  </DropDownItem>
                );
              })
              : null
          }
          <View style={{ height: 96 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CustomDropDown

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  body: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  }

})