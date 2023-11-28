import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useStore } from '../utils/state';
import { currentYear } from '../services/dateServices';
import { enableReminders } from '../components/notification';
import createNotificationObjects from '../components/notificationObjects';
function HomeScreen() {
    const data = useStore(state => state.prayerTimes);
    const loading = useStore(state => state.loading);
    const hijriDate = useStore(state => state.hijriDate);
    const [test, setTest] = useState(false);

    useEffect(() => {
        //turnONAlarm();
        setupNofifications();
    }, [test])
    //TESTING Create one notif object
    function testCreateOneAlarm(prayerName) {
        if (data == 0) {
            console.log("Prayer time Data is empty");
        } else {
            const testDate = new Date(Date.now());
            testDate.setMinutes(testDate.getMinutes() + 1);
            testPrayerTime = testDate.getHours() + " : " + testDate.getMinutes();
            console.log(testPrayerTime);
            createNotificationObjects(prayerName, testPrayerTime);
        }
    }
    const testDate = new Date(Date.now());
    testDate.setMinutes(testDate.getMinutes() + 0);
    testPrayerTime = testDate.getHours() + " : " + testDate.getMinutes();
    const testPrayerList = {
        subuh: testDate.getHours() + ":" + (testDate.getMinutes() + 1),
        dzuhur: testDate.getHours() + ":" + (testDate.getMinutes() + 2),
    }
    //Iterate through keys and create object notification for each prayer time
    function setupNofifications() {
        if (data == 0) {
            console.log("Prayer time Data is empty");
            return 0
        } else {
            enableReminders(); //Checking for Optimization and Permissions
            //REPLACE testPrayerList with data from useStore
            const keys = Object.keys(testPrayerList);
            Object.keys(testPrayerList).forEach(key => {
                createNotificationObjects(key, testPrayerList[key]);
            });
        }
    }
    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <View>                    
                    <Button title="TEST TIMER" onPress={() => setTest(!test)}></Button>
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