import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from '@react-native-google-signin/google-signin';
import { API_HOST } from '../config';


const AuthComponent = ({ navigation }: any) => {
    const [url, setUrl] = useState(API_HOST)
    const [isSignIn, setIsSignIn] = useState(true);
    const opacity = useSharedValue(1);
    const [validatemessage, setValidatemessage] = useState('ok');
    const [is_animation, setIs_animation] = useState(true);
    const rotate_animation = useSharedValue('0deg');
    const [is_valid, setIs_valid] = useState(true);

    // animation
    useEffect(() => {
        rotate_animation.value = withTiming('0deg', { duration: 0 });

        if (validatemessage == '⌛') {
            setIs_animation(false)
            rotate_animation.value = withTiming('360deg', { duration: 1000 });
        }
    }, [validatemessage])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateX: rotate_animation.value }],

        };
    });
    // credantial state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirm_password] = useState('')
    const [email, setEmail] = useState('')

    // credantial validation
    useEffect(() => {
        if (username.length < 3) {
            setValidatemessage('Username must be more than 3 characters')
        } else {
            setValidatemessage('⌛')
            chake_username_server(username)

        }
    }, [username])
    let upercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let lowercase = 'abcdefghijklmnopqrstuvwxyz'
    let numbers = '0123456789'



    useEffect(() => {
        for (let i = 0; i < password.length; i++) {
            if (!upercase.includes(password[i])) {
                setValidatemessage('upeercase letter must be included')
                break
            } else if (!lowercase.includes(password[i])) {
                setValidatemessage('lowercase letter must be included')
                break
            } else if (!numbers.includes(password[i])) {
                setValidatemessage('number must be included')
                break
            }
        }
        if (password.length < 8) {
            setValidatemessage('Password must be more than 8 characters')
        } else if (password.includes(' ')) {
            setValidatemessage('Password must not contain spaces')
        } else if (!password.includes('@') || !password.includes('#') || !password.includes('$') || !password.includes('%') || !password.includes('&') || !password.includes('*') || !password.includes('(') || !password.includes(')') || !password.includes('-') || !password.includes('+') || !password.includes('/') || !password.includes(':') || !password.includes(';') || !password.includes('<') || !password.includes('=') || !password.includes('>') || !password.includes('?') || !password.includes('[') || !password.includes(']') || !password.includes('^') || !password.includes('_') || !password.includes('`') || !password.includes('{') || !password.includes('|') || !password.includes('}') || !password.includes('~')) {
            setValidatemessage('Password must contain at least one special character')
        }

        else {
            setValidatemessage('ok')
        }
    }, [password])

    const chake_username_server = (text: string) => {
        fetch(`${url}/check_username_availability/${text}/`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json['available'] == true) {
                    setValidatemessage('✔')
                    setIs_animation(true)
                    setIs_valid(true)
                    rotate_animation.value = withTiming('0deg', { duration: 0 });
                } else {
                    setIs_animation(true)
                    setIs_valid(false)
                    setValidatemessage('Username is not available')
                    rotate_animation.value = withTiming('0deg', { duration: 0 });
                }
            })
            .catch((error) => {
                Alert.alert('Something went wrong');
            });
    }


    const handleSwitch = () => {
        opacity.value = 0;
        setTimeout(() => {
            setIsSignIn(!isSignIn);
            opacity.value = withTiming(1, { duration: 500 });
        }, 300);
    };

    const handleSubmit = async () => {
        if (!validet_form()) {
            setValidatemessage('Details are not valid')
            return
        }
        // Handle form submission
        if (isSignIn) {
            handleSignIn();
        } else {
            await fetch(`${url}/signup/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password,
                    'email': email,
                    'is_member': true,
                    'is_trainer': false,
                    'is_manager': false,
                    'first_name': "NS",
                    'last_name': "NS",
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if (json['message'] == true) {
                        // save token
                        storeData(json['token'], json['username'], json['Id'].toString())
                    } else {
                        Alert.alert(json['message']);
                    }
                })
                .catch((error) => {
                    Alert.alert('Something went wrong');
                });
        }
    };

    const handleSignIn = async () => {
        if (is_valid) {
            setValidatemessage('User is not registered')
            Alert.alert('Register first!', 'User is not registered')
            return
        }

        await fetch(`${url}/login/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier: username,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json['message'] == true) {
                    // save token
                    storeData(json['token'], json['username'], json['Id'].toString())

                } else {
                    Alert.alert(json['message']);
                }
            })
            .catch((error) => {
                Alert.alert('Something went wrong');
            });
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const storeData = async (value: string, username: string, id: string) => {
        try {
            console.log(value, 'token')
            await AsyncStorage.setItem('@token', value)
            await AsyncStorage.setItem('@username', username)
            await AsyncStorage.setItem('@id', id)
            navigation.navigate('App')
        } catch (e) {
            // saving error
            Alert.alert('Something went wrong');
        }
    }

    const validet_form = () => {
        if (!isSignIn) {
            if (username.length < 3) {
                setValidatemessage('Username must be more than 3 characters')
                return false
            }
            if (username.includes(' ')) {
                setValidatemessage('Username must not contain spaces')
                return false
            }
            if (password.length < 8) {
                setValidatemessage('Password must be more than 8 characters')
                return false
            }
            if (password.includes(' ')) {
                setValidatemessage('Password must not contain spaces')
            } if (!password.includes('@') || !password.includes('#') || !password.includes('$') || !password.includes('%') || !password.includes('&') || !password.includes('*') || !password.includes('(') || !password.includes(')') || !password.includes('-') || !password.includes('+') || !password.includes('/') || !password.includes(':') || !password.includes(';') || !password.includes('<') || !password.includes('=') || !password.includes('>') || !password.includes('?') || !password.includes('[') || !password.includes(']') || !password.includes('^') || !password.includes('_') || !password.includes('`') || !password.includes('{') || !password.includes('|') || !password.includes('}') || !password.includes('~')) {
                setValidatemessage('Password must contain at least one special character')
            }
            if (password == confirm_password) {
                setValidatemessage('Password and Confirm password must be same')
                return false
            }
            if (email.length < 6) {
                setValidatemessage('Please enter a valid email address')
                return false
            }
            if (!email.includes('@')) {
                setValidatemessage('Please enter a valid email address')
                return false
            }
            if (!email.includes('.')) {
                setValidatemessage('Please enter a valid email address')
                return false
            }
            return true
        }
        else {
            if (username.length < 3) {
                setValidatemessage('Username must be more than 3 characters')
                return false
            }
            if (username.includes(' ')) {
                setValidatemessage('Username must not contain spaces')
                return false
            }
            if (password.length < 8) {
                setValidatemessage('Password must be more than 8 characters')
                return false
            }
            if (password.includes(' ')) {
                setValidatemessage('Password must not contain spaces')
            } if (!password.includes('@') || !password.includes('#') || !password.includes('$') || !password.includes('%') || !password.includes('&') || !password.includes('*') || !password.includes('(') || !password.includes(')') || !password.includes('-') || !password.includes('+') || !password.includes('/') || !password.includes(':') || !password.includes(';') || !password.includes('<') || !password.includes('=') || !password.includes('>') || !password.includes('?') || !password.includes('[') || !password.includes(']') || !password.includes('^') || !password.includes('_') || !password.includes('`') || !password.includes('{') || !password.includes('|') || !password.includes('}') || !password.includes('~')) {
                setValidatemessage('Password must contain at least one special character')
            }
            return true
        }
    }

    // google sign in
    // const signIn = async () => {
    //     console.log('sign in')
    //     try {
    //         console.log(await GoogleSignin.hasPlayServices())
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log(userInfo)
    //     } catch (error: any) {
    //         console.log(error)
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //     }
    // };

    // const singup = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         await GoogleSignin.configure({
    //             webClientId: '1084391717507-0q9n0v3q4m5p9l3q1h7q3q4qk4b5v3.apps.googleusercontent.com',

    //         });
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log(userInfo)
    //     } catch (error: any) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //     }
    // };
    return (
        <View style={styles.container}>
            {/* ...rest of the code */}
            <View style={styles.authBox}>
                <View style={styles.switcherContainer}>
                    <TouchableOpacity style={styles.swich} onPress={handleSwitch}>
                        <Text style={isSignIn ? styles.active : null}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swich} onPress={handleSwitch}>
                        <Text style={!isSignIn ? styles.active : null}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <Animated.View style={[styles.formContainer, animatedStyles]}>
                    {!isSignIn && is_animation && (
                        <Text style={[styles.validatemessage]} >{validatemessage}</Text>
                    )}
                    {!is_animation && !isSignIn && (
                        <Animated.View style={animatedStyle}><Text style={{ fontSize: 20 }}>⌛</Text></Animated.View>
                    )}
                    {/* {isSignIn && (<GoogleSigninButton style={{ width: '100%', height: 50 }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={signIn} />)}
                    {!isSignIn && (<GoogleSigninButton style={{ width: '100%', height: 50 }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={singup} />)} */}
                    <TextInput placeholder="User Name" style={styles.input} onChangeText={(value: string) => { setUsername(value.toLowerCase()) }} value={username} />
                    <TextInput placeholder="Password" style={styles.input} onChangeText={setPassword} />
                    {!isSignIn && (
                        <TextInput placeholder="Confirm Password" style={styles.input} />
                    )}

                    {!isSignIn && (<TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />)}
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.submitButton}>
                            <Text style={{ color: white }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};

let nav_primiry = '#1800ec';
let white = '#ffffff';
let black = '#000000';
let gray = '#808080';
let bg_color = '#eaeaea';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: 20,
        height: 20,
    },
    logoName: {
        width: 100,
        height: 20,
        resizeMode: 'contain',
    },
    authBox: {
        marginTop: '25%',
        width: '95%',
        backgroundColor: white,
        borderRadius: 5,
        padding: 20,
        elevation: 5,
        alignSelf: 'center',
        shadowColor: black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
    },
    switcherContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: bg_color,
        height: 40,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,

    },
    swich: {
        backgroundColor: bg_color,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
    },
    active: {
        color: black,
        textShadowColor: nav_primiry,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        textDecorationLine: 'underline'
    },

    formContainer: {
        marginTop: 20,
    },
    googleAuth: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: black,
        padding: 10,
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
    },
    submitButton: {
        backgroundColor: nav_primiry,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    validatemessage: {
        color: 'red',
        fontSize: 10,
        marginBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'baseline',
    }
});

export default AuthComponent;