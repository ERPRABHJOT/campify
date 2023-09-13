import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native"

const SpGroups = () => {
    const [groupApiData, setGroupApiData] = useState([]) //get the api data in state
    let api_data = groupApiData.map((e) => { return e.activities.map((et) => { return et }) }) // maping to extract
    //for flatten the array data
    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
    }

    let all_flattenData = flatten(api_data) //flatten data

    //get the data from api end point
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

    return (
        <>
            {
                groupApiData.length > 1 ?

                    <View style={styles.tags}>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000', marginTop: 3, marginHorizontal: 8 }}>Showing</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                all_flattenData?.map((value, v) =>
                                    <TouchableOpacity key={v} style={styles.label}>
                                        <Text style={styles.labelText}>{value.title}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
                    :
                    <View style={styles.tags2}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                all_flattenData?.map((value, v) =>
                                    <TouchableOpacity key={v} >
                                        <Text style={styles.labelText2}>{value.title}</Text>
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
    selected: {
        backgroundColor: "#E2F3FF"
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
        backgroundColor: "#4090E5",
        marginHorizontal: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    labelText: {
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

export default SpGroups;