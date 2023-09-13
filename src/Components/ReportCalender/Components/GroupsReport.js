import React, { useState } from "react"
import { View, Text,StyleSheet,} from "react-native"
import ToggleSwitch from 'toggle-switch-react-native'
import { Dropdown } from 'react-native-element-dropdown';


const GroupsReport = () => {

    const [open, setOpen] = useState(true) // activity data show and hide
    const [toggle, setToggle] = useState(false)   //activity toggle
    const [toggle2, setToggle2] = useState(false)  //activity toggle
    const [value, setValue] = useState(null);  //version select value in dropdown
    const [isFocus, setIsFocus] = useState(false);  //version focus in dropdown

    //dropdown data
    const data = [
        { label: '01', value: 'Groups' },
        { label: '02', value: 'Activities' },
        { label: '03', value: 'Report' },
    ];
    return (
        <>
            <View style={styles.wrapper}>
                {
                    open && (<>
                        <Text style={styles.txttop}>Version</Text>
                        <View style={{ padding: 15, flexDirection: 'row', }}>
                            <View style={styles.palaceBorder}>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: '#969696' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    data={data}
                                    maxHeight={170}
                                    labelField="label"
                                    valueField="value"
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setValue(item.value);
                                        setIsFocus(false);
                                    }} />
                            </View>

                        </View>
                        <View style={styles.lineh} />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-around" }}>
                            <Text style={styles.tgle}> Show only fully Available activities</Text>
                            <ToggleSwitch
                                isOn={toggle}
                                onColor="#4090E5"
                                offColor="#B3B3B3"
                                labelStyle={{ color: "black", fontWeight: "900" }}
                                size="small"
                                onToggle={isOn => setToggle(isOn)}
                            />
                        </View>
                        <View style={styles.lineh2} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-around" }}>
                            <Text style={styles.tgle}> Show only indoor activities</Text>

                            <ToggleSwitch
                                isOn={toggle2}
                                onColor="#4090E5"
                                offColor="#B3B3B3"
                                labelStyle={{ color: "black", fontWeight: "900" }}
                                size="small"
                                onToggle={isOn => setToggle2(isOn)}
                            />
                        </View>

                    </>)}
            </View>
            <View  style={{marginBottom:50}}/>
        </>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        zIndex: 5,
        elevation: 3
    },
    container: {
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#ccc",
        position: "relative",
    },
    palaceBorder: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E1E1E1',
        padding: 10,
        marginLeft: 10,
        backgroundColor: '#fff'
    },
    dropdown: {
        height: 24,
        width: 315,
    },
    placeholderStyle: {
        fontSize: 14,
        marginLeft: 8,
    },
    selectedTextStyle: {
        fontSize: 14,
        marginLeft: 8,
    },
    lineh: {
        alignSelf: 'center',
        height: 0.3,
        width: '85%',
        marginTop: 5,
        marginBottom: 25,
        backgroundColor: '#B3B3B3',
    },
    lineh2: {
        alignSelf: 'center',
        height: 0.3,
        width: '85%',
        marginVertical: 30,
        backgroundColor: '#B3B3B3',
    },
    tgle: {
        fontSize: 15,
        color: '#000',
    },
    txttop:{
        fontSize:14,
        color:'#000',
        marginTop:15,
        marginHorizontal:28,
        marginBottom:-8

    },

})

export default GroupsReport;