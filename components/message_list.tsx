import { View, Text, TextInput, Image, FlatList, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './theamcontext';
import { API_HOST } from '../config';

const Message_list = ({ navigation }: any) => {
    const [value, onChangeText] = React.useState('');
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

    const ref = React.useRef(true);
    const [orignaldata, setOrignaldata] = useState([
        { key: 'Devin', id: 1, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Jackson', id: 2, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'James', id: 3, last_message: 'hello', time: '12:00', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Joel', id: 4, last_message: 'hello', time: '12:00', unread: 5, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'John', id: 5, last_message: 'hello', time: '12:00', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Jillian', id: 6, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Jimmy', id: 7, last_message: 'hello', time: '12:00', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Julie', id: 8, last_message: 'hello', time: '12:00', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Devin2', id: 9, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Jackson2', id: 10, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
    ]);
    const [data, setData] = useState([
        { key: 'Devin', id: 1, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Jackson', id: 2, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'James', id: 3, last_message: 'hello', time: '12:00', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Joel', id: 4, last_message: 'hello', time: '12:00', unread: 5, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'John', id: 5, last_message: 'hello', time: '12:00', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Jillian', id: 6, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Jimmy', id: 7, last_message: 'hello', time: '12:00', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Julie', id: 8, last_message: 'hello', time: '12:00', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Devin2', id: 9, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
        { key: 'Jackson2', id: 10, last_message: 'hello', time: '12:00', unread: 1, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' },
    ]);

    useEffect(() => {

        // search
        if (value.length > 0) {
            setData(data.filter((item) => item.key.includes(value)))
        }
        else if (value.length == 0) {
            setData(orignaldata);
        }
    }, [value]);

    useEffect(() => {

        const datafetch = async () => {
            fetch(`${API_HOST}/message_list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }).then((response) => response.json())
                .then((json) => {
                    if (json.message && json.list.length > 0) {
                        setData(json.list);
                        setOrignaldata(json);
                    } else {
                        let list = [{ key: 'No Message', id: 1, last_message: '', time: '', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' }];
                        setData(list);
                        setOrignaldata(list);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    let list = [{ key: 'No Message', id: 1, last_message: '', time: '', unread: 0, profile_picture: 'https://reactnative.dev/img/tiny_logo.png' }];
                    setData(list);
                    setOrignaldata(list);

                })
        }
        datafetch();
    }, []);

    const styles = StyleSheet.create({
        message_holder: {
            width: '100%',
            height: 80,
            borderBottomColor: gray,
            borderBottomWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
        },
        image_holder: {
            width: 50,
            height: 50,
            borderRadius: 50,
            overflow: 'hidden',
        },
        image_profilepic: {
            width: '100%',
            height: '100%',
        },
        message_info: {
            width: '80%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingLeft: 10,
        },
        username: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        message_details: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        message_lite: {
            fontSize: 15,
            color: gray,
        },
        timedisply: {
            fontSize: 15,
            color: gray,
        },
        seatch_input: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            width: '90%',
            padding: 10,
            margin: 5,
            borderRadius: 5,
            alignSelf: 'center',
        },

    });
    return (
        <View>
            <TextInput
                style={styles.seatch_input}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder='Search'
            />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.message_holder} onPress={() => { navigation.navigate('message_view', { data: item }) }}>
                        <View style={styles.image_holder}><Image style={styles.image_profilepic} source={{ uri: item.profile_picture }} /></View>
                        <View style={styles.message_info}>
                            <Text style={styles.username}>{item.key}</Text>
                            <View style={styles.message_details}>
                                <Text style={styles.message_lite}>{item.last_message}</Text>
                                <Text style={styles.timedisply}>{item.time}</Text>
                            </View>
                        </View>
                        {item.unread > 0 ? <Text>{item.unread}</Text> : null}
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Message_list