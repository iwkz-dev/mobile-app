import React, { useEffect, useState } from 'react';
import notifee, { TimestampTrigger, TriggerType, AndroidChannel, RepeatFrequency } from '@notifee/react-native';
import { enableReminders } from './notification';
export default function createNotificationObjects(prayerName, prayerTime) {
    console.log(prayerName + ": " + prayerTime);
    setupSubuhNotification(prayerName, prayerTime);
}
async function setupSubuhNotification(prayerName, prayerTime) {
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
        //repeatFrequency: RepeatFrequency.DAILY,
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
    });
    // Create a trigger notification
    try {
        await notifee.createTriggerNotification(
            {
                title: 'Waktu Sholat',
                body: prayerName,
                android: {
                    channelId,
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
async function disableSubuhNotification(notificationId) {
    await notifee.cancelNotification(notificationId);
}

