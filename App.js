import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/homeScreen';
import CalenderScreen from './src/screens/calendarScreen';
import ZakatDonasiScreen from './src/screens/zakatDonasiScreen';
import PrayerTimeService from './src/services/prayerTimeService';
import HijriDateService from './src/services/hijriDateService';
import { useStore } from './src/utils/state';
import BackgroundFetch from 'react-native-background-fetch';
const Tab = createBottomTabNavigator();

export default function App() {
  const notificationActive = useStore(state => state.notificationActive);
  useEffect(() => {
    // Call the background sync function when the app is opened
    if(notificationActive==true){
      console.log("performBackgroundSync active");
      initBackgroundFetch();
    }else{
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
  return (
    <NavigationContainer>
    <PrayerTimeService></PrayerTimeService>
    <HijriDateService></HijriDateService>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalenderScreen} />
        <Tab.Screen name="ZakatDonasi" component={ZakatDonasiScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}