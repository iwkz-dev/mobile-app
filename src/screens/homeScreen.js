import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';
import { useStore } from '../utils/state';
import { currentYear } from '../services/dateServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundEnabled } from '../utils/storage';
import { disableAllNotifications } from '../components/notificationObjects';
function HomeScreen() {
    const data = useStore(state => state.prayerTimes);
    const loading = useStore(state => state.loading);
    const hijriDate = useStore(state => state.hijriDate);
    const notificationActive = useStore(state => state.notificationActive);
    const setNotificationActive = useStore(state => state.setNotificationActive);
    const dateNow = new Date();
    const dateTarget = new Date();
    let prayerList = []
    //const [currentPrayer, setCurrentPrayer] = useState(null)
    //const [nextPrayer, setNextPrayer] = useState(null)
    const [dataFound, setDataFound] = useState('false')
    useEffect(() => {
        retrieveData();
    }, [])
    useEffect(() => {
        createPrayerList(data);
    })
    //Check from storage if Backgroundfetch is enabled or not 
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('backgroundEnabled');
            const currentValue = JSON.parse(value); //Convert String to Boolean
            console.log("Retrieving from storage: " + value);
            if (currentValue !== null) {
                setNotificationActive(currentValue);
            } else {
                //console.log(typeof(Boolean(value)));
            }
        } catch (error) {
            // Error retrieving data
        }
    }


    toggled = async (value) => {
        backgroundEnabled(value)
        setNotificationActive(value)
        if (value == false) {
            disableAllNotifications();//Disabled all active Alarm
        }
    }
    const getCurrentNextPrayer = data => {
        let currentPrayer = "";
        let nextPrayer = "";
        for (let item in data) {
            if (item !== "date") {
                dateTarget.setHours(data[item].split(":")[0])
                dateTarget.setMinutes(data[item].split(":")[0])
                if (dateNow.getTime() < dateTarget.getTime()) {
                    //Next Prayer found, and loop break
                    nextPrayer = item;
                    console.log(item)
                    break;
                }
                //Previous Prayer found
                currentPrayer = item;
            }
        }
        console.log("currentPray: " + currentPrayer + " Next Pray: " + nextPrayer)
        return [currentPrayer, nextPrayer];
    }
    function createPrayerList(data) {
        let currentAndNext = getCurrentNextPrayer(data);
        let currentPrayer = currentAndNext[0];
        let nextPrayer = currentAndNext[1];
        for (let item in data) {
            if (item !== "date") {
                if (item == currentPrayer && item !== "terbit") {
                    prayerList.push(
                        <View style={styles.itemCurrent}>
                            <Text>{item} {data[item]}</Text>
                        </View>
                    )
                } else if (item == nextPrayer && item !== "terbit") {
                    prayerList.push(
                        <View style={styles.itemNext}>
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
        //console.log(prayerList)
        return prayerList;
    }

    const renderPrayerTimeItem = ({ item }) => (
        <>{item}</>
    );

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
                            data={prayerList}
                            renderItem={renderPrayerTimeItem}
                            keyExtractor={(item, index) => index.toString()}
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
        backgroundColor: 'yellow',
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