import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native"
import moment from "moment"
import { assets } from "../assets";
import { getdDaysInMonth } from "../utils";


const CoCalendarStrip = ({ value, onChange }) => {

    let val = value || moment() //get the data from previous componenet
    const [selected, setSelected] = useState(val) // the previous data in state
    const [currentDay, setCurrentDay] = useState({ day: val?.format('dd'), date: val?.format('DD') })  // get current date

    const flRef = React.useRef()  //manuplate date
    // checking the data if not null
    useEffect(() => {
        if (value === null) {
            onChange(moment())
        }
    }, [value, onChange])
    // set previous month
    const prevMonth = () => {
        let new_month = moment(selected).subtract(1, 'months').endOf('month');

        let month = new_month.format('MM')
        let year = new_month.format('YYYY')
        let new_day = year + "-" + month + "-" + currentDay.date
        setSelected(moment(new_day))
        setCurrentDay({ day: moment(new_day).format('dd'), date: moment(new_day).format('DD') })
        onChange(moment(new_day))
    }
    //set next month
    const nextMonth = () => {
        let new_month = moment(selected).add(1, 'months').endOf('month');
        let month = new_month.format('MM')
        let year = new_month.format('YYYY')
        let new_day = year + "-" + month + "-" + currentDay.date
        setSelected(moment(new_day))
        setCurrentDay({ day: moment(new_day).format('dd'), date: moment(new_day).format('DD') })
        onChange(moment(new_day))
    }
    // active date
    const isActive = (item) => {
        return currentDay.date === item.date
    }
    // handle selected date with event
    const handleSelectDate = (item) => {
        if (item) {
            let month = selected.format('MM')
            let year = selected.format('YYYY')
            let new_day = year + "-" + month + "-" + item.date
            setCurrentDay({ day: moment(new_day).format('dd'), date: moment(new_day).format('DD') })
            setSelected(moment(new_day))
            onChange(moment(new_day))
        }
    }
    var all_days = getdDaysInMonth(selected)//get days in selected month
    // set position according to condition
    useEffect(() => {
        if (currentDay && all_days?.length > 0 && flRef?.current) {
            let index = all_days.findIndex(x => (x?.day === currentDay.day && x?.date === currentDay.date))
            if (index > -1) {
                flRef?.current?.scrollToIndex({ animated: true, index: index, viewPosition: 0.5 });
            }
        }
    }, [currentDay, all_days])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={prevMonth}>
                    <Image source={assets.leftIcon} style={styles.icon} alt="Left" />
                </TouchableOpacity>
                <View style={styles.flex}>
                    <Text style={styles.monthTitle}>{moment(selected).format('MMMM YYYY')}</Text>
                </View>
                <TouchableOpacity onPress={nextMonth}>
                    <Image source={assets.rightIcon} style={styles.icon} alt="Left" />
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    ref={flRef}
                    data={all_days}
                    horizontal
                    initialScrollIndex={0}
                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            flRef.current?.scrollToIndex({ index: info.index, animated: true, viewPosition: 0.5 });
                        });
                    }}
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelectDate(item)}>
                            <View style={styles.dayTitle}>
                                <Text style={styles.dayLabel}>{item?.day[0]}</Text>
                                <Text style={isActive(item) ? styles.dateLabelActive : styles.dateLabel}>{item.date}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    flex: {
        flex: 1
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
    monthTitle: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold"
    },
    header: {
        marginBottom: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    dayTitle: {
        backgroundColor: "transparent",
        paddingHorizontal: 7,
        paddingVertical: 10,
        marginHorizontal: 10,
        alignItems: "center",
        borderRadius: 20
    },
    dayTitleActive: {
        backgroundColor: "#cccccc",
        paddingHorizontal: 7,
        paddingVertical: 10,
        marginHorizontal: 10,
        alignItems: "center",
        borderRadius: 20
    },
    dayLabel: {
        fontSize: 12,
    },
    dateLabel: {
        fontSize: 14
    },
    dateLabelActive: {
        fontSize: 15,
        color: 'blue'
    }
})

export default CoCalendarStrip