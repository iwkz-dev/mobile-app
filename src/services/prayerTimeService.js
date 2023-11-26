import React, { useEffect } from 'react';
import { useStore } from '../utils/state';
import { url } from '../utils/config';
import notifee, { TimestampTrigger, TriggerType, AndroidChannel, RepeatFrequency } from '@notifee/react-native';
function PrayerTimeService() {

    const setData = useStore(state => state.setPrayerTimes);
    const setLoading = useStore(state => state.setLoading);
    const data = useStore(state => state.prayerTimes);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getPrayerHour("maghrib");
    }, [data])

    function getPrayerHour(prayerName) {
        if (data == 0) {
            console.log("Prayer time Data is empty")
        } else {
            const prayerTime = data[prayerName].split(":");
            // [0] for hour [1] for minutes
           // console.log("maghrib " + data.maghrib);
           // console.log("HERE: " + test[0]);
            return [prayerTime[0], prayerTime[1]];
        }
    }
    async function setupSubuhNotification() {
        const date = new Date(Date.now());
        const subuhTime=getPrayerHour("subuh");
        try{
            date.setHours(subuhTime[0]);
            date.setMinutes(subuhTime[1]);
        }catch(error){
            console.log("No time for Subuh")
            throw error;
        }
        //date.setMinutes(date.getMinutes() + 5);
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
            id: 'adhan',
            name: 'Adhan Subuh',
            sound: 'adzan',
            vibration: true,
            vibrationPattern: [300, 500],
        });
        // Create a trigger notification
        try {
            await notifee.createTriggerNotification(
                {
                    title: 'Waktu Subuh',
                    body: 'SUBUH',
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
        } catch (error) {
            console.log('error: could not create trigger notification', error?.message);

            throw error;
        }
    }
    async function disableSubuhNotification(notificationId){
        await notifee.cancelNotification(notificationId);
    }

    async function setupDzuhurNotification() {
        const date = new Date(Date.now());
        date.setMinutes(date.getMinutes() + 5);
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
            id: 'adhan',
            name: 'Adhan dzuhur',
            sound: 'adzan',
            vibration: true,
            vibrationPattern: [300, 500],
        });
        // Create a trigger notification
        try {
            await notifee.createTriggerNotification(
                {
                    title: 'Waktu Dzuhur',
                    body: 'SUBUH',
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
        } catch (error) {
            console.log('error: could not create trigger notification', error?.message);

            throw error;
        }
    }
    async function disableSubuhNotification(notificationId){
        await notifee.cancelNotification(notificationId);
    }
    /*     const createNotificationObject = {
            title: 'Meeting with Allah',
            body: 'NOW',
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
        }; */
}
export default PrayerTimeService;