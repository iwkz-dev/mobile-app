import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/homeScreen';
import CalenderScreen from './src/screens/calendarScreen';
import ZakatDonasiScreen from './src/screens/zakatDonasiScreen';
import PrayerTimeService from './src/services/prayerTimeService';
import HijriDateService from './src/services/hijriDateService';
import RetrieveEvents from './src/components/calendars/agendaItems';
import BackgroundTask from './src/components/backgroundTask';
const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
    <RetrieveEvents></RetrieveEvents>
    <BackgroundTask></BackgroundTask>
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