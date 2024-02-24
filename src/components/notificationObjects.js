import React, { useEffect, useState } from 'react';
import notifee, { TimestampTrigger, TriggerType, AndroidChannel, RepeatFrequency, AndroidImportance } from '@notifee/react-native';
import { enableNotificationPermission } from './notificationPermission';
export default function createNotificationObjects(prayerName, prayerTime) {
    console.log(prayerName + ": " + prayerTime);
    setupNotification(prayerName, prayerTime);
}
async function setupNotification(prayerName, prayerTime) {
    const date = new Date(Date.now());

    const myArray = prayerTime.split(":");
    const hour = myArray[0];
    const minutes = myArray[1];

    //console.log("Hour: "+hour+" Minutes: "+minutes)
    prayerName="Adhan "+prayerName;
    
    date.setHours(hour);
    date.setMinutes(minutes);
    //Create TIMESTAMP triger, each time based on a prayer time
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(), // when notif is fired
        alarmManager: {
            allowWhileIdle: true,
        },
    };
    // Create a requiered channel for Android
    const channelId = await notifee.createChannel({
        id: prayerName,
        name: prayerName,
        sound: 'adzan',
        vibration: true,
        vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
    });
    // Create a trigger notification
    try {
        await notifee.createTriggerNotification(
            {
                id: prayerName, // put id here to modify triger notification, it'll create a new one instead if id don't already exist
                title: 'Waktu Sholat',
                body: prayerName,
                android: {
                    channelId,
                    importance: AndroidImportance.HIGH,
                    vibrationPattern: [50, 250, 250, 50],
                    sound: 'adzan',
                    timestamp: date.getTime(),
                    showTimestamp: true,
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
                    },
                },
            },
            trigger,
        );

        console.log("Notif created for: "+ prayerName);
    } catch (error) {
        console.log('error: could not create trigger notification', error?.message);

        throw error;
    }
}
export async function disableNotification(notificationId) {
    await notifee.cancelTriggerNotification(notificationId);
}
export async function disableAllNotifications() {
    await notifee.cancelTriggerNotifications();
    console.log("Disabling all alarms")
}
