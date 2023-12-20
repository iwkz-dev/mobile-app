import React from "react";
import { useEffect } from "react";
import { useStore } from "../utils/state";
import BackgroundFetch from 'react-native-background-fetch';
import createNotificationObjects from '../components/notificationObjects';

export default function BackgroundTask() {
    const data = useStore(state => state.prayerTimes);
    const notificationActive = useStore(state => state.notificationActive);
    useEffect(() => {
        // Call the background sync function when the app is opened
        if (notificationActive == true) {
            console.log("performBackgroundSync active");
            initBackgroundFetch();
        } else {
            console.log("performBackgroundSync not active");
        }
    }, [notificationActive]);

    async function initBackgroundFetch() {
        // BackgroundFetch event handler.
        const onEvent = async (taskId) => {
            console.log('[BackgroundFetch] task: ', taskId);
            // Do your background work...
            testCreateOneAlarm();
            // IMPORTANT:  You must signal to the OS that your task is complete.
            BackgroundFetch.finish(taskId);
        }

        // Timeout callback is executed when your Task has exceeded its allowed running-time.
        // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
        const onTimeout = async (taskId) => {
            console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
            BackgroundFetch.finish(taskId);
        }

        // Initialize BackgroundFetch only once when component mounts.
        let status = await BackgroundFetch.configure({
            minimumFetchInterval: 15,
            stopOnTerminate: false,
            enableHeadless: true,
            startOnBoot: true,
            // Android options
            forceAlarmManager: false,
        }, onEvent, onTimeout);

        console.log('[BackgroundFetch] configure status: ', status);
    }
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
}