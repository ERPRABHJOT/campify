
import React, { useState, createRef, useContext, useEffect } from "react"
import { StatusBar, SafeAreaView, View, Image, ScrollView, StyleSheet, Text } from "react-native"
import CalendarStrip from "./Components/CalendarStripe"
import EventsCalendar from "./Components/EventsCalendar"
import Groups from "./Components/Groups"
import moment from "moment";
import { AuthContext } from '../../../context/AuthContext';

import CustomActionSheet from "../../Components/CustomActionSheet/CustomActionSheet";
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from "react-native-gesture-handler";

import ActivityEvents from "../../Components/ActivityCalender/Components/ActivityEvents"
import GroupsActivity from "../../Components/ActivityCalender/Components/GroupsActivity"
import ActivityCalendarStrip from "../../Components/ActivityCalender/Components/ActivityCalendarStrip"

import EventsCalendarReport from "../../Components/ReportCalender/Components/EventsCalendarReport"
import ReportCalendarStrip from "../../Components/ReportCalender/Components/ReportCalendarStrip"
import GroupsReport from "../../Components/ReportCalender/Components/GroupsReport"
import Circularsheet from "../../Components/ReportCalender/Components/Circularsheet"

import SpecialCalender from "../../Components/Specillist/SpecialCalender"
import Counsellor from '../../Components/Counsellor/CounsellorCalender'

const actionSheetRef = createRef()  //for bootom actionsheet
const actionSheetReport = createRef()  //for bootom actionsheet
const actionSheetProgress = createRef()  //for bootom actionsheet


