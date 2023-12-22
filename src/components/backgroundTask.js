import React from "react";
import { useEffect, useState } from "react";
import { useStore } from "../utils/state";
import BackgroundFetch from 'react-native-background-fetch';
import { disableNotification } from "./notificationObjects";
import createNotificationObjects from "./notificationObjects";

export default function BackgroundTask() {
    const data = useStore(state => state.prayerTimes);
    const notificationActive = useStore(state => state.notificationActive);
    useEffect(() => {
        // Call the background sync function when the app is opened
        if (notificationActive == true) {
            console.log("performBackgroundSync active");
            initBackgroundFetch();
            //setupNofifications();
        } else {
            BackgroundFetch.stop();
            console.log("performBackgroundSync not active");
        }
    }, [notificationActive]);
    
    async function initBackgroundFetch() {
        // BackgroundFetch event handler.
        const onEvent = async (taskId) => {
            console.log('[BackgroundFetch] task: ', taskId);
            // Do your background work...

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
    function setupNofifications() {
        if (data == null) {
          console.log("Prayer time Data is empty");
          return 0
        } else {
          const keys = Object.keys(data);
          //Checking for passed prayer time, so they don't get recreated
          const currentDate = new Date();
          console.log("Current Hours: " + currentDate.getHours() + ":" + currentDate.getMinutes());
          //Iterate through keys and create object notification for each prayer time
          Object.keys(data).forEach(key => {
            if (key.toString() !== "date") {
              const prayerTimeArray = data[key].split(":");
              if (prayerTimeArray[0] > currentDate.getHours()) {
                //Cancel previously created alarm before creating a new one.
                disableNotification(key);
                //Create alarm if the time has not passed by current time
                createNotificationObjects(key, data[key]);
              } else if (prayerTimeArray[0] == currentDate.getHours() && prayerTimeArray[1] > currentDate.getMinutes()) {
                //Cancel previously created alarm before creating a new one.
                disableNotification(key);
                //Create alarm if the time has not passed by current time
                createNotificationObjects(key, data[key]);
              } else {
                console.log("Prayer time " + key + " has passed, alarm not created")
                //Cancel when alarm has passed
                disableNotification(key);
              }
    
            }
          });
        }
      }
}