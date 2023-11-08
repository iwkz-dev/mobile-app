import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStore } from '../utils/state';

function HomeScreen() {
    const data = useStore(state => state.prayerTimes);
    const loading = useStore(state => state.loading);
    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    <Text style={styles.title}>{data.date}</Text>
                    <Text>Subuh</Text>
                    <Text>{data.subuh}</Text>
                    <Text>dzuhur</Text>
                    <Text>{data.dzuhur}</Text>
                    <Text>ashr</Text>
                    <Text>{data.ashr}</Text>
                    <Text>maghrib</Text>
                    <Text>{data.maghrib}</Text>
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