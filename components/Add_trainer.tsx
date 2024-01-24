import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, Touchable, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { conforms, debounce, set } from 'lodash';
import { API_HOST } from '../config';
import { ThemeContext } from './theamcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FadeOutAlert from './fademessage';

const AddTrainer = ({ route, navigation }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [trainers, setTrainers] = useState<any[]>(route.params.trainers);
    const [users, setUsers] = useState<any[]>([]);
    const { themecolors, setThemecolor } = useContext(ThemeContext);

    const [nav_primiry, setnav_primiry] = useState(themecolors.nav_primiry);
    const [white, setwhite] = useState(themecolors.white);
    const [black, setblack] = useState(themecolors.black);
    const [gray, setgray] = useState(themecolors.gray);
    const [bg_color, setbg_color] = useState(themecolors.bg_color);

    const [scrollEffect, setScrollEffect] = useState(true);
    const [page, setPage] = useState(1);
    const ref = useRef(true);
    const ref2 = useRef(true);
    const [endmessge, setendmessge] = useState('');

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertmessage, setAlertmessage] = useState(' ');

    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        setnav_primiry(themecolors.nav_primiry);
        setwhite(themecolors.white);
        setblack(themecolors.black);
        setgray(themecolors.gray);
        setbg_color(themecolors.bg_color);
    }, [themecolors])

    useEffect(() => {
        setTrainers(route.params.trainers);
    }, [route.params.trainers])



    useEffect(() => {
        const find_user = async (username: string) => {
            if (ref.current) {
                ref.current = false;
                return;
            }
            setUsers([]);
            setScrollEffect(true);
            setPage(1);
            setendmessge('');


            if (searchTerm.length > 0) {
                const searchUsers = debounce(async (term) => {
                    try {
                        const response = await fetch(`${API_HOST}/search_users/?q=${term}&page=1&gym=${route.params.gymname}`, {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                            }
                        });
                        const json = await response.json();
                        console.log(json, 'json');

                        if (Array.isArray(json)) {
                            console.log(json);
                            setUsers(json);
                        } else if (json.message == "No more users") {
                            setScrollEffect(false);
                            setendmessge(json.message);
                            return
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }, 300);
                searchUsers(searchTerm);
            } else {
                setUsers([]);
            }
        }
        find_user(searchTerm);
    }, [searchTerm])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: bg_color,
        },
        search_result: {
            backgroundColor: bg_color,
            borderRadius: 0,
            borderWidth: 0,
            borderColor: gray,
            justifyContent: 'flex-start',
            padding: 5,
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
        },
        input: {
            height: 45,
            borderColor: 'gray',
            borderWidth: 0,
            padding: 7,
            margin: 15,
            marginTop: 23,
            marginBottom: 23,
            borderRadius: 5,
            backgroundColor: white,
            color: black,
            fontFamily: 'Roboto',
            shadowColor: black,
            shadowRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 0 },
            elevation: 10,
        },
        list_image: {
            width: 50,
            height: 50,
            borderRadius: 50,
        },
        image_background: {
            width: 56,
            height: 56,
            borderRadius: 50,
            backgroundColor: nav_primiry,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        },
        list_name: {
            fontSize: 15,
            color: black,
            marginVertical: 10,
            marginLeft: 14,
            fontFamily: 'Roboto',
            width: '60%',
            overflow: 'hidden',
            height: 20,
        },
        plus_icon_holder: {
            backgroundColor: nav_primiry,
            width: 45,
            height: 30,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 10,
            marginTop: 'auto',
            marginBottom: 'auto'
        },
        plus_icon: {
            color: white,
            fontSize: 20,
            fontWeight: 'bold',
        },
        end_message: {
            textAlign: 'center',
            color: black,
            fontSize: 12,
            marginVertical: 8,
            shadowColor: black,
            shadowRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: -10 },
            elevation: 10,
        }
    });

    useEffect(() => {
        console.log('page', page);
        if (ref2.current) {
            ref2.current = false;
            return;
        }
        if (page == 1) {
            return;
        }

        if (scrollEffect && searchTerm.length > 0) {
            const searchUsers = debounce(async (term) => {
                try {
                    const response = await fetch(`${API_HOST}/search_users/?q=${term}&page=${page + 1}&gym=${route.params.gymname}`, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                        }
                    });
                    const json = await response.json();
                    json.message == false ? () => {
                        setScrollEffect(false);
                        return
                    } : setScrollEffect(true);

                    if (json.length == 0) {
                        setScrollEffect(false);
                    }

                    if (Array.isArray(json)) {
                        setUsers([...users, ...json]);
                    } else if (json.message == "No more users") {
                        setScrollEffect(false);
                        setendmessge(json.message);
                        return;
                    } else {
                        console.error('Response is not an array:', json);
                    }
                } catch (error) {
                    console.error(error);
                }
            }, 300);
            searchUsers(searchTerm);
        }
    }, [page])


    const savetrainer = async (username: string) => {
        const addtrainer = async (username: string) => {
            console.log(route.params.gymname);
            const response = await fetch(`${API_HOST}/add_trainer_request/?gym=${route.params.trainers[0].gym}&username=${username}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                },
            });
            const json = await response.json();
            if (json.message) {
                setAlertmessage('Request sent')
                showAlert();
                setTimeout(() => {
                    navigation.goBack();
                }, 500);
            } else {
                setAlertmessage('somthing went wrong!')
                showAlert()
            }
        }
        Alert.alert('Add Trainer', 'Are you sure you want to add this trainer?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Add',
                onPress: () => addtrainer(username),
                style: 'default'
            }
        ])

    }

    const removetrainer = async (username: string) => {
        // remove request 
        const addtrainer = async (username: string) => {
            console.log(route.params.gymname);
            const response = await fetch(`${API_HOST}/add_trainer_request/?gym=${route.params.trainers[0].gym}&username=${username}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                },
            });
            const json = await response.json();
            if (json.message) {
                setAlertmessage('Request removed')
                showAlert();
                setTimeout(() => {
                    navigation.goBack();
                }, 500);
            } else {
                setAlertmessage('somthing went wrong!')
                showAlert()
            }
        }
        Alert.alert('Add Trainer', 'Are you sure you want to add this trainer?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Add',
                onPress: () => addtrainer(username),
                style: 'default'
            }
        ])
    }


    return (
        <View style={styles.container}>
            {alertVisible && (
                <View style={{ position: 'absolute', top: 250, width: '100%', zIndex: 100, alignSelf: 'center', justifyContent: 'center' }}>
                    <FadeOutAlert
                        message={alertmessage}
                        onHide={hideAlert}
                    />
                </View>
            )}
            <TextInput
                style={styles.input}
                placeholder="Search users"
                onChangeText={setSearchTerm}
                value={searchTerm}
            />
            <FlatList style={{ backgroundColor: bg_color }}
                data={users}
                onEndReached={() => { setPage(page + 1); }}
                scrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity activeOpacity={0.6} style={styles.search_result}>
                        <View style={styles.image_background}>
                            {item.profile_picture == null ? <Image style={styles.list_image} source={require('./images/defult.jpg')} /> : <Image style={styles.list_image} source={{ uri: API_HOST + '/' + item.profile_picture }} />}
                        </View>
                        <Text style={styles.list_name}>{item.username}</Text>
                        {item.already_added ? <View style={styles.plus_icon_holder}><Text style={styles.plus_icon}>✔</Text></View> : <>{item.is_requested ? <TouchableOpacity style={styles.plus_icon_holder} onPress={() => removetrainer(item.username)}><Text style={styles.plus_icon}>Requested</Text></TouchableOpacity> : <TouchableOpacity style={styles.plus_icon_holder} onPress={() => savetrainer(item.username)}><Text style={styles.plus_icon}>+</Text></TouchableOpacity>}</>}
                    </TouchableOpacity>}
            />
            {endmessge ? <Text style={styles.end_message}>{endmessge}</Text> : null}
        </View>
    );
};



export default AddTrainer;