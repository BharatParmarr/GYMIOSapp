import { View, Text, FlatList, Touchable, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { API_HOST } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './theamcontext';
import { set } from 'lodash';

const NotificationPage = ({ navigation }: any) => {

    const ref = React.useRef(true);
    const ref2 = React.useRef(true);
    const ref3 = React.useRef(true);
    const { themecolors, setThemecolor } = useContext(ThemeContext);
    const [nav_primiry, setnav_primiry] = useState(themecolors.nav_primiry);
    const [white, setwhite] = useState(themecolors.white);
    const [black, setblack] = useState(themecolors.black);
    const [gray, setgray] = useState(themecolors.gray);
    const [bg_color, setbg_color] = useState(themecolors.bg_color);
    const [data, setdata] = useState<{
        "created_at": string,
        "gym": number,
        "id": number,
        "is_approved": boolean,
        "is_rejected": boolean,
        "is_request": boolean,
        "paid": boolean,
        "paid_up_to": string,
        "salary": number,
        "total_paid": number,
        "user": number,
        'typeofnotification': string,
        'username': string,
        'profile_pic': string,

    }[]>([{ "created_at": "2024-01-14T12:50:55.554749+05:30", "gym": 4, "id": 3, "is_approved": false, "is_rejected": false, "is_request": true, "paid": false, "paid_up_to": "2024-01-18", "salary": 0, "total_paid": 0, "user": 8, 'typeofnotification': 'Wants you to be a trainer', 'username': 'loading', 'profile_pic': 'loading', }]);

    useEffect(() => {
        setnav_primiry(themecolors.nav_primiry);
        setwhite(themecolors.white);
        setblack(themecolors.black);
        setgray(themecolors.gray);
        setbg_color(themecolors.bg_color);
    }, [themecolors])

    const styles = StyleSheet.create({
        notification_list_item: {
            width: '100%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom: 4,
            paddingLeft: 10,
            flexDirection: 'row'
        }, notification_list_item_text_header: {
            fontSize: 20,
            color: black
        },
        notification_list_item_text: {
            fontSize: 20,
            color: gray
        },
        profile_picture: {
            width: 40,
            height: 40,
            borderRadius: 40,
            marginRight: 10
        },
        nameholder: {
            width: '70%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        button: {
            width: '10%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        },
        button_text: {
            fontSize: 20,
            color: black
        }

    })

    useEffect(() => {
        const functions = async () => {
            fetch(`${API_HOST}/notification`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                },
            }).then((res) => res.json()).then((data) => {
                console.log(data)
                for (let i = 0; i < data.data.length; i++) {
                    const element = data.data[i];
                    console.log(element)
                    if ('follower' in element) {
                        element['typeofnotification'] = 'Wants to follow you'
                    } else if ('salary' in element) {
                        element['typeofnotification'] = 'Wants you to be a trainer'
                    }
                    else if ('member_type' in element) {
                        element['typeofnotification'] = 'Invited you to be a member'
                    } else {
                        element['typeofnotification'] = 'false'
                    }

                }
                setdata(data.data)
            }).catch((err) => {
                console.log(err)
            })

        }
        functions()

    }, []);



    const accept = async (id: number, type: string) => {
        if (ref2.current) {
            ref2.current = false;
            return;
        }
        if (type == 'false') {
            return
        }
        if (type == 'Wants to follow you') {
            type = 'follow'
        } else if (type == 'Wants you to be a trainer') {
            type = 'trainer'
        }
        else if (type == 'Invited you to be a member') {
            type = 'member'
        }
        else {
            return
        }

        await fetch(`${API_HOST}/accept_request/?type=${type}&id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
            },
        }).then((res) => res.json()).then((data) => {
            console.log(data)

        }
        ).catch((err) => {
            console.log(err)
        })
    }
    const rejects = async (id: number, type: string) => {
        if (ref2.current) {
            ref2.current = false;
            return;
        }
        if (type == 'false') {
            return
        }
        if (type == 'Wants to follow you') {
            type = 'follow'
        } else if (type == 'Wants you to be a trainer') {
            type = 'trainer'
        } else if (type == 'Invited you to be a member') {
            type = 'member'
        }
        else {
            return
        }
        await fetch(`${API_HOST}/accept_request/?type=${type}&id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
            },
        }).then((res) => res.json()).then((data) => {
            console.log(data)
        }
        ).catch((err) => {
            console.log(err)
        })
    }
    const [imageLoadError, setImageLoadError] = useState<{ [key: number]: boolean }>({ 1: false });
    return (
        <FlatList
            style={{ flex: 1, width: '100%', marginBottom: 60 }}
            indicatorStyle={'white'}
            data={data}
            renderItem={({ item, index }) => (

                <View style={styles.notification_list_item}>

                    <Image
                        source={imageLoadError[item.id] ? require('./images/defult.jpg') : { uri: `${API_HOST}/${item.profile_pic}` }}
                        onError={() => setImageLoadError(prevState => ({ ...prevState, [item.id]: true }))}
                        style={styles.profile_picture}
                    />
                    <View style={styles.nameholder} >
                        <Text style={styles.notification_list_item_text_header}>{item.username} </Text>
                        <Text style={styles.notification_list_item_text}>{item.typeofnotification}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => accept(item.id, item.typeofnotification)}>
                        <Text style={styles.button_text}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => rejects(item.id, item.typeofnotification)}>
                        <Text style={styles.button_text}>Reject</Text>
                    </TouchableOpacity>
                </View>)}

        />
    )
}

// light
let nav_primiry = '#480cfe'
let white = '#ffffff'
let black = '#000000'
let gray = '#808080'
let bg_color = '#eaeaea'

let styles = StyleSheet.create({
    notification_list_item: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 4,
        paddingLeft: 10
    }, notification_list_item_text_header: {
        fontSize: 20,
        color: black
    },
    notification_list_item_text: {
        fontSize: 20,
        color: gray
    }
})

export default NotificationPage