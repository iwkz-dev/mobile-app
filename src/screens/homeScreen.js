import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';
import { useStore } from '../utils/state';
import { currentYear } from '../services/dateServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundEnabled } from '../utils/storage';
import { disableAllNotifications } from '../components/notificationObjects';
import { enableNotificationPermission } from '../components/notificationPermission';
function HomeScreen() {
    const data = useStore(state => state.prayerTimes);
    const loading = useStore(state => state.loading);
    const hijriDate = useStore(state => state.hijriDate);
    const notificationActive = useStore(state => state.notificationActive);
    const setNotificationActive = useStore(state => state.setNotificationActive);
    const [currentSecond, setCurrentSecond] = useState("0000");
    const [count, setCount] = useState(0);
    //TODO DELETE BELOW, this only for test by skipping data from API by creating custom prayer times
    let testData={"date":"10.01","subuh":"6:09","terbit":"8:07","dzuhur":"12:19","ashr":"14:00","maghrib":"21:08","isya":"22:06"}
    
    //After this Componenmount, it start by 
    useEffect(() => {
        retrieveData();
        const startTime = () => {
            //Create new data every second
            const dateNow = new Date();
            setCurrentSecond(dateNow.getSeconds());
        };

        let interval = setInterval(() => startTime(), 1000);
        return () => {
            clearInterval(interval);
        };

    }, [])

    //Check from storage if Backgroundfetch is enabled or not 
    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('backgroundEnabled');
            const currentValue = JSON.parse(value); //Convert String to Boolean
            //console.log("Retrieving from storage: " + value);
            if (currentValue !== null) {
                setNotificationActive(currentValue);
            } else {
                //console.log(typeof(Boolean(value)));
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    //ON-OFF Switch for Alarms
    const toggled = async (value) => {
        //Enabling Background Fetch
        backgroundEnabled(value)
        //Asking for extra permission so app won't be killed
        enableNotificationPermission()
        //Enabling Alarm Notifications
        setNotificationActive(value)
        if (value == false) {
            disableAllNotifications();//Disabled all active Alarm
        }
    }
    const renderPrayerTimeItem = ({ item }) => (
        <>{item}</>
    );
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        const testResult = hours + "h " + minutes + "m " + remainingSeconds + "s";
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    function calculateRemainingSeconds(data, item) {
        const dateNow = new Date();
        const dateTarget = new Date();
        dateTarget.setHours(data[item].split(":")[0])
        dateTarget.setMinutes(data[item].split(":")[1])
        const targetHour = dateTarget.getHours(); // Set your target hour here (24-hour format)
        const targetMinute = dateTarget.getMinutes(); // Set your target minute here

        const currentHour = dateNow.getHours();
        const currentMinute = dateNow.getMinutes();
        const currentS = currentSecond % 60;
        let testResult = (
            (targetHour - currentHour) * 3600 +
            (targetMinute - currentMinute) * 60 -
            currentS
        );
        return formatTime(testResult);
    }
    const getCurrentNextPrayer = data => {
        let currentPrayer = "";
        let nextPrayer = "";
        const dateNow = new Date();
        const dateTarget = new Date();
        for (let item in data) {
            if (item !== "date") {
                dateTarget.setHours(data[item].split(":")[0])
                dateTarget.setMinutes(data[item].split(":")[1])
                if (dateNow.getTime() < dateTarget.getTime()) {
                    //Next Prayer found, and loop break
                    nextPrayer = item;
                    break;
                }
                //Previous Prayer found
                currentPrayer = item;
            }
        }
        return [currentPrayer, nextPrayer];
    }
    function createPrayerList(data) {
        let prayerList = [];
        let currentAndNextPrayer = getCurrentNextPrayer(data);
        let currentPrayer = currentAndNextPrayer[0];
        let nextPrayer = currentAndNextPrayer[1];
        for (let item in data) {
            if (item !== "date") {
                if (item == currentPrayer && item !== "terbit") {
                    //<Text>{calculateRemainingSeconds(data, item)}</Text>
                    prayerList.push(
                        <View style={styles.itemCurrent}>
                            <Text>{item} {data[item]}</Text>
                        </View>
                    )
                } else if (item == nextPrayer && item !== "terbit") {
                    prayerList.push(
                        <View style={styles.itemNext}>
                            <Text>{calculateRemainingSeconds(data, item)}</Text>
                            <Text>{item} {data[item]}</Text>
                        </View>
                    )
                } else {
                    prayerList.push(
                        <View style={styles.item}>
                            <Text>{item} {data[item]}</Text>
                        </View>
                    )
                }
            }
        }
        //console.log("currentPray: " + currentPrayer + " Next Pray: " + nextPrayer+" Current Second: "+currentSecond)
        return prayerList;
    }
    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    {notificationActive ? (
                        <Text>Prayer Alarms is On</Text>
                    ) : (
                        <Text>Prayer Alarms is Off</Text>
                    )}

                    <Button title="Prayer Time Alarm" onPress={() => toggled(!notificationActive)}></Button>
                    <Text style={styles.title}>{data.date}.{currentYear}</Text>
                    <Text style={styles.title}>{hijriDate}</Text>
                    <View style={styles.boxList}>
                        <FlatList
                            data={createPrayerList(data)}
                            renderItem={renderPrayerTimeItem}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={data}
                        />
                    </View>
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
        padding: 10,
    },
    boxList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    itemCurrent: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    itemNext: {
        backgroundColor: 'blue',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: 'darkgrey',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default HomeScreen;