export default function Calender() {

    const [currentDate, setCurrentDate] = useState(moment("2022-11-07", "YYYY-MM-DD"))  //start date for group
    const [groups, setGroups] = useState([])  //onclick group value set
    const [currentDate2, setCurrentDate2] = useState(moment("2022-11-07", "YYYY-MM-DD"))  //start date and time for activities
    const [groupsAct, setGroupsAct] = useState([])  //onclick activities value set
    const [currentDate3, setCurrentDate3] = useState(moment("2022-11-07", "YYYY-MM-DD"))  //start date and time for open capacity report
    const [groupsRept, setGroupsRept] = useState([])  //onclick  open capacity report value set
    const [groupsReportdata, setGroupsReportdata] = useState([])  //for bottom sheet data
    const { role } = useContext(AuthContext); // get the login user detail either admin,specialist or counsellor
    const [groupApiData, setGroupApiData] = useState([])  // Main data store in state

    // flatten data for events
    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
    }

    //for open capacity reportmapping the data
    let api_data = groupApiData.map((e) => { return e.activities })

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

    // add group name and other data to activity array
    let all_activities = [];
    groupApiData.map((group) => {
        group.activities?.map((activity) => {
            all_activities.push({ ...activity, group: group.group_name, location: 'GET Location', enrollments: 15 })
        })
    })

    // group data pass to events using date format
    let filtered = all_activities;
    if (currentDate) {
        let selected = moment(currentDate).format('YYYY-MM-DD');
        filtered = all_activities.filter((x) => {
            if (groups?.length === 0) {
                return moment(x?.date, "YYYY-MM-DD").format('YYYY-MM-DD') === selected
            } else {
                return (moment(x?.date, "YYYY-MM-DD").format('YYYY-MM-DD') === selected && groups.includes(x?.group))
            }
        })
    }
    //end group 

    // activites data pass to events using date format
    let filteredAct = all_activities;
    if (currentDate2) {
        let selected = moment(currentDate2).format('YYYY-MM-DD');
        filteredAct = all_activities.filter((x) => {
            if (groupsAct?.length === 0) {
                return moment(x?.date, "YYYY-MM-DD").format('YYYY-MM-DD') === selected
            } else {
                return (moment(x?.date, "YYYY-MM-DD").format('YYYY-MM-DD') === selected && groupsAct.includes(x?.title))
            }
        })
    }
    //end activity 

    //open capacitor report data pass to events using date format
    let flatten_data = flatten(api_data)
    let filteredRept = flatten_data; //pass the data to open capacitor report events
    if (currentDate3) {
        let selected = moment(currentDate3).format('YYYY-MM-DD');
        filteredRept = flatten_data.filter((x) => {
            if (groupsRept?.length === 0) {
                return moment(x?.date, "YYYY-MM-DD").format('YYYY-MM-DD') === selected
            } else {
                return (moment(x?.date, "YYYY-MM-DD").format('YYYY-MM-DD') === selected && groupsRept.includes(x?.group))
            }
        })
    }

    const [value, setValue] = useState(null); // dropdown value 
    const [isFocus, setIsFocus] = useState(false); // dropdown focus value

    // dropdown values and label show
    const data = [
        { label: 'Groups', value: 'Groups' },
        { label: 'Activities', value: 'Activities' },
        { label: 'Open Capacity Report', value: 'Report' },
    ];

    // for group filter data handle
    const handleGroup = (val) => {
        let vals = [...groups]
        let index = vals?.findIndex((x) => x === val)
        if (index > -1) {
            vals.splice(index, 1)
        } else {
            vals.push(val)
        }
        setGroups(vals)
    }

    // for activity filter data handle
    const handleActivity = (val) => {
        let vals = [...groupsAct]
        let index = vals?.findIndex((x) => x === val)
        if (index > -1) {
            vals.splice(index, 1)
        } else {
            vals.push(val)
        }
        setGroupsAct(vals)
    }

    // set random color for group and activity text
    const getRandomColor = () => {
        var colors = ["#4090E5", "#B698DD", "#8ABD63", "#E54040",];
        var random = colors[Math.floor(Math.random() * colors.length)]
        return random
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {role === 'ADMIN' ?

                <View style={styles.container}>
                    {value === 'Groups' ? <CalendarStrip value={currentDate} onChange={(val) => setCurrentDate(val)} /> : null}
                    {value === 'Activities' ? <ActivityCalendarStrip value={currentDate2} onChange={(val) => setCurrentDate2(val)} /> : null}
                    {value === 'Report' ? <ReportCalendarStrip value={currentDate3} onChange={(val) => setCurrentDate3(val)} /> : null}

                    <View style={{ backgroundColor: 'rgba(47, 186, 243, 0.04)' }}>
                        <View style={{ padding: 15, flexDirection: 'row' }}>
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
                            <TouchableOpacity onPress={() => { value === 'Report' ? actionSheetReport.current?.show() : actionSheetRef.current?.show() }}>
                                <View style={styles.filt}>
                                    <Image source={require('../DrawerNavigation/assets/filter.png')} style={styles.filtimg} />
                                    <Text style={styles.textfilt}>Filter</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {value === 'Groups' ?
                            (groups?.length > 0) &&
                            <View style={styles.tags}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {
                                        groups?.map((value, v) =>
                                            <TouchableOpacity key={v} onPress={() => handleGroup(value)} style={{ ...styles.label, backgroundColor: getRandomColor() }}>
                                                <Text style={{ ...styles.labelText }}>{value}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </ScrollView>
                            </View>
                            :
                            null
                        }

                        {value === 'Activities' ?
                            (groupsAct?.length > 0) &&
                            <View style={styles.tags}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {
                                        groupsAct?.map((value, v) =>
                                            <TouchableOpacity key={v} onPress={() => handleActivity(value)} style={{ ...styles.label, backgroundColor: getRandomColor() }}>
                                                <Text style={styles.labelText}>{value}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </ScrollView>
                            </View>
                            :
                            null
                        }
                    </View>

                    {value === 'Groups' ? <EventsCalendar events={filtered} /> : null}
                    {value === 'Activities' ? <ActivityEvents events={filteredAct} /> : null}
                    {value === 'Report' ? <EventsCalendarReport events={filteredRept} onPress={(event) => { setGroupsReportdata(event); actionSheetProgress.current?.show() }} /> : null}

                    <CustomActionSheet ref={actionSheetRef} title={'Title'}>
                        <View style={{ minHeight: 600 }}>
                            {value === 'Groups' ? <Groups values={groups} onChange={(values) => setGroups(values)} /> : null}
                            {value === 'Activities' ? <GroupsActivity values={groupsAct} onChange={(values) => setGroupsAct(values)} /> : null}
                        </View>
                    </CustomActionSheet>
                    <CustomActionSheet ref={actionSheetReport} title={'Title'}>
                        {value === 'Report' ? <GroupsReport values={groupsRept} onChange={(values) => setGroupsRept(values)} /> : null}
                    </CustomActionSheet>
                    <CustomActionSheet ref={actionSheetProgress} title={'Title'}>
                        {value === 'Report' ? <Circularsheet values={groupsReportdata} onChange={(values) => setGroupsReportdata(values)} /> : null}
                    </CustomActionSheet>
                </View>
                :
                role === 'COUNSELLOR' ? <Counsellor /> : <SpecialCalender />
            }

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    palaceBorder: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E1E1E1',
        padding: 10,
        backgroundColor: '#fff'
    },
    dropdown: {
        height: 20,
        width: 265,
    },
    placeholderStyle: {
        fontSize: 14,
        marginLeft: 8,
    },
    selectedTextStyle: {
        fontSize: 14,
        marginLeft: 8,
    },
    filt: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 8

    },
    filtimg: {
        height: 23,
        width: 23
    },
    textfilt: {
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 4
    },
    tags: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    label: {
        backgroundColor: "#B698DD",
        marginHorizontal: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    labelText: {
        fontSize: 12,
        color: '#fff'
    }
})
