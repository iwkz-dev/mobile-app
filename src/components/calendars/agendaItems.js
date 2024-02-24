import React, { useEffect, useState, useRef, useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { calendarURL, apiKey } from '../../utils/config';


export const test = [];
export const agendas =[];
export default function RetrieveEvents() {

    useEffect(() => {
        fetch(calendarURL)
            .then((resp) => resp.json())
            .then((json) => {
                // Process the response and extract events for the current month
                const filteredEvents = json.items.filter((event) => {
                    const eventDate = new Date(event.start.dateTime);
                    return eventDate;
                });
                // Convert events to a format suitable for react-native-calendars
                filteredEvents.forEach((event) => {
                    const description = event.summary;
                    const date = event.start.dateTime.split("T");
                    
                    const startTimeFormat = date[1].split(":")[0] +":"+ date[1].split(":")[1];
                    const startTime = date[1].split(":")[0];
                    const endTime = event.end.dateTime.split("T")[1].split(":")[0];
                    const duration = (endTime - startTime < 0) ? (endTime - startTime + 24).toString() : (endTime - startTime).toString();

                    agendas.push({ title: date[0], data: [{ date: date[0], hour: startTimeFormat, duration: duration+" h", title: description }] })
                  
                });
            })
            .catch((error) => console.error(error));
    }, []);
   
}


export function getMarkedDates() {
    const marked = {};
    agendas.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      } else {
        marked[item.title] = {disabled: true};
      }
    });
    return marked;
}