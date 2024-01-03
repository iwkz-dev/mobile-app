import React, { useEffect, useState, useRef, useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { calendarURL, apiKey } from '../../utils/config';


export const test = [];
export const emptyCalendar = setCalendar();
export default function RetrieveEvents() {
    const [agendas, setAgendas] = useState({});

    useEffect(() => {
        fetch(calendarURL)
            .then((resp) => resp.json())
            .then((json) => {
                // Process the response and extract events for the current month
                const filteredEvents = json.items.filter((event) => {
                    //console.log(event)
                    const eventDate = new Date(event.start.dateTime);
                    return eventDate;
                    /*return (
                        //Only store events from current month and year
                        eventDate.getMonth() === new Date().getMonth() &&
                        eventDate.getFullYear() === new Date().getFullYear()
                    );*/
                });
                // Convert events to a format suitable for react-native-calendars
                const dateWithEvent = {};
                const agenda = [];
                filteredEvents.forEach((event) => {
                    const description = event.summary;
                    const date = event.start.dateTime.split("T");
                    
                    const startTimeFormat = date[1].split(":")[0] +":"+ date[1].split(":")[1];
                    const startTime = date[1].split(":")[0];
                    const endTime = event.end.dateTime.split("T")[1].split(":")[0];
                    const duration = (endTime - startTime < 0) ? (endTime - startTime + 24).toString() : (endTime - startTime).toString();

                    //Update Empty Calendar with dates with event
                    // Find the index of the object with the specified ID
                    let indexToUpdate = emptyCalendar.findIndex(obj => obj.title === date[0]);
                    // Check if the object with the specified ID exists
                    if (indexToUpdate !== -1) {
                        // Update the name property of the object at the found index
                        emptyCalendar[indexToUpdate].data = [{ date: date[0], hour: startTimeFormat, duration: duration+"H", title: description }];

                       // console.log(emptyCalendar);
                    }
                    //agenda.push({ title: date[0], data: [{ hour: startTime, duration: duration, title: description }] })
                    //dateWithEvent[date[0]] = { selected: true, marked: true, dotColor: 'blue' };
                    //console.log(date[0])
                });
                test.push(emptyCalendar);
                //setAgendas(agenda);
                // setMarkedDates(dateWithEvent);
                //console.log(test)
                console.log("EmptyCalendar length: "+emptyCalendar.length)
            })
            .catch((error) => console.error(error));
    }, []);
   
}
function setCalendar() {
    const calendarCurrentMonth = [];
    const calendarPrevMonth = [];
    const calendarNextMonth = [];
    const date = new Date();

    const datesFormat = (y, m, d) => {
        m = (m <= 9) ? ("0" + m) : m;
        d = (d <= 9) ? ("0" + d) : d;
        return y + "-" + m + "-" + d;
    }

    const currentMonth = date.getUTCMonth() + 1;
    const previousMonth = (date.getUTCMonth() == 0) ? (date.getUTCMonth() + 12) : (date.getUTCMonth());
    const nextMonth = (date.getUTCMonth() + 2 > 12) ? 1 : (date.getUTCMonth() + 2);

    const currentYear = date.getUTCFullYear();
    const previousYear = (previousMonth == 12) ? date.getUTCFullYear() - 1 : currentYear;
    const nextYear = (nextMonth == 1) ? date.getUTCFullYear() + 1 : currentYear;

    const emptyDate = (date) => {
        return { title: date, data: [{}] }
    }
    const getTotalDays = (y, m) => new Date(y, m, 0).getDate();

    for (i = 1; i <= getTotalDays(currentYear, currentMonth); i++) [
        calendarCurrentMonth.push(emptyDate(datesFormat(currentYear, currentMonth, i)))
    ]
    for (i = 1; i <= getTotalDays(previousYear, previousMonth); i++) [
        calendarPrevMonth.push(emptyDate(datesFormat(previousYear, previousMonth, i)))
    ]
    for (i = 1; i <= getTotalDays(nextYear, nextMonth); i++) [
        calendarNextMonth.push(emptyDate(datesFormat(nextYear, nextMonth, i)))
    ]
    // 3 months are too long for the calendar, 
    const emptyCalendar = calendarPrevMonth.concat(calendarCurrentMonth, calendarNextMonth);
    return emptyCalendar;

}


export function getMarkedDates() {
    //console.log("AgendaItems: "+Object.keys(agendaItems[0].data[0]))
    // console.log("Inside AgendaItems: "+agendaItems[0].data[0])
    const marked = {};
    emptyCalendar.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      } else {
        marked[item.title] = {disabled: true};
      }
    });
    return marked;
}