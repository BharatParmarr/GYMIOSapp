import React, { useEffect } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { Notifications } from 'react-native-notifications';
import PushNotification, { Importance } from 'react-native-push-notification';

const Test = () => {

    PushNotification.createChannel(
        {
            channelId: "channel-id", // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    return (
        <View>
            <Text>React Native Notifications Example</Text>

            <TouchableOpacity
                onPress={() => {
                    async function scheduleNotification() {
                        console.log('scheduleNotification');
                        // PushNotification.localNotification({
                        //     title: 'My Notification Title',
                        //     message: 'My Notification Message',
                        //     channelId: 'channel-id',
                        // });
                        Notifications.postLocalNotification({
                            body: 'Local notification!',
                            title: 'Local Notification Title',
                            sound: 'chime.aiff',
                            identifier: '',
                            payload: undefined,
                            badge: 0,
                            type: '',
                            thread: ''
                        })
                        PushNotification.localNotificationSchedule({
                            title: 'My Notification Title',
                            message: 'My Notification Message',
                            date: new Date(Date.now() + 12 * 1000), // in 5 secs
                            channelId: 'channel-id',
                        });


                    }
                    scheduleNotification();
                }}
            ><Text>set notification for letter</Text></TouchableOpacity>
        </View >
    );
};

export default Test;
