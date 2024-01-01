import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ExpandableCalendar, LocaleConfig, CalendarProvider, AgendaList } from 'react-native-calendars'
import { calendarURL, apiKey } from '../utils/config';
//ToBe deleted
import { agendaItems, getMarkedDates, test } from '../components/calendars/agendaItems';
import AgendaItem from '../components/calendars/AgendaItem';
import { getTheme, themeColor, lightThemeColor } from '../components/calendars/theme';

const leftArrowIcon = require('../imgs/previous.png');
const rightArrowIcon = require('../imgs/next.png');
const ITEMS = agendaItems;

function CalenderScreen() {
  const { weekView } = true;
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme()); const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });


  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <CalendarProvider
      date={ITEMS[1]?.title}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      theme={todayBtnTheme.current}
    // todayBottomMargin={16}
    >
      {weekView ? (
        <WeekCalendar firstDay={1} markedDates={marked.current} />
      ) : (
        <ExpandableCalendar
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          disableWeekScroll='true'
          theme={theme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
        // animateScroll
        // closeOnDayPress={false}
        />
      )}
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        avoidDateUpdates = 'false'
        scrollToNextEvent='false'
        sectionStyle={styles.section}
      // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
  );
};



export default CalenderScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  }
});