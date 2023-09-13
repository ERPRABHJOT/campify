import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native"

const CoGroups = ({ values, onChange }) => {
    const [groupApiData, setGroupApiData] = useState([])  //for storing the data from api to state

  // get the data from api end_point
    useEffect(() => {
        let response = fetch('https://mobile-api-dev.campify.io/schedules/groups', {
            method: 'GET',
        }).then((result) => {
            result.json().then((response) => {
                setGroupApiData(response.groups)
            })
        }).catch((err) => {
        })
    }, [])
  //onpress handling group name 
    const handleChange = (val) => {
        let vals = [...values]
        let index = vals?.findIndex((x) => x === val)
        if (index > -1) {
            vals.splice(index, 1)
        } else {
            vals.push(val)
        }
        onChange(vals)

    }
    return (
        <>
            {
                groupApiData.length > 1 ?
                    <View style={styles.tags}>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000', marginTop: 3, marginHorizontal: 8 }}>Showing</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                groupApiData?.map((value, v) =>
                                    <TouchableOpacity onPress={() => handleChange(value.group_name)} style={{ ...styles.label, ...(values?.includes(value.group_name) && styles.selected) }} key={v}>
                                        <Text style={{ ...styles.labelText, ...(values?.includes(value.group_name) && styles.labelText3) }}>{value.group_name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
                    :
                    <View style={styles.tags2}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                groupApiData?.map((value, v) =>
                                    <TouchableOpacity key={v} >
                                        <Text style={styles.labelText2}>{value.group_name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
            }


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
    dropdown: {
        width: "100%",
        maxHeight: 250,
        position: "absolute",
        left: 0,
        top: "100%",
        backgroundColor: "white",
        display: "none",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    item: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderColor: "#ddd"
    },

    flex: {
        flex: 1
    },
    overlay: {
        zIndex: 1,
        elevation: 1,
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent"
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: "contain"
    },
    tags: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: 'rgba(47, 186, 243, 0.04)',
    },
    tags2: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: 'rgba(47, 186, 243, 0.04)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        borderWidth: 1,
        marginHorizontal: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    selected: {
        backgroundColor: "#4090E5",
        marginHorizontal: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "#fff",
    },
    labelText: {
        fontSize: 12,
        color: '#000'
    },
    labelText3: {
        fontSize: 12,
        color: '#fff'
    },
    label2: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelText2: {
        fontSize: 16,
        color: '#1A324A',
        fontWeight: '600',
    }
})

export default CoGroups;