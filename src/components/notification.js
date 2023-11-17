import React from "react";
import notifee, { TimestampTrigger, TriggerType, AndroidChannel } from '@notifee/react-native';


export default async function OnCreateTriggerNotification() {
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes()+1);
    console.log(date.getHours+" ; "+date.getMinutes);
    // Create a requiered channel for Android
    const channelId = await notifee.createChannel({
        id: 'test',
        name: 'Adzan Channel',
        sound: 'default',
        vibration: true,
        vibrationPattern: [300, 500],
    });

    // Create a time-based trigger
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
        //repeatFrequency: RepeatFrequency.DAILY,
        alarmManager: true,
    
    };

    // Create a trigger notification
    try{
        await notifee.createTriggerNotification(
            {
                title: 'Meeting with Allah',
                body: 'NOW',
                android: {
                    channelId,
                    vibrationPattern: [50, 250, 250, 50],
                    sound: 'adzan',
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
                      },
                },
            },
            trigger,
        );
    }catch(error){
        console.log('error: could not create trigger notification', error?.message);

    throw error;
    }
    
}
