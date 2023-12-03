import React from "react";
import { Alert, Platform } from "react-native";
import notifee, { TimestampTrigger, TriggerType, AndroidChannel, AuthorizationStatus } from '@notifee/react-native';
import NotificationObjects from "./notificationObjects";
import { useStore } from "../utils/state";

//Checking permission to use deliver notification before checking the optimzation
export const enableReminders = async () => {
    const hasPermissions = await checkPermissions();
    if (hasPermissions) {
        //OnCreateTriggerNotification();
        console.log('app has Permission, Checking Optimization');
    } else {
        Alert.alert(
            'Enable Notifications',
            'To receive notifications opt in from your Settings.',
            [{ text: 'Cancel' }, { text: 'Settings', onPress: openPermissionSettings }],
        );
    }
    checkOptimization();
};
//Make sure optimization is disabled so push the alarms wont get killed by OS
export async function checkOptimization() {
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
    }else{
        console.log("App optimization disabled, notif should work")
    }
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


const openPermissionSettings = async () => {
    if (Platform.OS === 'ios') {
        await Linking.openSettings();
    } else {
        await notifee.openNotificationSettings();
    }
};