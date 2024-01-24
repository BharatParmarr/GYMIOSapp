import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView, SectionList, RefreshControl, TextInput } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { API_HOST } from '../config'
import { Gym, ThemeContext, UserDetails } from './theamcontext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Gym_view = ({ route, navigation }: any) => {
    // const { gymdata } = route.params;
    const [gymdata, setgymdata] = useState(route.params.gymdata)
    if (!gymdata) {
        navigation.navigate('Management_tools');
    }
    const { Gymdetails, setGymdetails } = useContext(Gym);
    useEffect(() => {
        setgymdata(Gymdetails[route.params.index])
    }, [Gymdetails])




    const { themecolors, setThemecolor } = useContext(ThemeContext);
    const [nav_primiry, setnav_primiry] = useState(themecolors.nav_primiry);
    const [white, setwhite] = useState(themecolors.white);
    const [black, setblack] = useState(themecolors.black);
    const [gray, setgray] = useState(themecolors.gray);
    const [bg_color, setbg_color] = useState(themecolors.bg_color);
    const [is_admin, setIs_admin] = useState(false);
    const [is_member, setIs_member] = useState(false);
    const [is_trainer, setis_trainer] = useState(false);
    const [pagetrainer, setpagetrainer] = useState(1)
    const [Expenses, setExpenses] = useState([])

    const get_user_details = async () => {
        const response = await fetch(`${API_HOST}/gym_position/?gym=${gymdata.name}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
            },
        });
        const newData = await response.json();
        if (!newData.message) {
            navigation.navigate('profile');
        }
        else if (newData.is_trainer && newData.message && newData.is_admin) {
            setIs_admin(true);
            setis_trainer(true);
        } else if (newData.is_trainer && newData.message) {
            setis_trainer(true);
        } else if (newData.is_member && newData.message) {
            setIs_member(true);
        }
        else {
            navigation.navigate('profile');
        }
    }

    useEffect(() => {
        get_user_details();
    }, [])

    useEffect(() => {
        setnav_primiry(themecolors.nav_primiry);
        setwhite(themecolors.white);
        setblack(themecolors.black);
        setgray(themecolors.gray);
        setbg_color(themecolors.bg_color);
    }, [themecolors])

    let styles = StyleSheet.create({
        pageheading: {
            fontSize: 30,
            fontWeight: 'bold',
            color: black,
            textAlign: 'center',
            marginVertical: 10
        },
        gym_image: {
            width: '100%',
            height: 320,
            borderRadius: 4
        },
        gym_name: {
            fontSize: 20,
            fontWeight: 'bold',
            color: black,
            marginVertical: 10,
            textAlign: 'center'
        },
        gym_address: {
            fontSize: 15,
            color: gray,
            textAlign: 'left',
            marginVertical: 10,
        },
        gym_manager: {
            fontSize: 15,
            color: gray,
            textAlign: 'center'
        },
        gym_weblink: {
            fontSize: 15,
            color: gray,
            textAlign: 'center'
        },
        gym_zipcode: {
            fontSize: 15,
            color: gray,
            textAlign: 'center'
        },
        trainers_heading: {
            fontSize: 20,
            fontWeight: 'bold',
            color: black,
            marginVertical: 10,
            textAlign: 'center'
        },
        trainer_name: {
            fontSize: 15,
            color: black,
            textAlign: 'center',
            marginHorizontal: 10
        },
        trainer_list: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'flex-start',
            height: 60,
            borderWidth: 0.5,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            justifyContent: 'space-between',
        },
        trainer_image: {
            width: 50,
            height: 50,
            borderRadius: 50
        }, trainer_holder: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'flex-start',
        }, trainer_remove_button: {
            backgroundColor: white,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            marginHorizontal: 14
        }, trainer_request_button: {
            backgroundColor: gray,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            marginHorizontal: 14
        }
        , trainer_remove_button_text: {
            color: black
        },
        trainer_request_button_text: {
            color: white
        },
        add_button: {
            backgroundColor: white,
            color: white,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            marginHorizontal: 14,
            marginVertical: 10,
            shadowColor: black,
            shadowRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 0 },
            elevation: 4,
        }, add_button_text: {
            color: nav_primiry,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        load_more_holder: {
            marginBottom: 17,

        }, load_more_text: {
            color: black,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        container: {
            width: '100%',
            backgroundColor: bg_color,
            padding: 10,
        },
        gym_expenses_holder: {
            backgroundColor: white,
            borderRadius: 5,
            padding: 10,
            marginVertical: 10,
            shadowColor: black,
            shadowRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 0 },
            elevation: 4,
        },
        gym_expenses_heading: {
            fontSize: 20,
            fontWeight: 'bold',
            color: black,
            marginVertical: 10,
            textAlign: 'center'
        },
        gym_expenses_list: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'flex-start',
            height: 60,
            borderWidth: 0.5,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            justifyContent: 'space-between',
        },
        gym_expenses_name: {
            fontSize: 15,
            color: black,
            textAlign: 'center',
            marginHorizontal: 10
        },
        gym_expenses_amount: {
            fontSize: 15,
            color: black,
            textAlign: 'center',
            marginHorizontal: 10
        },
        gym_expenses_date: {
            fontSize: 15,
            color: black,
            textAlign: 'center',
            marginHorizontal: 10
        },
        add_expenses_holder: {
            backgroundColor: white,
            borderRadius: 5,
            padding: 10,
            marginVertical: 10,
            shadowColor: black,
            shadowRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 0 },
            elevation: 4,
        },
        add_expenses_button: {
            backgroundColor: white,
            color: white,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            marginHorizontal: 14,
            marginVertical: 10,
            shadowColor: gray,
            shadowRadius: 10,
            shadowOpacity: 0.2,

            elevation: 4,
        },
        input: {
            backgroundColor: bg_color,
            color: black,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            marginHorizontal: 14,
            marginVertical: 10,
            shadowColor: black,
            shadowRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 0 },
            elevation: 4,
        },
        add_expenses_button_text: {
            color: black,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        expenses_open_button: {
            backgroundColor: white,
            color: white,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            marginHorizontal: 14,
            marginVertical: 10,
            shadowColor: black,
            shadowRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 0 },
            elevation: 4,
        }


    })

    const remove_trainer = async (trainer_name: string) => {
        fetch(`${API_HOST}/gym/remove_trainer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
            },
            body: JSON.stringify({
                gym_id: gymdata._id,
                trainer_name: trainer_name
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                Alert.alert('Trainer removed successfully');
                navigation.navigate('Management_tools');
            } else {
                Alert.alert('Failed to remove trainer');
            }
        }).catch(err => {
            console.log(err);
            Alert.alert('Failed to remove trainer');
        })
    }

    const refrefresh = useRef(true);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        if (refrefresh.current) {
            refrefresh.current = false;
            return;
        }
        setRefreshing(true);

        const gymdata = async () => {
            let token = await AsyncStorage.getItem('@token');
            fetch(`${API_HOST}/add_gym`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },

            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    res.json().then((data) => {
                        console.log(data, 'data')
                        setGymdetails(data)
                        setRefreshing(false);
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        gymdata()

        return () => {
            setRefreshing(false);
        };

    }, [refreshing]);

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.container}
            nestedScrollEnabled={true}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            data={[1]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <View style={{ marginBottom: 66 }}>
                <Text style={styles.pageheading}>{gymdata.name}</Text>
                <Image style={styles.gym_image} source={{ uri: `${API_HOST}/${gymdata.image}` }} />
                <Text style={styles.gym_address}>{gymdata.address}</Text>
                <Text style={styles.trainers_heading}>Trainers:</Text>
                {is_admin ? <><FlatList
                    data={gymdata.trainers}
                    nestedScrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.trainer_list}>
                            <View style={styles.trainer_holder}>
                                {item.user.profile_picture ? <Image style={styles.trainer_image} source={{ uri: `${API_HOST}/${item.user.profile_picture}` }} /> : <Image style={styles.trainer_image} source={{ uri: `https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png` }} />}
                                <Text style={styles.trainer_name}>{item.user.username}</Text>
                            </View>
                            <TouchableOpacity style={styles.trainer_remove_button} onPress={() => navigation.navigate('Gym_trainer', { gym_id: gymdata.id, username: item.user.username, profile_picture: item.user.profile_picture, paid_up_to: item.paid_up_to })} >
                                <Text style={styles.trainer_remove_button_text}>View more</Text>
                            </TouchableOpacity>
                        </View>} />
                    {gymdata.trainers.length ? null : <View style={styles.trainer_list}><Text style={styles.trainer_name}>No trainers</Text></View>}
                    {gymdata.trainers.length / 10 < pagetrainer ? null : <TouchableOpacity style={styles.load_more_holder} onPress={() => navigation.navigate('peginesionuser', { name: 'trainers', id: gymdata.id })}><Text style={styles.load_more_text}>Load more...</Text></TouchableOpacity>}
                    <TouchableOpacity style={styles.add_button} onPress={() => navigation.navigate('AddTrainer', { trainers: gymdata.trainers, gymname: gymdata.id })}><Text style={styles.add_button_text}>Add trainer + </Text></TouchableOpacity>
                </> : null}
                {is_trainer ? <>
                    {gymdata.members.length ? <FlatList
                        data={gymdata.members}
                        nestedScrollEnabled={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <View style={styles.trainer_holder}>
                            <View style={styles.trainer_holder}>
                                {item.user.profile_picture ? <Image style={styles.trainer_image} source={{ uri: `${API_HOST}/${item.user.profile_picture}` }} /> : <Image style={styles.trainer_image} source={{ uri: `https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png` }} />}
                                <Text style={styles.trainer_name}>{item.username}</Text>
                            </View>
                            <TouchableOpacity style={styles.trainer_remove_button} onPress={() => navigation.navigate('Gym_member', { gym_id: gymdata.id, username: item.username, profile_picture: item.profile_picture, end_date: item.end_date, member_type: item.member_type, userdata: item })} >
                                <Text style={styles.trainer_remove_button_text}>View more</Text>
                            </TouchableOpacity>
                        </View>}
                    /> : <View style={styles.trainer_list}><Text style={styles.trainer_name}>No members</Text></View>}
                    {gymdata.members.length ? null : <View style={styles.trainer_list}><Text style={styles.trainer_name}>No trainers</Text></View>}
                    {gymdata.members.length / 10 < pagetrainer ? null : <TouchableOpacity style={styles.load_more_holder} onPress={() => navigation.navigate('peginesionuser', { name: 'members', id: gymdata.id })}><Text style={styles.load_more_text}>Load more...</Text></TouchableOpacity>}
                    <TouchableOpacity style={styles.add_button} onPress={() => navigation.navigate('AddMember', { trainers: gymdata.members, gymname: gymdata.id })}><Text style={styles.add_button_text}>Add Member +</Text></TouchableOpacity></> : null}
                <View style={styles.gym_expenses_holder}>
                    <View style={styles.add_expenses_holder}>
                        <Text style={styles.gym_expenses_heading}>Expenses</Text>
                        <TextInput style={styles.input} placeholder='Enter expenses' placeholderTextColor={gray} />
                        <TextInput style={styles.input} placeholder='Enter amount' placeholderTextColor={gray} />
                        <TouchableOpacity style={styles.add_expenses_button} onPress={() => { }}>
                            <Text style={styles.add_expenses_button_text}>Add Expenses</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.expenses_open_button} onPress={() => navigation.navigate('Expences_peginator', { gym_id: gymdata.id })}>
                        <Text style={styles.gym_expenses_heading}>Expenses</Text>
                    </TouchableOpacity>
                </View></View>}
        />
    )
}

export default Gym_view