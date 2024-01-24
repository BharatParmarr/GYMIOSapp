import { View, Text, StyleSheet, ScrollView, Touchable, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './theamcontext';
import { API_HOST } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'lodash';
import FadeOutAlert from './fademessage';
import Popover from 'react-native-popover-view';

const Expences_peginator = ({ route, navigation }: any) => {
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

    const [expances, setexpances] = useState([{ id: 1, expense: 'loading', amount: 0.0 }]);
    const [page, setPage] = useState(1);
    const ref = React.useRef(true);
    const [scrolling, setScrolling] = useState(true);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertmessage, setAlertmessage] = useState(' ');
    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        const get_expances = async () => {
            fetch(`${API_HOST}/gym_expances/?gym=${route.params.gym_id}&page=${page}`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                    },
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message == 'No more data') {
                        setAlertmessage('No more data')
                        showAlert();
                    } else if (json.message == false) {
                        setAlertmessage('Please try again later')
                        showAlert();
                    }
                    else if (json.message == true) {
                        console.log(json.data)
                        setexpances(json.data)
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => console.log('done'))
        }
        get_expances();
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current = false;
            return;
        }
        const get_expances = async () => {
            fetch(`${API_HOST}/gym_expances/?gym=${route.params.gym_id}&page=${page}`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                    },
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message == 'No more data') {
                        setAlertmessage('No more data')
                        showAlert();
                    } else if (json.message == false) {
                        setAlertmessage('Please try again later')
                        showAlert();
                    }
                    else if (json.message == true) {
                        if (json.data.length == 0) {
                            setAlertmessage('No more data')
                            showAlert();
                            setScrolling(false)
                        }
                        setexpances([...expances, ...json.data])
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => console.log('done'))
        }
        get_expances();
    }, [page]);

    const update_expances = async ({ id, expense, amount }: any) => {
        fetch(`${API_HOST}/gym_expances/`,
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                },
                body: JSON.stringify({
                    'id': id,
                    'expense': expense,
                    'amount': amount,
                    'gym': route.params.gym_id,
                }),
            }).then((response) => response.json())
            .then((json) => {
                if (json.message == false) {
                    setAlertmessage('Please try again later')
                    showAlert();
                } else if (json.message == true) {
                    setAlertmessage('Updated Successfully')
                    showAlert();
                }
            })
    }
    let styles = StyleSheet.create({
        expances_peginator: {
            backgroundColor: bg_color,
            padding: 10,
            borderRadius: 10,
            margin: 10,
            marginBottom: 0,
        },
        expances_peginator_item: {
            backgroundColor: white,
            padding: 7,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            margin: 10,
            marginBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            elevation: 5,
        },
        expances_peginator_index: {
            color: gray,
            fontSize: 20,
            fontWeight: 'bold',
        },
        expances_peginator_text: {
            color: black,
            fontSize: 20,
            fontWeight: 'bold',
        },
        expances_peginator_amount: {
            color: black,
            fontSize: 20,
            fontWeight: 'bold',
        },
        expance_created_by: {
            color: gray,
            fontSize: 11,
            fontWeight: 'bold',
            paddingLeft: 10,
        },
        expances_name_header: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
    })
    return (
        <View>
            {alertVisible && (
                <View style={{ position: 'absolute', top: 250, width: '100%', zIndex: 100, alignSelf: 'center', justifyContent: 'center' }}>
                    <FadeOutAlert
                        message={alertmessage}
                        onHide={hideAlert}
                    />
                </View>
            )}
            <ScrollView scrollEnabled={scrolling} onScrollEndDrag={() => { setPage(page + 1) }} contentContainerStyle={styles.expances_peginator}>
                {expances.map((item: any, index: any) => {
                    return (<View key={index} style={styles.expances_peginator_item}>
                        <Text style={styles.expances_peginator_index}>{index + 1}</Text>
                        <View style={styles.expances_name_header}>
                            <Text style={styles.expances_peginator_text}>{item.expense}</Text>
                            <Text style={styles.expance_created_by}>{item.user}</Text>
                        </View>
                        <Text style={styles.expances_peginator_amount}>{item.amount}</Text>
                        {/* <TouchableOpacity onPress={() => { navigation.navigate('Edit_expances', { item: item }) }}>
                            <Text style={{ color: nav_primiry, fontSize: 20, fontWeight: 'bold' }}>Edit</Text>
                        </TouchableOpacity> */}
                        <Popover
                            arrowSize={{ width: 0, height: 0 }}
                            popoverStyle={{ width: 450, height: 550, backgroundColor: 'transparent', }}
                            from={(
                                <TouchableOpacity onPress={() => { navigation.navigate('Edit_expances', { item: item }) }}>
                                    <Text style={{ color: nav_primiry, fontSize: 16, fontWeight: 'bold' }}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        >
                            <View style={{
                                backgroundColor: white,
                                width: 400,
                                borderRadius: 17,
                                padding: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignSelf: 'center',
                                paddingBottom: 40,
                                paddingTop: 40,
                            }}>
                                <TextInput style={{
                                    backgroundColor: bg_color,
                                    padding: 10,
                                    borderRadius: 10,
                                    margin: 10,
                                    marginBottom: 0,
                                    width: '80%',
                                    height: 50,
                                    alignSelf: 'center',
                                }} placeholder='Expense' value={item.expense}
                                    onChangeText={
                                        (text) => {
                                            let temp = JSON.parse(JSON.stringify(expances));
                                            temp[index].expense = text;
                                            setexpances(temp);
                                        }
                                    }
                                />
                                <TextInput style={{
                                    backgroundColor: bg_color,
                                    padding: 10,
                                    borderRadius: 10,
                                    margin: 10,
                                    marginBottom: 0,
                                    width: '80%',
                                    height: 50,
                                    alignSelf: 'center',
                                }} placeholder='Amount' value={`${item.amount}`} onChangeText={
                                    (text) => {
                                        let temp = JSON.parse(JSON.stringify(expances));
                                        temp[index].amount = Number(text);
                                        setexpances(temp);
                                    }
                                } />
                                <TouchableOpacity style={{
                                    backgroundColor: nav_primiry,
                                    padding: 10,
                                    borderRadius: 10,
                                    margin: 10,
                                    marginBottom: 0,
                                    width: '80%',
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                    marginLeft: 0,
                                    marginRight: 0,
                                }}
                                    onPress={() => { update_expances({ id: item.id, expense: item.expense, amount: item.amount }) }}
                                >
                                    <Text style={{ color: white }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </Popover>
                    </View>)
                })}
            </ScrollView>
        </View>
    )
}

export default Expences_peginator