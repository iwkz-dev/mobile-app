import React from "react";
import { Alert, Platform } from "react-native";
import notifee, { TimestampTrigger, TriggerType, AndroidChannel, AuthorizationStatus } from '@notifee/react-native';


async function OnCreateTriggerNotification() {
    // FOR ANDROID 1. checks if battery optimization is enabled 
    const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();
    if (batteryOptimizationEnabled) {
        // 2. ask your users to disable the feature
        Alert.alert(
            'Restrictions Detected',
            'To ensure notifications are delivered, please disable battery optimization for the app.',
            [
                // 3. launch intent to navigate the user to the appropriate screen
                {
                    text: 'OK, open settings',
                    onPress: async () => await notifee.openBatteryOptimizationSettings(),
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    } else {
        console.log("Notif created");
        // Create a requiered channel for Android
        const channelId = await notifee.createChannel({
            id: 'test',
            name: 'Adzan Channel',
            sound: 'adzan',
            vibration: true,
            vibrationPattern: [300, 500],
        });

        //Set time for the Alarm
        const date = new Date(Date.now());
        date.setMinutes(date.getMinutes() + 5);
        console.log(date.getHours() + " ; " + date.getMinutes());

        // Create a time-based trigger
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(), // when notif is fired
            //repeatFrequency: RepeatFrequency.DAILY,
            alarmManager: {
                allowWhileIdle: true,
            },

        };

        // Create a trigger notification
        try {
            await notifee.createTriggerNotification(
                {
                    title: 'Meeting with Allah',
                    body: 'NOW',
                    android: {
                        channelId,
                        vibrationPattern: [50, 250, 250, 50],
                        sound: 'adzan',
                        timestamp: date.getTime(),
                        showTimestamp: true,
                        pressAction: {
                            id: 'default',
                            launchActivity: 'default',
                        },
                    },
                },
                trigger,
            );
        } catch (error) {
            console.log('error: could not create trigger notification', error?.message);

            throw error;
        }
    };

}

const checkPermissions = async () => {
    if (Platform.OS === 'ios') {
        const settings = await notifee.requestPermission();
        return Boolean(
            settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
            settings.authorizationStatus === AuthorizationStatus.PROVISIONAL,
        );
    }
    const settings =
        Platform.OS === 'android' && Platform.Version >= 33
            ? await notifee.requestPermission()
            : await notifee.getNotificationSettings();
    const channel = await notifee.getChannel('MyChannelID');
    return (
        settings.authorizationStatus === AuthorizationStatus.AUTHORIZED &&
        !channel?.blocked);
};

const disableAllReminders = async () => {
    // Disable in-app push notification setting
    await notifee.cancelAllNotifications();
};

export const enableReminders = async () => {
    const hasPermissions = await checkPermissions();
    if (hasPermissions) {
        OnCreateTriggerNotification();
        console.log('Here');
    } else {
        Alert.alert(
            'Enable Notifications',
            'To receive notifications opt in from your Settings.',
            [{ text: 'Cancel' }, { text: 'Settings', onPress: openPermissionSettings }],
        );
    }
};

const openPermissionSettings = async () => {
    if (Platform.OS === 'ios') {
        await Linking.openSettings();
    } else {
        await notifee.openNotificationSettings();
    }
};