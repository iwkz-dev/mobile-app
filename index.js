/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';

import CreateNotification from './src/components/notification';
import BackgroundFetch from "react-native-background-fetch";
import createNotificationObjects from './src/components/notificationObjects';
import { disableNotification } from './src/components/notificationObjects';
import { enableReminders } from './src/components/notification';
import { url } from './src/utils/config';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
/// BackgroundFetch Android Headless Event Receiver.
/// Called when the Android app is terminated.
///
let MyHeadlessTask = async (event) => {
  // Get task id from event {}:
  let taskId = event.taskId;
  let isTimeout = event.timeout;  // <-- true when your background-time has expired.
  if (isTimeout) {
    // This task has exceeded its allowed running-time.
    // You must stop what you're doing immediately finish(taskId)
    console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
    BackgroundFetch.finish(taskId);
    return;
  }
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);

  //Send req to API for Prayer Times
  const response = await fetch(url);
  const responseJson = await response.json();
  console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);
  console.log('Creating Alarms...');
  setupNofifications();
  
  function setupNofifications() {
    /*  const testDate = new Date(Date.now());
      testDate.setMinutes(testDate.getMinutes() + 0);
      const testPrayerList = {
        subuh: testDate.getHours() + ":" + (testDate.getMinutes() + 1),
        dzuhur: testDate.getHours() + ":" + (testDate.getMinutes() + 2),
      }*/
    if (responseJson == null) {
      console.log("Prayer time Data is empty");
      return 0
    } else {
      const keys = Object.keys(responseJson);
      //Checking for passed prayer time, so they don't get recreated
      const currentDate = new Date();
      console.log("Current Hours: " + currentDate.getHours() + ":" + currentDate.getMinutes());
      //Iterate through keys and create object notification for each prayer time
      Object.keys(responseJson).forEach(key => {
        if (key.toString() !== "date") {
          const prayerTimeArray = responseJson[key].split(":");
          if (prayerTimeArray[0] > currentDate.getHours()) {
            //Cancel previously created alarm before creating a new one.
            disableNotification(key);
            //Create alarm if the time has not passed by current time
            createNotificationObjects(key, responseJson[key]);
          } else if (prayerTimeArray[0] == currentDate.getHours() && prayerTimeArray[1] > currentDate.getMinutes()) {
            //Cancel previously created alarm before creating a new one.
            disableNotification(key);
            //Create alarm if the time has not passed by current time
            createNotificationObjects(key, responseJson[key]);
          } else {
            console.log("Prayer time " + key + " has passed, alarm not created")
            //Cancel when alarm has passed
            disableNotification(key);
          }

        }
      });
    }
  }

  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
}

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);