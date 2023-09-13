import React, { useRef, useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { TextInput } from "react-native-gesture-handler";


  const GroupsActivity = ({ values, onChange }) => {

    const [open, setOpen] = useState(true) // activity data show and hide
    const [search, setSearch] = useState('')  // for search input
    const [deselectAll, setDeselect] = useState(false) // deselect  all activity data
    const [selectAll, setSelectAll] = useState(true)  //select all activity data
    const [data, setApi_Data] = useState([])  // get the data from api end point
    const [searchData, setSearchData] = useState([]) // get the data for search from api end point

        useEffect(() => {
           let response = fetch('https://mobile-api-dev.campify.io/schedules/groups', {
            method: 'GET',
         }).then((result) => {
            result.json().then((response) => {
            setApi_Data(response.groups.map((e) => e.activities))
            setSearchData(response.groups.map((e) => e.activities))
            })
        }).catch((err) => {
        })
        }, [])

    // for select or unselect activity
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
    // for all select
    const selectall = () => {
        let vals = []
        data.map((et) => {
            return et.map((ert) =>
                vals.push(ert.title)
            )
        })
        onChange(vals)

    }
    // for all deselect
    const deSelectall = () => {
        onChange([])

    }
    // all selected or all deslected state true or false  on handle change 
    useEffect(() => {
        if (values?.length == data.map((e) => e.map((et) => et.length))) {
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
    }, [values, data.map((e) => e.map((et) => et.length))])

    // for searching activity by name
    const searchRef = useRef();
    const Search = txt => {
        if (txt !== '') {
            let tempData = data.map((e) => e.filter(item => {
                return item.title.toLocaleLowerCase().indexOf(txt.toLocaleLowerCase()) > -1;
            }));
            setApi_Data(tempData);
        } else {
            setApi_Data(searchData)
        }
    }

    return (
        <>
            <View style={styles.wrapper}>

                {
                    open &&
                    <View style={{ ...styles.dropdown, ...(open && { display: "flex" }) }}>
                        <Text style={styles.toptext}>Select the activities you want to display</Text>
                        <View style={{ marginBottom: 8 }}>
                            <View style={styles.search}>
                                <TextInput
                                    ref={searchRef}
                                    onChangeText={txt => { Search(txt); }}
                                    style={styles.input}
                                    placeholder='Search for Activities'
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

                            {data.map((et) => {
                                return et.map((group, g) =>

                                    <TouchableOpacity onPress={() => { handleChange(group.title); searchRef.current.clear(); }} style={{ ...styles.item, ...(values?.includes(group.title) && styles.selected) }} key={g}>
                                        <Text style={styles.text2}>{group.title}</Text>
                                        <View>
                                            {{
                                                ...
                                                <View style={styles.sqre} />,
                                                ...(values?.includes(group.title) &&
                                                    <Image source={require('../assets/check.png')} style={{ ...styles.tickimage, ...(values?.includes(group.title) && styles.tickimage2) }} />

                                                )
                                            }}
                                        </View>
                                    </TouchableOpacity>

                                )
                            })}

                            <TouchableOpacity style={styles.aplybtn}>
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
        maxHeight: 550,
        position: "absolute",
        left: 0,
        top: "100%",
        backgroundColor: "white",
    },
    item: {

        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 4,
        width: '90%',
        height: 46,
        alignItems: 'center',
        marginLeft: 20
    },
    selected: {
        flexDirection: "row",
        justifyContent: 'space-between',
        borderWidth: 1.4,
        borderColor: '#0085FF',
        backgroundColor: 'rgba(0, 133, 255, 0.1)',
        marginVertical: 4,
        borderRadius: 12,
        height: 46,
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
        marginHorizontal: 2,
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

export default GroupsActivity;