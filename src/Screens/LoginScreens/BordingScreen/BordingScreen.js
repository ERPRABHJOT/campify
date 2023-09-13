import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const BordingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.row}>
                        <Image source={require('../../../assets/Vector.png')} />
                        <Text style={styles.texthead}>Go back</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 50 }}>
                <Image style={styles.image} source={require('../../../assets/Board.png')} />
                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.text}>This camp is not available</Text>
                    <Text style={styles.text1}>Please contact your camp director</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BordingScreen

const styles = StyleSheet.create({
    image: {
        height: 310,
        width: 400,
    },
    text: {
        fontWeight: '500',
        fontSize: 25,
        color: '#000',
        textAlign: 'center'
    },
    text1: {
        fontWeight: '500',
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
        marginVertical: 5
    },
    row: {
        flexDirection: 'row',
    },
    texthead: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        marginHorizontal: 10
    },
})