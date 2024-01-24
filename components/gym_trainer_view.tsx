import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './theamcontext'
import { API_HOST } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Viewr_templet from './viewr_templet';
import FadeOutAlert from './fademessage';
import { concat, debounce, upperFirst } from 'lodash';
import Popover from 'react-native-popover-view';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

type ListOfWorkoutState = {
    [key: string]: { name: string; set: number; reps: number; }[];
};

const Gym_trainer = ({ route, navigation }: any) => {

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
    const [dateofmembership, setdateofmembership] = useState(route.params.paid_up_to)
    console.log(dateofmembership)

    const ref = React.useRef(false);
    const ref2 = React.useRef(false);
    // const [dateofmembership, setdateofmembership] = useState(route.params.end_date)
    const [date, setdate] = useState(new Date())
    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        const datafecth = async () => {
            fetch(`${API_HOST}/trainer_data/?gym=${route.params.gym_id}&user=${route.params.username}`, {
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
                        setsalery(data.data.salary.toString())
                        setdateofmembership(data.data.paid_up_to)
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
        },
        load_members_holder: {
            width: '100%',
            height: 50,
            backgroundColor: nav_primiry,
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
        load_members_text: {
            color: white,
            fontSize: 18,
            fontWeight: 'bold',
        },
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




    const [list_of_templates, set_list_of_templats] = useState<string[]>(['parmar'])
    // const [member_type, setmember_type] = useState(route.params.member_type)
    // const [membershipfees, setMembershipfees] = useState(route.params.userdata.Membership_cost)


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
                        const response = await fetch(`${API_HOST}/member_search/?q=${term}&page=1`, {
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



    const [salery, setsalery] = useState('')
    const Savememberpayment = async () => {
        if (salery.length == 0 || dateofmembership == 0) {
            setAlertmessage('Please fill all fields')
            showAlert();
            return
        }
        let token = await AsyncStorage.getItem('@token');
        fetch(`${API_HOST}/save_trainer_payment/?username=${route.params.username}&gym=${route.params.gym_id}&end_date=${dateofmembership}&amount=${salery}`, {
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
    const number_of_date = (date: number) => {
        let date1 = new Date(date)
        return date1.toLocaleDateString()
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
                <TouchableOpacity style={styles.load_members_holder} onPress={() => navigation.navigate('peginesionuser', { name: 'members_of_trainer', id: route.params.gym_id, })}><Text style={styles.load_members_text}>Members of Trainer</Text></TouchableOpacity>

                <View style={styles.user_info} >
                    {/* choice field for membership type */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Record Salary Payment</Text>

                    <TextInput style={styles.textinput} placeholder='Enter Membership fees' onChangeText={(value) => {
                        let number = Number(value)
                        if (typeof (number) == 'number') {
                            setsalery(value)
                        }
                    }} value={salery} keyboardType='numeric' />
                    {/* date of membership */}
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
                    <TouchableOpacity style={styles.button} onPress={() => { Savememberpayment() }}>
                        <Text style={{ color: nav_primiry, fontSize: 18, fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}


export default Gym_trainer