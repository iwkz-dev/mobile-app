import React from "react";
import notifee from '@notifee/react-native';


export default async function OnDisplayNotification() {
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
