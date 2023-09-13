import React, { useState, useRef, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, } from "react-native"
import { TextInput } from "react-native-gesture-handler";

const Groups = ({ values, onChange }) => {

    const [open, setOpen] = useState(true)  //for open and hide group selected 
    const [search, setSearch] = useState('') // for search value
    const [deselectAll, setDeselect] = useState(false) // deselect all group set state
    const [selectAll, setSelectAll] = useState(true) // select all group set state
    const [data, setData] = useState([])   //get the data from api_end point
    const [oldData, setOldData] = useState([]) //to hold the old state data for search only

    useEffect(() => {
        let response = fetch('https://mobile-api-dev.campify.io/schedules/groups', {
            method: 'GET',
        }).then((result) => {
            result.json().then((response) => {
                setData(response.groups)
                setOldData(response.groups)
            })
        }).catch((err) => {
        })
    }, [])

    // handle selected group
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
    // select all group
    const selectall = () => {
        let vals = []
        data.map((group) => {
            vals.push(group.group_name)
        })
        onChange(vals)
    }
    // deselect all group
    const deSelectall = () => {
        onChange([])

    }
    //  get the selected or deslected state
    useEffect(() => {
        if (values?.length == data.length) {
            setSelectAll(false)
        }
        else {
            setSelectAll(true)
        }
        if (values?.length > 0) {
            setDeselect(true)
        } else {
            setDeselect(false)
        }
    }, [values, data])



    const searchRef = useRef(); //search data manuplate
    // search group name from api data
    const Search = txt => {
        if (txt !== '') {
            let tempData = data.filter(item => {
                return item.group_name.toLocaleLowerCase().indexOf(txt.toLocaleLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(oldData)
        }
    }
    return (
        <>
            <View style={styles.wrapper}>
                {
                    open &&
                    <View style={{ ...styles.dropdown, ...(open && { display: "flex" }) }}>
                        <Text style={styles.toptext}>Select the groups you want to display</Text>
                        <View style={{ marginBottom: 8 }}>
                            <View style={styles.search}>
                                <TextInput
                                    ref={searchRef}
                                    onChangeText={txt => { Search(txt); }}
                                    style={styles.input}
                                    placeholder='Search for Groups'
                                    placeholderTextColor={'#000'}
                                />
                                <TouchableOpacity>
                                    <Image source={require('../assets/Vector.png')} style={{ height: 16, width: 13, marginTop: 15 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.sline} />
                        <ScrollView style={styles.flex} bounces={false} >
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    (selectAll) &&
                                    <TouchableOpacity style={styles.alls} onPress={() => selectall()}>
                                        <Text style={styles.allstext}>Select all</Text>
                                    </TouchableOpacity>
                                }
                                {
                                    deselectAll &&
                                    <TouchableOpacity style={styles.alld} onPress={() => deSelectall()}>
                                        <Text style={styles.allstext}>Deselect all</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                            {
                                data?.map((group, g) =>
                                    <TouchableOpacity onPress={() => { handleChange(group.group_name); searchRef.current.clear() }} style={{ ...styles.item, ...(values?.includes(group.group_name) && styles.selected) }} key={g}>
                                        <Text style={styles.text2}>{group.group_name}</Text>
                                        <View>
                                            {{
                                                ...
                                                <View style={styles.sqre} />,
                                                ...(values?.includes(group.group_name) &&
                                                    <Image source={require('../assets/check.png')} style={{ ...styles.tickimage, ...(values?.includes(group.group_name) && styles.tickimage2) }} />
                                                )
                                            }}
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            <TouchableOpacity>
                                <Text style={styles.aplytext}>
                                    Apply
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                }
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        zIndex: 5,
        elevation: 3
    },
    container: {
        backgroundColor: '#F9F9F9',
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
        maxHeight: 550,
        position: "absolute",
        left: 0,
        top: "100%",
        backgroundColor: "white",
    },
    item: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 5,
        width: '90%',
        height: 45,
        alignItems: 'center',
        marginLeft: 20
    },
    selected: {
        flexDirection: "row",
        justifyContent: 'space-between',
        borderWidth: 1.4,
        borderColor: '#0085FF',
        backgroundColor: 'rgba(0, 133, 255, 0.1)',
        marginVertical: 5,
        borderRadius: 12,
        height: 45,
        width: '90%',
        alignItems: 'center',
        marginLeft: 20
    },
    text2: {
        padding: 8,
        color: '#000',
        fontSize: 15,
        fontWeight: '500',
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    label: {
        backgroundColor: "#ccc",
        marginHorizontal: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    labelText: {
        fontSize: 12
    },
    toptext: {
        color: '#000',
        fontSize: 15,
        marginVertical: 10,
        textAlign: 'center'
    },
    search: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E1E1E1',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        marginVertical: 5,
        width: '90%',
        elevation: 5,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sline: {
        height: 2,
        width: '90%',
        backgroundColor: 'rgba(236, 236, 236, 1)',
        marginHorizontal: 20
    },
    alls: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        height: 37,
        width: 80,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 133, 255, 0.1)',
    },
    alld: {
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 10,
        height: 37,
        width: 100,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 133, 255, 0.1)',
    },
    allstext: {
        color: 'rgba(0, 133, 255, 1)',
        fontSize: 13,
    },
    aplybtn: {
        height: 41,
        width: '88%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2FBAF3',
        marginHorizontal: 25,
        marginTop: 15,
    },
    aplytext: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '500'
    },
    tickimage: {
        height: 15,
        width: 15,
        borderWidth: 1,
        borderColor: '#A4A4A4',
        borderRadius: 3,
        marginRight: 8
    },
    tickimage2: {
        height: 15,
        width: 15,
        borderWidth: 1,
        borderRadius: 3,
        marginRight: 8
    },
    sqre: {
        height: 13,
        width: 13,
        borderRadius: 3,
        marginRight: 8,
        borderWidth: 0.9,
        borderColor: 'rgba(164, 164, 164, 1)'
    },
})
export default Groups;