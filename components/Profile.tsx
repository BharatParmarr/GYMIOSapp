import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_HOST } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gym, ThemeContext } from './theamcontext';
import { set } from 'lodash';


const GymInfoCard = ({ navigation }: any) => {
    const [gym, setGym] = useState([{ 'name': 'Loading...', 'address': '.', 'image': '/media/gym_images/image.jpeg' }]);


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
    const styles = StyleSheet.create({
        cardHolder: {
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: bg_color,
            marginTop: 20,
            borderRadius: 10,
            overflow: 'hidden',
        },
        gymInfoCard: {
            width: '90%',
            height: 400,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: white,
            borderRadius: 7,
            overflow: 'hidden',
            marginTop: 20,
            marginBottom: 20,
            shadowColor: black,
            shadowOpacity: 0.5,
            shadowRadius: 10,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            elevation: 10,
            padding: 15,
        },
        cardImage: {
            width: '100%',
            height: '60%',
            resizeMode: 'cover',
            borderTopRightRadius: 7,
            borderTopLeftRadius: 7,
        },
        cardHeader: {
            width: '100%',
            height: '10%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardHeaderText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: nav_primiry,
        },
        cardBody: {
            width: '100%',
            height: '30%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardbodyText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: gray,
        }, cardbodyButton: {
            width: '100%',

            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }, view_more: {
            fontSize: 16,
            fontWeight: 'bold',
            color: black,

        }
    });


    const refcontext = useRef(true);
    const { Gymdetails, setGymdetails } = useContext(Gym);
    useEffect(() => {
        if (refcontext.current) {
            refcontext.current = false;
            return;
        }
        setGym(Gymdetails)
    }, [Gymdetails])

    useEffect(() => {
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
                        setGym(data)
                        setGymdetails(data)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        gymdata()
    }, [])

    return (
        <View style={styles.cardHolder}>
            {gym.map((item: any, index: any) => {
                return <View style={styles.gymInfoCard} key={index}>
                    <Image source={{ uri: `${API_HOST}/${item.image}` }} style={styles.cardImage} />
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{item.name}</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardbodyText}>{item.address}</Text>
                        <Text style={styles.cardbodyText}>{item.manager_name}</Text>
                        <TouchableOpacity style={styles.cardbodyButton} onPress={() => { navigation.navigate('Gym_view', { gymdata: item, index: index }) }}><Text style={styles.view_more}>View more</Text></TouchableOpacity>
                    </View>
                </View>
            }
            )}
            {/* trainer info card */}
            <View style={styles.gymInfoCard}>
                <Image source={{ uri: 'https://picsum.photos/900/900' }} style={styles.cardImage} />
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>Trainer Name</Text>
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.cardbodyText}>Trainer info</Text>
                </View>
            </View>
        </View>
    );
};

