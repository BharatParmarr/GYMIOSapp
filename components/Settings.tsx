import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, Appearance } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { TimerPickerModal } from "react-native-timer-picker";
import FadeOutAlert from './fademessage';
import { API_HOST } from '../config';
import Loading from './loading';
import { set } from 'lodash';
import { Settheamcolor } from './theamcolorchanger';
import { ThemeContext, UserDetails } from './theamcontext';


const Settings = ({ navigation }: any) => {
    const { userdetails, setuserdetails } = useContext(UserDetails);
    useEffect(() => {
        setprivateaccount(userdetails.is_private);

    }, [userdetails])
    const [darkmode, setdarkmode] = useState(false);
    const [systemtheam, setSystemtheam] = useState(false);
    const [lightmode, setlightmode] = useState(false);
    const [notification, setnotification] = useState(false);
    const [privateaccount, setprivateaccount] = useState(userdetails.is_private);
    const [Resttime, setResttime] = useState('0');
    const [Workouttime, setWorkouttime] = useState('0');
    const [logout, setlogout] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertmessage, setAlertmessage] = useState('');
    const [loading, setloading] = useState(false);
    const [theme, settheme] = useState("light" as "light" | "dark" | undefined);

    const { themecolors, setThemecolor } = useContext(ThemeContext);

    const [nav_primiry, setnav_primiry] = useState(themecolors.nav_primiry);
    const [white, setwhite] = useState(themecolors.white);
    const [black, setblack] = useState(themecolors.black);
    const [gray, setgray] = useState(themecolors.gray);
    const [bg_color, setbg_color] = useState(themecolors.bg_color);
    useEffect(() => {
        setnav_primiry(themecolors.nav_primiry);
        setwhite(themecolors.white);
        setblack(themecolors.black);
        setgray(themecolors.gray);
        setbg_color(themecolors.bg_color);
    }, [themecolors])

    const ref = useRef(true);

    async function gettheam() {

        let theam = await AsyncStorage.getItem('theme');
        if (theam == null) {
            settheam(true, 'system');

        } else if (theam == 'light') {
            settheam(true, 'light');
        } else if (theam == 'dark') {
            settheam(true, 'dark');
        } else {
            settheam(true, 'system');
        }
    }
    if (ref.current) {
        gettheam();
    }

    useEffect(() => {
        const getResttime = async () => {
            try {
                const value = await AsyncStorage.getItem('Resttime');
                if (value !== null) {
                    setResttime(value);
                }
            } catch (e) {
                setAlertmessage('Error reading data');
                showAlert();
            }
        }
        getResttime();
        const getWorkouttime = async () => {
            try {
                const value = await AsyncStorage.getItem('Workouttime');
                if (value !== null) {
                    setWorkouttime(value);
                    console.log(value);
                }
            } catch (e) {
                setAlertmessage('Error reading data');
                showAlert();
            }
        }
        getWorkouttime();

    }, []);

    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };
    // useEffect(() => {
    //     // get account privacy from server
    //     const getprivacy = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem('@token');
    //             const response = await fetch(`${API_HOST}/useraccount/privacy`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Token ${token}`,
    //                 },
    //             });
    //             const data = await response.json();
    //             if (data.status === 'success' || data.message === true) {
    //                 setprivateaccount(data.data);
    //             } else {
    //                 setAlertmessage('Error getting account privacy');
    //                 showAlert();
    //             }
    //         } catch (e) {
    //             setAlertmessage('Error reading data');
    //             showAlert();
    //         }
    //     }
    //     getprivacy();

    // }, []);

    useEffect(() => {
        try {
            AsyncStorage.setItem('notification', notification ? 'true' : 'false')
        } catch (e) {
            setAlertmessage('Error reading data');
            showAlert();
        }
    }, [notification]);

    useEffect(() => {
        if (ref.current) {
            ref.current = false;
            return;
        } else {
            const setprivet = async () => {
                setloading(true);
                try {
                    await AsyncStorage.setItem('privateaccount', privateaccount ? 'true' : 'false')
                } catch {
                    setAlertmessage('Error reading data');
                    showAlert();
                }
                setTimeout(async () => {
                    console.log('setprivet');
                    try {
                        const token = await AsyncStorage.getItem('@token');
                        let privacy = privateaccount ? 'true' : 'false';
                        // make request to server to change private account
                        const response = await fetch(`${API_HOST}/useraccount/privacy?privacy=${privacy}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${token}`,
                            },
                        });
                        const data = await response.json();
                        console.log(data);
                        if (data.message === true || data.status === 'success') {
                            if (privateaccount) {
                                setAlertmessage('Account is now private');
                            }
                            else {
                                setAlertmessage('Account is now public');
                            }
                            showAlert();
                            setuserdetails({ ...userdetails, is_private: privateaccount });
                        } else {
                            setAlertmessage('Error changing private account');
                            showAlert();
                        }
                    } catch (e) {
                        setAlertmessage('Error reading data 2');
                        showAlert();
                    } finally {
                        setloading(false);
                    }
                }, 2000);
            }
            setTimeout(() => {
                setprivet();
            }, 2000);
        }
    }, [privateaccount]);

    useEffect(() => {
        try {
            AsyncStorage.setItem('Resttime', Resttime.toString())
        } catch (e) {
            setAlertmessage('Error reading data');
            showAlert();
        }
    }, [Resttime]);

    useEffect(() => {
        try {
            AsyncStorage.setItem('Workouttime', Workouttime.toString())
        } catch (e) {
            setAlertmessage('Error reading data');
            showAlert();
        }
    }, [Workouttime]);

    const storeData = async (themedata: string) => {
        console.log(themedata);
        try {
            await AsyncStorage.setItem('theme', themedata)
            await Settheamcolor().then((value) => {
                setThemecolor(value);
            });

        } catch (e) {
            setAlertmessage('Error saving data');
            showAlert();
            await AsyncStorage.setItem('theme', 'system')
        }
    };

    useEffect(() => {
        const unsubscribe = Appearance.addChangeListener(({ colorScheme }) => {
            if (systemtheam) {
                setSystemtheam(true);
            }
        });
        return () => {
            unsubscribe.remove();
        };
    }, []);


    const settheam = (value: boolean, theams: string) => {
        console.log(value, theams);
        if (theams === 'system') {
            if (value) {
                setdarkmode(false);
                setlightmode(false);
                setSystemtheam(true);
                storeData('system');
            }
        }
        else if (theams === 'light') {
            if (value) {
                setdarkmode(false);
                setSystemtheam(false);
                setlightmode(true);
                storeData('light');
            }
        }
        else if (theams === 'dark') {
            if (value) {
                setlightmode(false);
                setSystemtheam(false);
                setdarkmode(true);
                storeData('dark');
            }
        } else {
            if (value) {
                setdarkmode(false);
                setlightmode(false);
                setSystemtheam(true);
                storeData('system');
            }
        }
    }



    useEffect(() => {

    }, [darkmode, lightmode, systemtheam]);
    const formatTime = ({ hours, minutes, seconds }: any) => {
        let formatted = "";
        if (hours > 0) {
            formatted += `${hours}:`;
        }
        formatted += `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
            }${seconds}`;
        return formatted;
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: bg_color,
            padding: 20,
            paddingBottom: 100,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: black,
            marginBottom: 20,
        },
        optionContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: white,
            borderRadius: 5,
            padding: 15,
            marginBottom: 15,
            shadowColor: black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 5,
        },
        optionText: {
            fontSize: 18,
            color: black,
        },
        switch: {
            transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
            color: nav_primiry,
        },
        button: {
            backgroundColor: nav_primiry,
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
        },
        buttonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
        settime_container: {
            backgroundColor: white,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 7,
            padding: 10,
            borderRadius: 10,
            shadowColor: black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 5,
        },
        save_button: {
            backgroundColor: nav_primiry,
            padding: 10,
            borderRadius: 4,
            alignItems: 'center',
            marginBottom: 20,
            position: 'absolute',
            top: 15,
            right: 10,
            zIndex: 1,
        },
        save_button_text: {
            color: white,
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: 'Cochin',
        },
        setting_container: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            backgroundColor: white,
            borderRadius: 5,
            padding: 15,
            marginBottom: 10,
            shadowColor: black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 5,
        },
        loading_container: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 100,
        },
    });
    return (<>
        <ScrollView nestedScrollEnabled={true} scrollEnabled={!loading}>
            <View style={styles.container}>
                {alertVisible && (
                    <View style={{ position: 'absolute', top: 250, width: '100%', zIndex: 100, alignSelf: 'center', justifyContent: 'center' }}>
                        <FadeOutAlert
                            message={alertmessage}
                            onHide={hideAlert}
                        />
                    </View>
                )}


                <Text style={styles.header}><Text style={styles.header}>← </Text> Settings</Text>
                <Text style={{ fontSize: 12, color: gray, marginBottom: 10 }}>General</Text>
                <View style={styles.setting_container}>
                    <Text style={{ marginBottom: 8, color: gray }}>Theam</Text>
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionText}>System Defult</Text>
                        <Switch disabled={loading} trackColor={{ true: nav_primiry, false: gray }} onChange={() => { settheam(!systemtheam, 'system'); }} style={styles.switch} value={systemtheam} />
                    </View>
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionText}>Light Mode</Text>
                        <Switch disabled={loading} trackColor={{ true: nav_primiry, false: gray }} onChange={() => { settheam(!lightmode, 'light'); }} style={styles.switch} value={lightmode} />
                    </View>
                    <View style={[styles.optionContainer, { marginBottom: 0 }]}>
                        <Text style={styles.optionText}>Dark Mode</Text>
                        <Switch disabled={loading} trackColor={{ true: nav_primiry, false: gray }} onChange={() => { settheam(!darkmode, 'dark'); }} style={styles.switch} value={darkmode} />
                    </View>

                </View>
                <View style={[styles.optionContainer, { marginBottom: 7 }]}>
                    <Text style={styles.optionText}>Notifications</Text>
                    <Switch disabled={loading} trackColor={{ true: nav_primiry, false: gray }} style={styles.switch} />
                </View>

                <Text style={{ fontSize: 12, color: gray, marginBottom: 10 }}>Privacy & Sequrity</Text>
                <View style={[styles.optionContainer, { marginBottom: 4 }]}>
                    <Text style={styles.optionText}>Private account</Text>
                    <Switch disabled={loading} trackColor={{ true: nav_primiry, false: gray }} onChange={() => { setprivateaccount(!privateaccount) }} style={styles.switch} value={privateaccount} />
                </View>
                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>Password</Text>
                    <Text style={{ color: gray, textDecorationLine: 'underline' }}>change</Text>
                </View>

                <View style={styles.settime_container}>
                    <Text style={{ fontSize: 18, color: black }}>
                        {Resttime !== null
                            ? "Rest Time set for"
                            : "Set Rest Time "}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setShowPicker(true)}>
                        <View style={{ alignItems: "center" }}>
                            {Resttime !== null ? (
                                <Text style={{ color: gray, fontSize: 48 }}>
                                    {Resttime}
                                </Text>
                            ) : null}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setShowPicker(true)}>
                                <View style={{ marginTop: 30 }}>
                                    <Text
                                        style={{
                                            paddingVertical: 10,
                                            paddingHorizontal: 18,
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            fontSize: 16,
                                            overflow: "hidden",
                                            borderColor: gray,
                                            color: gray
                                        }}>
                                        Rest Time 🕓
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TimerPickerModal
                        visible={showPicker}
                        setIsVisible={setShowPicker}
                        onConfirm={(pickedDuration) => {
                            setResttime(formatTime(pickedDuration));
                            setShowPicker(false);
                        }}
                        modalTitle="Set Rest time"
                        onCancel={() => setShowPicker(false)}
                        closeOnOverlayPress

                        styles={{
                            theme: theme,
                        }}
                        modalProps={{
                            overlayOpacity: 0.2,
                        }}
                    />
                </View>
                <View style={styles.settime_container}>
                    <Text style={{ fontSize: 18, color: black }}>
                        {Workouttime !== null
                            ? "Workout Time set for"
                            : "Set Workout Time"}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setShowPicker2(true)}>
                        <View style={{ alignItems: "center" }}>{Workouttime !== null ? (
                            <Text style={{ color: gray, fontSize: 48 }}>{Workouttime}</Text>) : null}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setShowPicker2(true)}>
                                <View style={{ marginTop: 30 }}>
                                    <Text
                                        style={{
                                            paddingVertical: 10,
                                            paddingHorizontal: 18,
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            fontSize: 16,
                                            overflow: "hidden",
                                            borderColor: gray,
                                            color: gray
                                        }}
                                    >Workout Time 🕓</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TimerPickerModal
                        visible={showPicker2}
                        setIsVisible={setShowPicker2}
                        onConfirm={(pickedDuration) => {
                            setWorkouttime(formatTime(pickedDuration));
                            setShowPicker2(false);
                        }}
                        modalTitle="Workout time"
                        onCancel={() => setShowPicker2(false)}
                        closeOnOverlayPress

                        styles={{
                            theme: theme,
                        }}
                        modalProps={{
                            overlayOpacity: 0.2,
                        }}
                    />
                </View>
                <Text style={{ fontSize: 12, color: gray, marginBottom: 10 }}>Professional Deshbord</Text>
                <View style={[styles.optionContainer, { marginBottom: 4 }]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Management_tools') }}>
                        <Text style={{ color: black, fontSize: 16 }}>Management tools</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 12, color: gray, marginBottom: 10 }}>Account</Text>

                <TouchableOpacity style={styles.save_button}>
                    <Text style={styles.save_button_text}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        {loading ? <View style={styles.loading_container} ><Loading /></View> : null}</>

    )
}



export default Settings;