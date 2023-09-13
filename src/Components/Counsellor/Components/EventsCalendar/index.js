import React, { useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import { getTimes, groupEvents, getHSLColor } from "../../utils"
import moment from "moment"

export default function EventsCalendar({ events, groups, ...rest }) {

    const [items, setItems] = useState([])   // store data in state
    const [childHeight, setChildHeight] = useState(0) //event height set 
    const [scrollHeight, setScrollHeight] = useState(200)  // events view height

    // set the events data in items state
    useEffect(() => {
        setItems(groupEvents(events))
    }, [events])

    //calculate position of events
    const calculatePosition = (g, e = null) => {
        if (!e) {
            let start = moment(g.start, 'hh:mm a')
            let first = !e ? moment("12:00 AM", 'hh:mm a') : moment(g.start, 'hh:mm a')
            let duration2 = moment.duration(start.diff(first));
            duration2 = duration2.asMinutes()
            let group_style = null
            if (groups?.length === 1) {
                group_style = { height: scrollHeight }
            }
            return { left: duration2 * 3, top: 0, position: "absolute", ...group_style };
        } else {
            let start = moment(e.start, 'hh:mm a')
            let end = moment(e.end, 'hh:mm a')
            let first = !e ? moment("12:00 AM", 'hh:mm a') : moment(g.start, 'hh:mm a')
            let duration = moment.duration(end.diff(start));
            duration = duration.asMinutes()
            let duration2 = moment.duration(start.diff(first));
            duration2 = duration2.asMinutes()
            let item_style = null
            if (groups?.length === 1) {
                item_style = { flex: 1 }
            }
            return { width: (duration) * 3, marginLeft: duration2 * 3, ...item_style }
        }
    }
    // handle events height
    const handleLayout = (e) => {
        var { height } = e.nativeEvent.layout;
        if (height > childHeight) {
            setChildHeight(height)
        }
    }
    //scroll height handle
    const handleScrollHeight = (e) => {
        console.log("Height", e.nativeEvent.layout)
        let { height } = e.nativeEvent.layout
        setScrollHeight(height)
    }
    // set the time format according 12 hours
    function formatTime(timeString) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }
    return (
        <ScrollView contentContainerStyle={styles.container} scrollEventThrottle={16} directionalLockEnabled={true} flex={1} horizontal overScrollMode="never" bounces={false}>
            {
                getTimes().map((item, i) =>
                    <View key={i} style={styles.slot}>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                )
            }

            <ScrollView
                style={{ ...styles.calendar }}
                onLayout={handleScrollHeight}
                contentContainerStyle={{ height: childHeight }}
                nestedScrollEnabled={true}
                scrollEventThrottle={16}
            >
                {items?.map((item, k) =>
                    <View key={k} onLayout={handleLayout} style={{ ...calculatePosition(item) }}>
                        {item?.events?.map((event, e) =>
                            <View key={e} style={{ ...styles.event, backgroundColor: getHSLColor(event.start), ...calculatePosition(item, event) }}>
                                <Text style={styles.txtact}> Activity
                                </Text>
                                <Text style={{ marginTop: 100, color: '#000', fontSize: 12 }}>{`${formatTime(event?.start) + " - " + formatTime(event?.end)}`}</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        position: "relative"
    },
    slot: {
        width: 90,
        paddingVertical: 15,
        borderRightWidth: 1,
        borderColor: "#eee",
        zIndex: 1,
    },
    text: {
        textAlign: 'center'
    },
    event: {
        marginVertical: 5,
        padding: 15,
        marginHorizontal: 1,
        borderRadius: 12,

    },
    calendar: {
        flexGrow: 1,
        marginTop: 40,
        zIndex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },
    txtact: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2
    },
})