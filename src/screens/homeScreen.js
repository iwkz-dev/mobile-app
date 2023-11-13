import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useStore } from '../utils/state';
import { currentDate, currentMonth, currentMonthNumber, currentYear} from '../services/dateServices';
import notifee from '@notifee/react-native';
import OnDisplayNotification from '../components/notification';
function HomeScreen() {
    const data = useStore(state => state.prayerTimes);
    const loading = useStore(state => state.loading);
    const hijriDate = useStore(state => state.hijriDate);

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    <Button title= "Display Notif" onPress={() => OnDisplayNotification()}></Button>
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