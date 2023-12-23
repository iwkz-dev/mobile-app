import * as React from 'react';
import { Text, View } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars'
function CalenderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', 
    backgroundColor: "lightgrey" }}>
      <Calendar
      
      />
    </View>
  );
}

export default CalenderScreen;