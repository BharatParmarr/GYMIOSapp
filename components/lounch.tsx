import React, { useEffect, useRef, useState, } from 'react';
import { View, Animated, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_HOST } from '../config';
// import NetInfo from '@react-native-community/netinfo';


// Replace with your actual fetch calls
const fetchVersion = async () => {
    const response = await fetch(`${API_HOST}/virsionCheck`);
    const data = await response.json();
    return data.version;
};

const fetchObject = async () => {
    const response = await fetch(`${API_HOST}/getExersizeObject`);
    const data = await response.json();
    return data;
};

const AppLaunchScreen = ({ navigation }: any) => {
    const [animationValue, setAnimationValue] = useState(new Animated.Value(0.4));
    const [opacity, setOpacity] = useState(new Animated.Value(0.3));
    const [message, setmessage] = useState('');
    const [retry, setretry] = useState(0);

    // check natwork connection
    // NetInfo.fetch().then((state: any) => {
    //     if (!state.isConnected) {
    //         navigation.navigate('OfflinePage');
    //     }
    // });



    const styles = StyleSheet.create({
        fullScreen: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        brand_name: {
            color: white,
            fontSize: 50,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
        }, retry_text: {
            color: white,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
        }
    });


    useEffect(() => {
        if (retry > 5) {
            navigation.navigate('OfflinePage');
        }
        // Fetch version from backend and compare with saved version
        const handleVersionCheck = async () => {
            try {
                const fetchedVersion = await fetchVersion();
                let savedVersion = await AsyncStorage.getItem('savedVersion');
                if (!savedVersion) {
                    savedVersion = ''; // Set an initial value if savedVersion is not found
                }
                if (fetchedVersion !== savedVersion) {
                    // Fetch object and save both version and object in storage
                    await fetchObject().then((data) => {
                        // console.log(fetchedObject, fetchedVersion)
                        const output = Object.fromEntries(
                            Object.entries(data).map(([key, value]: any) => [
                                key,
                                value.map((name: string) => ({ name: name, reps: 0, set: 0 }))
                            ])
                        );
                        AsyncStorage.setItem('objectData', JSON.stringify(output));
                    });
                    await AsyncStorage.setItem('savedVersion', fetchedVersion);

                    // setObjectData(fetchedObject);
                } else {

                }
                setTimeout(() => {
                    try {
                        async function check() {
                            if (await AsyncStorage.getItem('@username') != null && await AsyncStorage.getItem('@token') != null) {
                                console.log('user is logged in')

                                navigation.navigate('App');
                            } else {
                                navigation.navigate('login');
                            }
                        }
                        check();
                    } catch (e) {
                        navigation.navigate('login');
                        Alert.alert('Something went wrong');
                        // check natwork connection
                        // NetInfo.fetch().then((state: any) => {
                        //     console.log('Connection type:', state.type);
                        //     console.log('Is connected?', state.isConnected);
                        //     if (!state.isConnected) {
                        //         navigation.navigate('OfflinePage');
                        //     } else {
                        //         navigation.navigate('login');
                        //     }
                        // });
                    }
                }, 500);
            } catch (error) {
                console.error('Error fetching data:', error);
                setmessage('Try again')
                // reload app if error occurs
                // retry
            }
        };

        handleVersionCheck();

        // Start animation
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 500, // Adjust duration as needed
            useNativeDriver: true,
        }).start();

        // Fade in content after animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 700, // Adjust duration as needed
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 600, // Adjust duration as needed
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [, retry]);



    return (
        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: 22, backgroundColor: nav_primiry, top: '0%' }}>
            {/* Render your animation based on animationValue */}
            <Animated.View
                style={{
                    opacity: opacity,
                    transform: [{ scale: animationValue }],
                }}
            >
                <Text style={styles.brand_name}>Fitness{"\n"}</Text>
            </Animated.View>
            <Text onPress={() => { setretry(retry + 1) }} style={styles.retry_text}> {message}</Text>
            <Text style={styles.retry_text}> { }</Text>
        </View>
    );
};

// light
let nav_primiry = '#480cfe'
let white = '#ffffff'
let black = '#000000'
let gray = '#808080'
let bg_color = '#eaeaea'


export default AppLaunchScreen;