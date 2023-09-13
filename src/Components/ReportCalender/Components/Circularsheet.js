import React, { useState } from "react"
import { View, Text,StyleSheet } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Circularsheet = ({values}) => {

    return (
        <> 
            <View style={styles.mainv}>
                <View style={styles.toptxt}>
                    <Text style={styles.actTxt}>{values?.title}</Text>
                    <Text style={styles.actTxt2}>Location</Text>
                    <Text style={styles.actTxt2}> Monday / {values?.start} - {values?.end} </Text>

                    <View style={{alignItems:'center',marginTop:15,justifyContent:'center'}}>
                            <AnimatedCircularProgress
                                size={170}
                                width={15}
                                fill={80}
                                rotation={220}
                                lineCap="round" 
                                arcSweepAngle={350-70}
                                duration={4000}
                                delay={800}
                                childrenContainerStyle={{borderRadius:20}}
                                tintColor="rgba(64, 144, 229, 1)"
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="rgba(244, 244, 244, 1)" >

                           {() => (
                            <View>
                                <View style={{flexDirection:"row"}}>
                                <Text textAlign="center" style={styles.usenum} fontWeight={900} fontSize={20}>80</Text>
                                <Text style={{marginTop:30}}>%</Text>
                                </View>
                               
                                <Text style={styles.usedtxt}>Used</Text>
                            </View>)
                        }

                    </AnimatedCircularProgress>
                    </View>     
                    <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:15, fontWeight:'500',color:'#7A7A7A',alignSelf:'center'}}>Max capacity: </Text>
                        <Text style={{fontSize:15, fontWeight:'500',color:'#000',alignSelf:'center'}}>15 campers</Text>
                    </View>
                    <View style={styles.lineh} />
                    <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-evenly'}}>
                    <View>
                        <Text style={{fontSize:15,color:'#000',fontWeight:'500'}}>Groups</Text>
                        <Text style={{fontSize:25,color:'#144F8E',fontWeight:'600', alignSelf:'center'}}>1</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:15,color:'#000',fontWeight:'500'}}>Campers</Text>
                        <Text style={{fontSize:25,color:'#144F8E',fontWeight:'600', alignSelf:'center'}}>15</Text>
                    </View>
                    </View>
                </View>
            </View>
            <View style={{ marginBottom: 60 }} />
        </>
    )
}

export default Circularsheet;

const styles = StyleSheet.create({
    toptxt: {
        alignSelf: 'center',
        marginTop: 10,

    },
    actTxt: {
        fontSize: 20,
        fontWeight: '700',
        color: 'rgba(20, 79, 142, 1)',
        textAlign: 'center',
    },
    actTxt2: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
        marginVertical: 5
    },
    lineh: {
        alignSelf: 'center',
        width: 350,
         marginVertical:15,
        borderWidth:1,
        borderColor:'background: rgba(236, 236, 236, 1)',
    },
    usenum:{
        fontSize:50,
        color:'#144F8E',
        fontWeight:'700',
        alignSelf:"center"
    },
    usedtxt:{
        fontSize:14,
        color:'background: rgba(26, 50, 74, 1)',
        fontWeight:'600',
        alignSelf:"center"
    },


})