import React, {useState} from 'react';
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
import PayPalButton from './src/components/paypalButton';
import { View, Text, Image} from "react-native";
import { SIZES } from './src/constants/theme';
const Tab = createBottomTabNavigator();

const slides = [
  {
    id: 1,
    title: 'Jadwal Sholat',
    description: '“Lihat jadwal sholat melalui aplikasi"',
    image: require('./src/imgs/Onboard1.png')
  },
  {
    id: 2,
    title: 'Zakat Online',
    description: '“Bayar zakat kini mudah dan cepat"',
    image: require('./src/imgs/Onboard2.png')
  },
  {
    id: 3,
    title: 'Notifikasi',
    description: '“Pilih aksi notifikasi yang cocok untuk anda"',
    image: require('./src/imgs/Onboard3.png')
  }
]

export default function App() {

  /*return (
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
  );*/

  const [showHomePage, setShowHomePage] = useState(false);

  const buttonLabel = (label) => {
    return(
      <View style={{
        padding:12,       
      }}>
        <Text style={{
          color: COLORS.title,
          fontWeight:'600',
          fontSize: SIZES.h4,
        }}>
          {label}
        </Text>
      </View>
    )
  }

  if(!showHomePage){
    return(
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return(
            <view style={{
              flex:1,
              alignItems: 'center',
              padding: 15,
              paddingTop: 100,
            }}>
              <Image
              source={item.image}
              style={{
                  width: SIZES.width - 80,
                  height: 400,
              }}
                resizeMode="contain"
              />
              <Text style={{
                fontWeight: 'bold',
                color: COLORS.title,
                fontSize: SIZES.h1,
              }}>
                {item.title}
              </Text>
              <Text style={{
                textAlign: 'center',
                paddingTop: 5,
                color: COLORS.title,
              }}>
                {item.description}
              </Text>
            </view>
          )
        }}
        activeDotStyle={{
          backgroundColor: COLORS.primary,
          width:30,
        }}
        showSkipbutton
        renderNextButton={() => buttonLabel("Next")}
        renderSkipbutton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Done")}
        onDone={() => {
          setShowHomePage(true)
        }}
        />
    )
  }

  return(
    <View style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <Text>Home screen</Text>
    </View>
  )
}