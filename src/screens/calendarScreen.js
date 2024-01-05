import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ExpandableCalendar, WeekCalendar, CalendarProvider, AgendaList } from 'react-native-calendars'
import { calendarURL, apiKey } from '../utils/config';
//ToBe deleted
import { agendas, getMarkedDates, emptyCalendar } from '../components/calendars/agendaItems';
import AgendaItem from '../components/calendars/AgendaItem';
import { getTheme, themeColor, lightThemeColor } from '../components/calendars/theme';

const leftArrowIcon = require('../imgs/previous.png');
const rightArrowIcon = require('../imgs/next.png');
const ITEMS = agendas;

function CalenderScreen() {
  const [agendaOn, setAgendaOn] = useState('false');
  const today = new Date().toISOString().split('T')[0];
  const { weekView } = true;
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme()); const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });


  const renderItem = useCallback(({ item }) => {

    return <AgendaItem item={item} />;
  }, []);
  const onDateChanged = () => {
    console.log("DTE CHANGES")
  }
  return (
    <CalendarProvider
      date={today}
      onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      // showTodayButton
      // disabledOpacity={0.6}
      theme={todayBtnTheme.current}
    // todayBottomMargin={16}
    >
      {weekView ? (
        <WeekCalendar markedDates={marked.current}  />
      ) : (
        <ExpandableCalendar
          // hideArrows
          disablePan={true}
          closeOnDayPress={false}
          hideKnob={true}
          initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          disableWeekScroll={true}
          theme={theme.current}
          disableAllTouchEventsForDisabledDays={true}
          //firstDay={1}
          markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
        // animateScroll
        />
      )}
      <AgendaList
        sections={ITEMS}
        renderSectionHeader={({section}) => null }
        initialNumToRender={90}
        renderItem={renderItem}
        avoidDateUpdates={true}
        scrollToNextEvent={false}
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