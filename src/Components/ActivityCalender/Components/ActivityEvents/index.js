import React, { useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import { getTimes, groupEvents } from "../../utils"
import moment from "moment"

export default function ActivityEvents({ events, ...rest }) {

    const [items, setItems] = useState([])  // store data in item from main calender.js
    const [childHeight, setChildHeight] = useState(900) //event height set
    var colors = ["rgba(64, 144, 229, 0.1)", "rgba(243, 236, 252, 1)", "rgba(137, 229, 64, 0.1)", "rgba(64, 144, 229, 0.1)"];  //change the event color

    useEffect(() => {
        setItems(groupEvents(events))
    }, [events])

    // for calculate position of events
    const calculatePosition = (g, e = null) => {
        if (!e) {
            let start = moment(g.start, 'hh:mm a')
            let first = !e ? moment("12:00 AM", 'hh:mm a') : moment(g.start, 'hh:mm a')
            let duration2 = moment.duration(start.diff(first));
            duration2 = duration2.asMinutes()
            return { left: duration2 * 3, top: 0, position: "absolute" };
        } else {
            let start = moment(e.start, 'hh:mm a')
            let end = moment(e.end, 'hh:mm a')
            let first = !e ? moment("12:00 AM", 'hh:mm a') : moment(g.start, 'hh:mm a')
            let duration = moment.duration(end.diff(start));
            duration = duration.asMinutes()
            let duration2 = moment.duration(start.diff(first));
            duration2 = duration2.asMinutes()

            var random = colors[Math.floor(Math.random() * colors.length)]
            return { width: (duration) * 3, marginLeft: duration2 * 3, backgroundColor: random }
        }
    }
  //handle child layout heights of events
    const handleLayout = (e) => {
        var { height } = e.nativeEvent.layout;
        if (height > childHeight) {
            setChildHeight(height)
        }
    }
    // date format 12 hours
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
                contentContainerStyle={{ height: childHeight }}
                nestedScrollEnabled={true}
                scrollEventThrottle={16}
            >
                {items?.map((item, k) =>
                    <View key={k} onLayout={handleLayout} style={{ ...calculatePosition(item) }}>
                        {item?.events?.map((event, e) =>
                            <View key={e} style={{ ...styles.event, backgroundColor: event?.color, ...calculatePosition(item, event) }}>
                                <Text style={styles.txtact}>{event?.group}</Text>
                                <Text style={{ marginBottom: 50 }}> 15 Enrollements</Text>
                                <Text>{`${formatTime(event?.start) + " - " + formatTime(event?.end)}`}</Text>

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
        borderRadius: 5,

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