const WorkoutListHolder = () => {
    const [expand, setExpand] = useState(false);
    const [day, setDay] = useState('Monday');

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

    const styles = StyleSheet.create({
        weekdays: {
            width: '93%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: white,
            marginTop: 20,
            borderRadius: 7,
            shadowColor: black,
            shadowOpacity: 0.5,
            shadowRadius: 10,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            elevation: 10,
        },
        picker: {
            width: '100%',
            height: 50,
            color: black,
        },
        picker_text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: white,
        },
        table_heading_row: {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            padding: 5,
            margin: 5,
            width: '94%',
            alignSelf: 'center',
            height: 85,
        },
        table_row: {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            padding: 3,
            margin: 3,
            display: 'flex',
            width: '94%',
            height: 85,
            borderTopColor: black,
            borderTopWidth: 1,
            alignSelf: 'center',
            color: black,
        },
        table_header: {
            fontSize: 16,
            fontWeight: 'bold',
            color: black,
        },
        text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: black,
        }, workoutListHolder: {
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: bg_color,
            marginTop: 20,
            borderRadius: 10,
            overflow: 'hidden',
        },
        table_text: {
            fontSize: 15,
            fontWeight: 'bold',
            color: black,
            width: '30%',
        },
        table_button: {
            width: '10%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: nav_primiry,
            borderRadius: 5,
        },
        table_button_text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: white,
        },
        workoutImage: {
            width: 50,
            height: 50,
            resizeMode: 'cover',
        },
    });




    type ExerciseAssign = {
        [key: string]: (string | number)[][];
    };

    let exersize_asign: ExerciseAssign = {
        'Monday': [['Barbell Bench Press', '1X12', 2], ['Barbell Squat', '3X15', 1], ['Barbell Deadlift', '3X12', 1], ['Barbell Bench Press', '2X12', 2], ['Barbell Squat', '3X15', 1], ['Barbell Deadlift', '3X12', 1]],
        'Tuesday': [['Barbell Bench Press', '2X12', 2], ['Barbell Squat', '3X15', 1], ['Barbell Deadlift', '3X12', 1]],
        'Wednesday': [['Barbell Bench Press', '3X12', 2], ['Barbell Squat', '3X15', 1], ['Barbell Deadlift', '3X12', 1]],
        'Thursday': [['Barbell Bench Press', '4X2', 2], ['Barbell Squat', '3X15', 1], ['Barbell Deadlift', '3X12', 1]],
        'Friday': [['Barbell Bench Press', '5X12', 2], ['Barbell Squat', '3X15', 1], ['Barbell Deadlift', '3X12', 1]],
        'Saturday': [['Barbell Bench Press', '6X12', 2], ['Barbell Squat', '3X15', 1], ['Barbell Deadlift', '3X12', 1]],
        'Sunday': [['Barbell Bench Press', '7X12', 2], ['Barbell Squat', '3X15', 1], ['Barbell Deadlift', '3X12', 1]]
    }
    function expandTd(days: string) {
        setExpand(!expand);
        setDay(days);
    }

    return (
        <View style={styles.workoutListHolder}>
            {/* weekdays */}
            <View style={styles.weekdays}>
                <Picker style={styles.picker} onValueChange={(value) => expandTd(value)} selectedValue={day} dropdownIconColor={black} dropdownIconRippleColor={nav_primiry} mode='dropdown'>
                    <Picker.Item style={styles.picker_text} label="Monday" value="Monday" />
                    <Picker.Item style={styles.picker_text} label="Tuesday" value="Tuesday" />
                    <Picker.Item style={styles.picker_text} label="Wednesday" value="Wednesday" />
                    <Picker.Item style={styles.picker_text} label="Thursday" value="Thursday" />
                    <Picker.Item style={styles.picker_text} label="Friday" value="Friday" />
                    <Picker.Item style={styles.picker_text} label="Saturday" value="Saturday" />
                    <Picker.Item style={styles.picker_text} label="Sunday" value="Sunday" />
                </Picker>
                {/* table */}
                <View style={styles.table_heading_row} >
                    <Text style={styles.table_header}>{day}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                </View>
                {exersize_asign[day].map((item: any, index: any) => {
                    return (
                        <View style={styles.table_row} key={index}>
                            <Image source={{ uri: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDB6ODc0YXZkamRldTJwZjV2ams5YjdvMHZmeTdqcGdwZ3R3cTQ1NiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/pZmvro30EFCKyoz7Rs/200.webp' }} style={styles.workoutImage} />
                            <Text style={styles.table_text} >{item[0]}</Text>
                            <Text style={styles.table_text}>{item[1]}</Text>
                            <TouchableOpacity style={styles.table_button} onPress={() => { }} ><Text style={styles.table_button_text} >+</Text></TouchableOpacity>
                        </View>
                    );
                })}
            </View>
            {/* weekdays */}

        </View>
    );
};

const WorkoutListBox = () => {
    const [expand, setExpand] = React.useState(false);
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

    const styles = StyleSheet.create({
        workoutListBox: {
            width: '100%',
            height: 200,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: white,
            marginTop: 20,
            borderRadius: 10,
            overflow: 'hidden',
        }, weekdays: {
            width: '93%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: white,
            marginTop: 20,
            borderRadius: 7,
            shadowColor: black,
            shadowOpacity: 0.5,
            shadowRadius: 10,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            elevation: 10,
        },
    });

    function expandTd() {
        setExpand(!expand);
    }
    return (
        <View style={styles.workoutListBox}>
            <Picker onValueChange={() => expandTd()} selectedValue="Monday">
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
            <View style={styles.weekdays}>
                <View></View>
            </View>
        </View>
    );
};

const Tracking = () => {
    const [infoVisible, setInfoVisible] = useState(Array(52).fill(false));
    const [infoVisible2, setInfoVisible2] = useState(Array(7).fill(false));
    const [info, setInfo] = useState(0);

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

    const styles = StyleSheet.create({
        text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: black,
        },
        tracking: {
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: white,
            marginTop: 20,
            borderRadius: 4,
            overflow: 'hidden',
            padding: 4,
        },
        graph: {
            height: 260,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: white,
            borderRadius: 10,
            overflow: 'hidden',
            shadowColor: black,
            shadowOpacity: 0.5,
            shadowRadius: 10,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            elevation: 10,
        }, days_squar_holder: {
            width: '90%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        }, months: {
            width: '100%',
            height: '28%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        days: {
            width: '10%',
            height: '72%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative',
        },
        squares: {
            width: '100%',
            height: '72%',
            alignItems: 'center',
            margin: 3,
            padding: 3,
            position: 'relative',
            marginLeft: 45,
            justifyContent: 'flex-start',
            marginRight: 60,
        },
    });


    const showInfo = (index: number, row: number) => {
        let newInfoVisible = [...infoVisible];
        let newInfoVisible2 = [...infoVisible2];
        newInfoVisible[index] = true;
        setInfoVisible(newInfoVisible);
        newInfoVisible2[row] = true;
        setInfoVisible2(newInfoVisible2);
        setInfo(index);
    };

    const closeInfo = () => {
        setInfoVisible(Array(52).fill(false));
        setInfoVisible2(Array(7).fill(false));
    };

    return (
        <View style={styles.tracking}>
            <View style={styles.graph}>
                <ScrollView contentContainerStyle={styles.graph} horizontal={true} nestedScrollEnabled={true} >
                    <View style={styles.days}>
                        <Text style={styles.text}>Sun</Text>
                        <Text style={styles.text}>Mon</Text>
                        <Text style={styles.text}>Tue</Text>
                        <Text style={styles.text}>Wed</Text>
                        <Text style={styles.text}>Thu</Text>
                        <Text style={styles.text}>Fri</Text>
                        <Text style={styles.text}>Sat</Text>
                    </View>

                    <View style={styles.days_squar_holder}>
                        <View style={styles.months}>
                            <Text style={styles.text}>Jan</Text>
                            <Text style={styles.text}>Feb</Text>
                            <Text style={styles.text}>Mar</Text>
                            <Text style={styles.text}>Apr</Text>
                            <Text style={styles.text}>May</Text>
                            <Text style={styles.text}>Jun</Text>
                            <Text style={styles.text}>Jul</Text>
                            <Text style={styles.text}>Aug</Text>
                            <Text style={styles.text}>Sep</Text>
                            <Text style={styles.text}>Oct</Text>
                            <Text style={styles.text}>Nov</Text>
                            <Text style={styles.text}>Dec</Text>
                        </View>

                        <View style={styles.squares}>

                            {/* added via javascript */}
                            {Array.from({ length: 7 }).map((_, rowIndex) => (
                                <View style={{ flexDirection: 'row' }} key={rowIndex}>
                                    {Array.from({ length: 52 }).map((_, colIndex) => {
                                        let random = Math.floor(Math.random() * 3);
                                        let color = '';
                                        if (random === 0) {
                                            color = '#dad4ff';
                                        } else if (random === 1) {
                                            color = '#908ccd';
                                        } else {
                                            color = '#2e25dc';
                                        }
                                        return <View
                                            onTouchStart={() => showInfo(colIndex, rowIndex)}
                                            onTouchEnd={closeInfo}
                                            style={{ width: 17, height: 17, backgroundColor: color, margin: 2 }}
                                            key={colIndex}
                                        >
                                            {infoVisible[colIndex] && (
                                                <Text style={{ color: 'black', position: 'absolute', top: -20 }}>
                                                    {info}
                                                </Text>
                                            )}
                                        </View>
                                    })}
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const Records = () => {
    const [editForm, setEditForm] = useState(false);

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

    function showEditForm() {
        setEditForm(true);
    }

    function removeEditForm() {
        setEditForm(false);
    }

    const styles = StyleSheet.create({
        records: {
            width: '90%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: white,
            marginTop: 20,
            borderRadius: 10,
            overflow: 'hidden',
            alignSelf: 'center',
            marginBottom: 30,
        },
        records_section: {
            width: '90%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        records_button: {
            width: '100%',
            height: 35,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#0097a8",
            borderRadius: 5,

        },
        records_button_text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: white,
        },
        text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: black,
        },
        cardHeaderText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: nav_primiry,
        },
    });


    return (
        <View style={styles.records}>
            <EditForm display={editForm} removeEditForm={removeEditForm} />
            <Text style={styles.cardHeaderText}>Records</Text>
            <View style={styles.records_section}>
                <Text style={styles.text}>Exercise</Text>
                <Text style={styles.text}>Highest</Text>
                <Text style={styles.text}>Goal</Text>
                <Text style={styles.text}>1RM</Text>
            </View>
            <View style={styles.records_section}>
                <Text style={styles.text}>Bench Press</Text>
                <Text style={styles.text}>100</Text>
                <Text style={styles.text}>10</Text>
                <Text style={styles.text}>120</Text>
            </View>
            <View style={styles.records_section}>
                <Text style={styles.text}>Barbell Squat</Text>
                <Text style={styles.text}>100</Text>
                <Text style={styles.text}>10</Text>
                <Text style={styles.text}>120</Text>
            </View>
            <View style={styles.records_section}>
                <Text style={styles.text}>Deadlift</Text>
                <Text style={styles.text}>100</Text>
                <Text style={styles.text}>10</Text>
                <Text style={styles.text}>120</Text>
            </View>
            <TouchableOpacity style={styles.records_button} onPress={() => showEditForm()} >
                <Text style={styles.records_button_text}>Set</Text>
            </TouchableOpacity>
        </View>
    );
};

type display = {
    display: boolean;
    removeEditForm: () => void;
};
const EditForm = (props: display) => {
    const [editForm, setEditForm] = useState(props.display);

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

    const styles = StyleSheet.create({
        editForm: {
            width: '100%',
            flexDirection: 'column',
            backgroundColor: white,
            marginTop: 20,
            borderRadius: 10,
            overflow: 'scroll',
            marginBottom: 20,
            alignContent: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 10,
        },
        edit_form_input: {
            width: '90%',
            height: 40,
            borderBottomWidth: 1,
            alignSelf: 'center',
            color: black,
        },
        records_button: {
            width: '100%',
            height: 35,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#0097a8",
            borderRadius: 5,

        },
        records_button_text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: white,
        }, picker: {
            width: '100%',
            height: 50,
            color: black,
        },
        picker_text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: white,
        },
        text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: black,
        },
    });

    return (
        <View style={[styles.editForm, { display: props.display ? 'flex' : 'none' }]}>
            <View>
                <TouchableOpacity style={styles.records_button} onPress={props.removeEditForm} >
                    <Text style={styles.records_button_text}>X</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Set Goal</Text>
            <Text style={styles.text}>Select</Text>
            <Picker style={styles.picker} dropdownIconColor={black} dropdownIconRippleColor={nav_primiry} mode='dropdown' onValueChange={(value) => { }}>
                <Picker.Item style={styles.picker_text} label="Bench Press" value="Bench Press" />
                <Picker.Item style={styles.picker_text} label="Barbell Squat" value="Barbell Squat" />
                <Picker.Item style={styles.picker_text} label="Deadlift" value="Deadlift" />
            </Picker>
            <TextInput style={styles.edit_form_input} placeholder="100" placeholderTextColor={black} />
            <TextInput style={styles.edit_form_input} placeholder="10" placeholderTextColor={black} />
            <TextInput style={styles.edit_form_input} placeholder="120" placeholderTextColor={black} />
            <TouchableOpacity style={styles.records_button} onPress={() => { }} >
                <Text style={styles.records_button_text}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const Profile = ({ navigation }: any) => {
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


    return (
        <View style={{ backgroundColor: bg_color, }}>
            <ScrollView>
                <GymInfoCard navigation={navigation} />
                <WorkoutListHolder />
                {/* <WorkoutListBox /> */}
                <Tracking />
                <Records />
                {/* <EditForm /> */}
            </ScrollView>
        </View>
    );
};


// let nav_primiry = '#1800ec'
// let white = '#ffffff';
// let black = '#000000';
// let gray = '#808080';
// let bg_color = '#eaeaea';


// var styles = StyleSheet.create({
//     cardHolder: {
//         width: '100%',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: bg_color,
//         marginTop: 20,
//         borderRadius: 10,
//         overflow: 'hidden',
//     },
//     gymInfoCard: {
//         width: '90%',
//         height: 400,
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: white,
//         borderRadius: 7,
//         overflow: 'hidden',
//         marginTop: 20,
//         marginBottom: 20,
//         shadowColor: black,
//         shadowOpacity: 0.5,
//         shadowRadius: 10,
//         shadowOffset: {
//             width: 0,
//             height: 0,
//         },
//         elevation: 10,
//         padding: 15,
//     },
//     cardImage: {
//         width: '100%',
//         height: '60%',
//         resizeMode: 'cover',
//         borderTopRightRadius: 7,
//         borderTopLeftRadius: 7,
//     },
//     cardHeader: {
//         width: '100%',
//         height: '10%',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     cardHeaderText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: nav_primiry,
//     },
//     cardBody: {
//         width: '100%',
//         height: '30%',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     cardbodyText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: gray,
//     },
//     cardbodyButton: {
//         width: '100%',

//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     }, view_more: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: black,

//     },
//     workoutListHolder: {
//         width: '100%',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: bg_color,
//         marginTop: 20,
//         borderRadius: 10,
//         overflow: 'hidden',
//     },
//     weekdays: {
//         width: '93%',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: white,
//         marginTop: 20,
//         borderRadius: 7,
//         shadowColor: black,
//         shadowOpacity: 0.5,
//         shadowRadius: 10,
//         shadowOffset: {
//             width: 0,
//             height: 0,
//         },
//         elevation: 10,
//     },
//     picker: {
//         width: '100%',
//         height: 50,
//         color: black,
//     },
//     picker_text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: white,
//     },
//     table_text: {
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: black,
//         width: '30%',
//     },
//     table_button: {
//         width: '10%',
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: nav_primiry,
//         borderRadius: 5,
//     },
//     table_button_text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: white,
//     },
//     workoutImage: {
//         width: 50,
//         height: 50,
//         resizeMode: 'cover',
//     },
//     workoutListBox: {
//         width: '100%',
//         height: 200,
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: white,
//         marginTop: 20,
//         borderRadius: 10,
//         overflow: 'hidden',
//     },
//     tracking: {
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: white,
//         marginTop: 20,
//         borderRadius: 4,
//         overflow: 'hidden',
//         padding: 4,
//     },
//     graph: {
//         height: 260,
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: white,
//         borderRadius: 10,
//         overflow: 'hidden',
//         shadowColor: black,
//         shadowOpacity: 0.5,
//         shadowRadius: 10,
//         shadowOffset: {
//             width: 0,
//             height: 0,
//         },
//         elevation: 10,
//     },
//     days_squar_holder: {
//         width: '90%',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//     },
//     months: {
//         width: '100%',
//         height: '28%',
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//     },
//     days: {
//         width: '10%',
//         height: '72%',
//         flexDirection: 'column',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         position: 'relative',
//     },
//     squares: {
//         width: '100%',
//         height: '72%',
//         alignItems: 'center',
//         margin: 3,
//         padding: 3,
//         position: 'relative',
//         marginLeft: 45,
//         justifyContent: 'flex-start',
//         marginRight: 60,
//     },
//     records: {
//         width: '90%',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: white,
//         marginTop: 20,
//         borderRadius: 10,
//         overflow: 'hidden',
//         alignSelf: 'center',
//         marginBottom: 30,
//     },
//     records_section: {
//         width: '90%',
//         height: 50,
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//     },
//     records_button: {
//         width: '100%',
//         height: 35,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: "#0097a8",
//         borderRadius: 5,

//     },
//     records_button_text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: white,
//     },


//     table_heading_row: {
//         flex: 0,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderRadius: 10,
//         padding: 5,
//         margin: 5,
//         width: '94%',
//         alignSelf: 'center',
//         height: 85,
//     },
//     table_row: {
//         flex: 0,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderRadius: 10,
//         padding: 3,
//         margin: 3,
//         display: 'flex',
//         width: '94%',
//         height: 85,
//         borderTopColor: black,
//         borderTopWidth: 1,
//         alignSelf: 'center',
//         color: black,
//     },
//     table_header: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: black,
//     },
//     text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: black,
//     },
// });


export default Profile;

// import { View, Text, StyleSheet, Button } from 'react-native'
// import React from 'react'

// const Profile = () => {
//     const [select, setSelect] = React.useState('Select Day')

//     function managez_select(day: string) {
//         setSelect(day)
//         console.log(day)
//     }

//     function showEditForm() {
//         console.log('show edit form')
//     }

//     return (
//         <View style={Styles.container}>
//             {/* drop down button*/}
//             {/* table */}

//             <View style={Styles.records}>
//                 <Text>Records</Text>

//                 <View style={Styles.records_table}>
//                     <View style={Styles.records_table_header}>
//                         <Text>Exercise</Text>
//                         <Text>Highest</Text>
//                         <Text>Goal</Text>
//                         <Text>1RM</Text>
//                     </View>
//                     <View style={Styles.records_table_row}>
//                         <Text>Bench Press</Text>
//                         <Text>100</Text>
//                         <Text>10</Text>
//                         <Text>120</Text>
//                     </View>
//                     <View style={Styles.records_table_row}>
//                         <Text>Barbell Squat</Text>
//                         <Text>100</Text>
//                         <Text>10</Text>
//                         <Text>120</Text>
//                     </View>
//                     <View style={Styles.records_table_row}>
//                         <Text>Deadlift</Text>
//                         <Text>100</Text>
//                         <Text>10</Text>
//                         <Text>120</Text>
//                     </View>
//                 </View>

//                 <View onTouchEnd={() => showEditForm()} style={Styles.records_box_btn} >
//                     <Text style={Styles.records_box_btn_text}>Edit</Text>
//                 </View>
//             </View>
//         </View>
//     )
// }


// let nav_primiry = '#480cfe'
// let white = '#ffffff'
// let black = '#000000'
// let gray = '#808080'
// let bg_color = '#eaeaea'


// let Styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: bg_color,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     select_container: {
//         width: '80%',
//         height: '40%',
//         backgroundColor: white,
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         marginTop: 20,
//         borderRadius: 10,
//         overflow: 'hidden',
//     },
//     option: {
//         width: '14%',
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     select_text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: gray,
//     },
//     select_text_selected: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: nav_primiry,
//     },
//     records: {
//         width: '80%',
//         height: '40%',
//         backgroundColor: white,
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         marginTop: 20,
//         borderRadius: 10,
//         overflow: 'hidden',
//     },
//     records_table: {
//         width: '100%',
//         height: '70%',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//     },
//     records_table_header: {
//         width: '100%',
//         height: '20%',
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderColor: gray,
//     },
//     records_table_row: {
//         width: '100%',
//         height: '20%',
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//     },
//     records_box_btn: {
//         width: '100%',
//         height: '10%',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     records_box_btn_text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: nav_primiry,
//     },
//     records_box_btn_text_disabled: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: gray,
//     },
//     records_box_btn_disabled: {
//         width: '100%',
//         height: '10%',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: bg_color,
//     },
//     records_box_btn_disabled_text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: gray,
//     },
//     records_box_btn_disabled_text_disabled: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: gray,
//     },
//     records_box_btn_disabled_disabled: {
//         width: '100%',
//         height: '10%',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: bg_color,
//     },
//     records_box_btn_disabled_disabled_text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: gray,
//     },
//     records_box_btn_disabled_disabled_text_disabled: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: gray,
//     },
//     records_box_btn_disabled_disabled_disabled: {
//         width: '100%',
//         height: '10%',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: bg_color,
//     },

// });
// export default Profile