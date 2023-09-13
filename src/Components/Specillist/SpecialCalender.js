import React, { useState,useEffect } from "react"
import { StatusBar, SafeAreaView, View, StyleSheet,Image,Text } from "react-native"
import CalendarStrip from "./Components/CalendarStripe"
import EventsCalendar from "./Components/EventsCalendar"
import SpGroups from "./Components/SpGroups"
import moment from "moment"

export default function SpecialCalender(){

    const [ currentDate, setCurrentDate ] = useState(moment("2022-11-07", "YYYY-MM-DD"))  // set current date in calender 
    const [ groups, setGroups ] = useState([]) // group name pass to group component
    const [groupApiData, setGroupApiData] = useState([]) //group adata get from api end point

   //get the data from end point
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

   // api data add in on one array element
   let all_group = [];
   groupApiData.map((group) => {
       group.activities?.map((activity) => {
        all_group.push({...activity, group: group.group_name, location: 'GET Location', enrollments: 15})
       })
   })
   // check the selected date match with event data getfrom api
    let filtered = all_group;
    if(currentDate){
        let selected = moment(currentDate).format('YYYY-MM-DD');        
        filtered = all_group.filter((x) =>  {            
            if(groups?.length === 0){
                return moment(x?.date, "YYYY-MM-DD").format('YYYY-MM-DD') === selected
            }else{
                return (moment(x?.date, "YYYY-MM-DD").format('YYYY-MM-DD') === selected && groups.includes(x?.group) )
            }
        })
    }
   return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <CalendarStrip value={currentDate} onChange={(val) => setCurrentDate(val)} />
                <SpGroups  values={groups} onChange={(values) => setGroups(values)}  />  

                {all_group.length>0  ?            
                <EventsCalendar                        
                    events={filtered} 
                    groups={groups}              
                />
                :
                <View>
                    <View>
                        <Image source={require('../Specillist/assets/nopublish.png')} style={styles.pbimg} />
                    </View>

                    <Text style={styles.txt1}>Oppps! {'\n'} The calendar has not yet been {'\n'} published.</Text>
                    <Text style={styles.txt2}>If you think this is a problem, please contact your administrator.</Text>
                </View>
               }
            </View>
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    pbimg: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    },
    txt1: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#1A324A',
        marginTop: 30

    },
    txt2: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
        marginTop: 8

    }
})