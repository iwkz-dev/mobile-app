import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import { useStore } from '../utils/state';
import { currentYear } from '../services/dateServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundEnabled } from '../utils/storage';
import { disableAllNotifications } from '../components/notificationObjects';
import { enableReminders } from '../components/notification';
import createNotificationObjects from '../components/notificationObjects';
function HomeScreen() {
    const data = useStore(state => state.prayerTimes);
    const loading = useStore(state => state.loading);
    const hijriDate = useStore(state => state.hijriDate);
    const notificationActive = useStore(state => state.notificationActive);
    const setNotificationActive = useStore(state => state.setNotificationActive);
    useEffect(() => {
        retrieveData();
    },[])
    //Check from storage if Backgroundfetch is enabled or not 
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('backgroundEnabled');
            const currentValue = JSON.parse(value); //Convert String to Boolean
            console.log("Retrieving from storage: "+value);
            if (currentValue !== null) {
                setNotificationActive(currentValue); 
            }else{
                //console.log(typeof(Boolean(value)));
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    toggled = async (value) => {
        backgroundEnabled(value)
        setNotificationActive(value)
        if (value==false){
            disableAllNotifications();//Disabled all active Alarm
        }
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