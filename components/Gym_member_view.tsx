import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './theamcontext'
import { API_HOST } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Viewr_templet from './viewr_templet';
import FadeOutAlert from './fademessage';
import { debounce, set, upperFirst } from 'lodash';
import Popover from 'react-native-popover-view';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

type ListOfWorkoutState = {
    [key: string]: { name: string; set: number; reps: number; }[];
};

const Gym_member = ({ route, navigation }: any) => {

    const [name, setname] = useState(route.params.username)
    const [profile_picture, setprofile_picture] = useState(route.params.profile_picture)
    const [exerciseobj, setExerciseobj] = useState([{ '1': { id: '1', name: 'Loading', } }])
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertmessage, setAlertmessage] = useState(' ');
    const [templates, setTemplates] = useState([{ name: 'loading' }])
    const [searchTerm, setsearchterm] = useState('')
    const [page, setPage] = useState(1);
    const [endmessge, setendmessge] = useState('');
    const [scrollEffect, setScrollEffect] = useState(true);
    const ref = React.useRef(false);
    const ref2 = React.useRef(false);
    const [dateofmembership, setdateofmembership] = useState(route.params.end_date)
    const [date, setdate] = useState(new Date())
    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        const datafecth = async () => {
            fetch(`${API_HOST}/member_detail/?gym=${route.params.gym_id}&user=${route.params.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + (await AsyncStorage.getItem('@token')),
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.message) {
                        setExerciseobj(data.asign_template)
                    }
                })
        }
        datafecth()
    }, [])

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
    let styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: white,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        details_container: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        profile_picture: {
            width: 150,
            height: 150,
            borderRadius: 100,
        },
        name: {
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 20,
        },
        exersice_container: {
            marginTop: 20,
            width: '100%',
            backgroundColor: gray,
            borderRadius: 20,
        },
        list_of_template: {
            width: '100%',
            height: 50,
            backgroundColor: white,
            borderRadius: 20,
            marginTop: 10,
            paddingLeft: 20,
            justifyContent: 'center',
        },
        user_info: {
            width: '92%',
            backgroundColor: white,
            borderRadius: 11,
            marginTop: 20,
            padding: 20,
            shadowColor: black,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        button: {
            backgroundColor: white,
            width: '100%',
            height: 48,
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
            borderWidth: 1,
            borderColor: `${gray}${40}`,
            shadowColor: `${black}${90}`,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.75,
            shadowRadius: 1,
            elevation: 12,
            overflow: 'hidden',
        },
        textinput: {
            width: '100%',
            height: 50,
            backgroundColor: white,
            borderRadius: 7,
            paddingLeft: 11,
            marginTop: 20,
            borderWidth: 1,
        }
    })

    const assign_to = async (index: number, name_of_template: String, username: string) => {
        let token = await AsyncStorage.getItem('@token');
        // let username = await AsyncStorage.getItem('@username');
        fetch(`${API_HOST}/asign_template/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                asignTo: username,
                template_name: name_of_template,
            }),

        })
            .then((response) => response.json())
            .then((json) => {

                if (json['message'] == true) {
                    // Alert.alert('Asigned');
                    setAlertmessage('Asigned')
                    showAlert();


                } else {
                    setAlertmessage('Something went wrong')
                    showAlert();

                }
            })
    }

    const [list_of_workout_state, set_list_of_workout_state] = useState<{
        'name': String,
        'exercises1': {
            [key: string]: { name: string; set: number; reps: number; }

        }[]
    }[]>([{
        'name': 'loading',
        'exercises1': [{
            '1': {
                'name': 'loading',
                'set': 0,
                'reps': 0,
            }
        }]
    }])




    const [list_of_templates, set_list_of_templats] = useState<string[]>([name])
    const [member_type, setmember_type] = useState(route.params.member_type)
    const [membershipfees, setMembershipfees] = useState(route.params.userdata.Membership_cost)


    useEffect(() => {
        const find_user = async (username: string) => {
            if (ref.current) {
                ref.current = false;
                return;
            }
            setExerciseobj([]);
            setScrollEffect(true);
            setPage(1);
            setendmessge('');


            if (searchTerm.length > 0) {
                const searchUsers = debounce(async (term) => {
                    try {
                        const response = await fetch(`${API_HOST}/template_search/?q=${term}&page=1`, {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                            }
                        });
                        const json = await response.json();
                        console.log(json, 'json');

                        if (Array.isArray(json)) {
                            console.log(json[0]['exercises1']);
                            set_list_of_workout_state(json);
                        } else if (json.message == "No more users") {
                            setScrollEffect(false);
                            setendmessge(json.message);
                            return
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }, 700);
                searchUsers(searchTerm);
            } else {
                setExerciseobj([]);
            }
        }
        find_user(searchTerm);
    }, [searchTerm])


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
                    const response = await fetch(`${API_HOST}/template_search/?q=${term}&page=${page + 1}`, {
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
                        set_list_of_workout_state([...exerciseobj, ...json]);
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
            }, 1000);
            searchUsers(searchTerm);
        }
    }, [page])

    const [show, setShow] = useState(false);
    const openpickerdate = () => {
        setdate(new Date())
        setShow(true)
    }

    const number_of_date = (date: number) => {
        let date1 = new Date(date)
        return date1.toLocaleDateString()
    }

    const SaveMembershipdate = async () => {
        let token = await AsyncStorage.getItem('@token');
        fetch(`${API_HOST}/membership_date/?username=${route.params.username}&gym=${route.params.gym_id}&end_date=${dateofmembership}&type=${member_type}&fees=${membershipfees}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },

        })
            .then((response) => response.json())
            .then((json) => {

                if (json['message'] == true) {
                    // Alert.alert('Asigned');
                    setAlertmessage('Date Updated')
                    showAlert();
                }
                else {
                    setAlertmessage('Something went wrong')
                    showAlert();
                }
            })
    }
    const Savememberpayment = async () => {
        let token = await AsyncStorage.getItem('@token');
        fetch(`${API_HOST}/membership_date/?username=${route.params.username}&gym=${route.params.gym_id}&end_date=${dateofmembership}&fees=${membershipfees}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },

        })
            .then((response) => response.json())
            .then((json) => {

                if (json['message'] == true) {
                    // Alert.alert('Asigned');
                    setAlertmessage('Date Updated')
                    showAlert();
                }
                else {
                    setAlertmessage('Something went wrong')
                    showAlert();
                }
            })
    }

    const Deletmemberpayment = async () => {
        const Deletmember = async () => {
            let token = await AsyncStorage.getItem('@token');
            fetch(`${API_HOST}/membership_date/?username=${route.params.username}&gym=${route.params.gym_id}&end_date=${dateofmembership}&fees=${membershipfees}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },

            })
                .then((response) => response.json())
                .then((json) => {

                    if (json['message'] == true) {
                        // Alert.alert('Asigned');
                        setAlertmessage('User Deleted')
                        showAlert();
                        setTimeout(() => {
                            navigation.navigate('App')
                        })
                    }
                    else {
                        setAlertmessage('Something went wrong')
                        showAlert();
                    }
                })
        }
        Alert.alert(
            "Delete User",
            "Are you sure you want to reomve this member ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                    isPreferred: true,
                },
                { text: "Remove", onPress: () => Deletmember(), style: 'destructive' }
            ]

        )
    }

    return (
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            backgroundColor: bg_color,
            alignItems: 'center',
            padding: 10,
        }} >
            {alertVisible && (
                <View style={{ position: 'absolute', top: 250, width: '100%', zIndex: 100, alignSelf: 'center', justifyContent: 'center' }}>
                    <FadeOutAlert
                        message={alertmessage}
                        onHide={hideAlert}
                    />
                </View>
            )}
            <View style={styles.details_container}>
                <Text style={styles.name}>{name}</Text>
                <Image source={{ uri: `${API_HOST}/${profile_picture}` }} style={styles.profile_picture} />
                <ScrollView nestedScrollEnabled={true} style={styles.exersice_container}>
                    <TextInput placeholder='Search template' style={{ width: '100%', height: 50, backgroundColor: white, borderRadius: 7, paddingLeft: 20 }}
                        onChangeText={(text) => setsearchterm(text)} value={searchTerm}
                    />
                    {list_of_workout_state[0]['name'] == 'loading' ? <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center', color: white }}>Search template to asign</Text> :
                        <>{list_of_workout_state && list_of_workout_state.map((element, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'column', alignItems: 'center', marginTop: 0, marginBottom: 0, backgroundColor: white, width: '100%', borderRadius: 0, borderTopWidth: 1 }}>
                                    <Text style={{ fontSize: 14, color: black }}>{element.name}</Text>
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', padding: 10, alignItems: 'center' }}>
                                        <View style={{ width: '99%', padding: 10, flexDirection: 'row' }}>
                                            <Popover
                                                arrowSize={{ width: 0, height: 0 }}
                                                popoverStyle={{ width: 450, height: 550 }}
                                                from={(
                                                    <TouchableOpacity style={{
                                                        backgroundColor: white,
                                                        padding: 10,
                                                        borderRadius: 5,
                                                        marginLeft: 10,
                                                        shadowColor: black,
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 2,
                                                        },
                                                        shadowOpacity: 0.25,
                                                        shadowRadius: 3.84,
                                                        elevation: 5,
                                                        width: '40%',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={{ color: black }}>View</Text>
                                                    </TouchableOpacity>
                                                )}
                                            >
                                                <View style={{
                                                    width: '100%',
                                                    backgroundColor: white,
                                                    shadowColor: black,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 3.84,
                                                    elevation: 5,
                                                    padding: 10,
                                                }}>
                                                    <Viewr_templet list_of_workout={element.exercises1 as unknown as ListOfWorkoutState} />
                                                </View>
                                            </Popover>
                                            <Popover
                                                arrowSize={{ width: 0, height: 0 }}
                                                popoverStyle={{ width: 450 }}
                                                from={(
                                                    <TouchableOpacity style={{
                                                        backgroundColor: white,
                                                        padding: 10,
                                                        borderRadius: 5,
                                                        marginLeft: 10,
                                                        shadowColor: black,
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 2,
                                                        },
                                                        shadowOpacity: 0.25,
                                                        shadowRadius: 3.84,
                                                        elevation: 5,
                                                        width: '40%',
                                                        alignItems: 'center'

                                                    }}>

                                                        <Text style={{ color: black }}>Assign</Text>
                                                    </TouchableOpacity>
                                                )}
                                            >
                                                <View style={{
                                                    width: '100%',
                                                    backgroundColor: white,
                                                    shadowColor: black,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 3.84,
                                                    elevation: 5,
                                                    padding: 10,
                                                }}>
                                                    <FlatList data={list_of_templates} renderItem={({ item, index }) => {
                                                        return (
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 10 }}>
                                                                <TouchableOpacity style={{
                                                                    backgroundColor: white,
                                                                    padding: 10,
                                                                    borderRadius: 5,
                                                                    marginLeft: 10,
                                                                    shadowColor: black,
                                                                    shadowOffset: {
                                                                        width: 0,
                                                                        height: 2,
                                                                    },
                                                                    shadowOpacity: 0.25,
                                                                    shadowRadius: 3.84,
                                                                    elevation: 5,
                                                                    width: '40%',
                                                                    alignItems: 'center'
                                                                }} onPress={() => { assign_to(index, element.name, item) }}>
                                                                    <Text style={{ fontSize: 14, color: black }}>Assign to </Text><Text style={{ fontSize: 14, color: black }}>{item}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    }} />
                                                </View>
                                            </Popover>
                                        </View>
                                    </View>
                                </View>)
                        })}</>}
                </ScrollView>
                <View style={styles.user_info} >
                    {/* coice field for membership type */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Membership Type</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>{upperFirst(member_type)}</Text>
                    <Picker
                        mode='dropdown'
                        selectedValue={member_type}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => {
                            console.log(itemValue)
                            setmember_type(itemValue)
                        }}
                    >
                        <Picker.Item label="Basic" value="basic" />
                        <Picker.Item label="Premium" value="premium" />
                    </Picker>
                    {member_type == 'premium' && <TextInput style={{}} placeholder='Membership fees' onChangeText={(value) => {
                        let number = (value)
                        if (typeof (number) == 'number') {
                            setMembershipfees(value)
                        }
                    }} />}
                    {/* date of membership */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>{number_of_date(dateofmembership)}</Text>
                    {show &&
                        <RNDateTimePicker
                            mode='date'
                            value={(dateofmembership) ? new Date(dateofmembership) : new Date()}
                            minimumDate={date}
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setdateofmembership(selectedDate.getTime());
                                    setShow(false);
                                }
                            }}
                            onTouchCancel={() => setShow(false)}
                        />}
                    <TouchableOpacity style={styles.button} onPress={() => { openpickerdate() }}>
                        <Text style={{ color: black }}>Change Membership Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { SaveMembershipdate() }}>
                        <Text style={{ color: nav_primiry, fontWeight: '900' }}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.user_info} >
                    {/* coice field for membership type */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Record Fees Payment</Text>

                    <TextInput style={styles.textinput} placeholder='Enter Membership fees' onChangeText={(value) => {
                        let number = Number(value)
                        if (typeof (number) == 'number') {
                            setMembershipfees(value)
                        }
                    }} />
                    {/* date of membership */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center', color: black }}>Extend Membership up to</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center', color: black }}>{number_of_date(dateofmembership)}</Text>
                    {show &&
                        <RNDateTimePicker
                            mode='date'
                            value={(dateofmembership) ? new Date(dateofmembership) : new Date()}
                            minimumDate={date}
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setdateofmembership(selectedDate.getTime());
                                    setShow(false);
                                }
                            }}
                            onTouchCancel={() => setShow(false)}
                        />}
                    <TouchableOpacity style={styles.button} onPress={() => { openpickerdate() }}>
                        <Text style={{ color: black, fontSize: 15 }}>Extend Membership Date🗓️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { SaveMembershipdate() }}>
                        <Text style={{ color: nav_primiry, fontSize: 18, fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>
                    {/* delet user */}

                </View>
                <TouchableOpacity style={styles.button} onPress={() => { Deletmemberpayment() }}>
                    <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>Remove Member</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Gym_member