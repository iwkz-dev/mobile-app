import React from "react";
import notifee, { TimestampTrigger, TriggerType, AndroidChannel } from '@notifee/react-native';


export async function OnDisplayNotification() {
    // Request required permission for IoS
    await notifee.requestPermission()

    // Create a requiered channel for Android
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'adzan',
        vibration: true,
        vibrationPattern: [300, 500],
    });
    // Display a notification
    await notifee.displayNotification({
        title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
        subtitle: '&#129395;',
        body:
            'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
        android: {
            channelId,
            color: '#4caf50',
            sound: 'default',
            vibration: true,
            vibrationPattern: [300, 500],
            actions: [
                {
                    title: '<b>Dance</b> &#128111;',
                    pressAction: { id: 'dance' },
                },
                {
                    title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
                    pressAction: { id: 'cry' },
                },
            ],
        },
    });

}
export async function OnCreateTriggerNotification() {
    const date = new Date(Date.now());
    date.setSeconds(date.getSeconds()+10);
    console.log(date);
    // Create a requiered channel for Android
    const channelId = await notifee.createChannel({
        id: 'test',
        name: 'Adzan Channel',
        sound: 'default',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        vibration: true,
        vibrationPattern: [300, 500],
    });

    // Create a time-based trigger
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
        repeatFrequency: RepeatFrequency.DAILY,
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
                    importance: AndroidImportance.HIGH,
                    visibility: AndroidVisibility.PUBLIC,
                },
            },
            trigger,
        );
    }catch(error){
        console.log('error: could not create trigger notification', error?.message);

    throw error;
    }
    
}
