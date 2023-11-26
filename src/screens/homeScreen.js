import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useStore } from '../utils/state';
import { currentDate, currentMonth, currentMonthNumber, currentYear} from '../services/dateServices';
import { enableReminders } from '../components/notification';
import BackgroundTimer from 'react-native-background-timer';
function HomeScreen() {
    const data = useStore(state => state.prayerTimes);
    const loading = useStore(state => state.loading);
    const hijriDate = useStore(state => state.hijriDate);
    const [test,setTest] = useState(false);
    
    useEffect(()=>{
        //turnONAlarm();
        getPrayerHour("maghrib");
    },[test])
    function turnONAlarm(){
        if(test==true){
            BackgroundTimer.runBackgroundTimer(() => { 
                //code that will be called every 3 seconds 
                console.log("test")
                }, 
                3000);
        }else{
            BackgroundTimer.stopBackgroundTimer();
            console.log("test is: "+test)
        }
    }
    //ONLY FOR TESTING, TODO REMOVE
    function getPrayerHour(prayerName) {
        if(data==0){

        }else{
            const test = data[prayerName].split(":");
            // [0] for hour [1] for minutes
            console.log("maghrib "+data.maghrib);
            console.log("HERE: "+test[0]);

        }
    }
    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    <Button title= "Display Notif" onPress={() => enableReminders()}></Button>

                    <Button title= "TEST TIMER" onPress={() => setTest(!test)}></Button>
                    <Text style={styles.title}>{data.date}.{currentYear}</Text>
                    <Text style={styles.title}>{hijriDate}</Text>
                    <Text>Subuh</Text>
                    <Text>{data.subuh}</Text>
                    <Text>dzuhur</Text>
                    <Text>{data.dzuhur}</Text>
                    <Text>ashr</Text>
                    <Text>{data.ashr}</Text>
                    <Text>maghrib</Text>
                    <Text>{data.ashr}</Text>
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        padding: 8,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
});

export default HomeScreen;