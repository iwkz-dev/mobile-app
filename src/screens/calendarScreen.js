import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { calendarURL, apiKey } from '../utils/config';
function CalenderScreen() {
  const [events, setEvents] = useState({});
  useEffect(() => {
    fetch(calendarURL)
      .then((resp) => resp.json())
      .then((json) => {
        // Process the response and extract events for the current month
        const filteredEvents = json.items.filter((event) => {
          const eventDate = new Date(event.start.dateTime);
          return (
            //Only store events from current month and year
            eventDate.getMonth() === new Date().getMonth() &&
            eventDate.getFullYear() === new Date().getFullYear()
          );
        });
        // Convert events to a format suitable for react-native-calendars
        const formattedEvents = {};
        filteredEvents.forEach((event) => {
          const date = event.start.dateTime.split("T");
          console.log(date[0])
          formattedEvents[date[0]] = {selected: true, marked: true, dotColor: 'blue' };
        });
        setEvents(formattedEvents);
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center',
      backgroundColor: "lightgrey"
    }}>
      <Calendar
        markedDates={events}
        // Other calendar props can be added here
        onDayPress={day => {
          console.log('selected day', day.dateString);
        }}
      
      />
    </View>
  );
}

export default CalenderScreen;