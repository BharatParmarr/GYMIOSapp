import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Image as FastImage } from 'expo-image';
import { Picker } from '@react-native-picker/picker';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { API_HOST } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


function name_change(name: string) {

    let tempname = name
    tempname = tempname.replaceAll(' ', '_')
    tempname = tempname.replaceAll('/', '_')
    tempname = tempname.replaceAll(':', '_')
    tempname = tempname.replaceAll('(', '_')
    tempname = tempname.replaceAll(')', '_')
    tempname = tempname.replaceAll('\'', '_')
    tempname = tempname.replaceAll(',', '_')
    tempname = tempname.replaceAll('.', '_')
    tempname = tempname.replaceAll('&', '_')
    tempname = tempname.replaceAll('-', '_')
    tempname = tempname.replaceAll('__', '_')
    tempname = tempname + '.jpg'
    return tempname
}

const Template = () => {
    const [option_selected, setOptionSelected] = useState('Custom');
    const [custom, setCustom] = useState([]);
    const [weekdays, setWeekdays] = useState([]);
    const screenheight = Dimensions.get('window').height;

    const Custom = () => {
        const [url, setUrl] = useState(`${API_HOST}`);

        const [number_of_days, setNumberofdays] = useState(1);
        const [day, setDay] = useState('');
        const [day_of_chart, setDayofchart] = useState(1);
        const [list, setList] = useState<string[]>([]);
        let list_of_workout = { 1: [{ 'name': 'Empty', 'reps': 0, 'set': 0 }] }
        const [is_editable_days, setIs_editable_days] = useState(true);
        const [template_name, setTemplate_name] = useState('');
        // const [list_of_workout_state, setStateworkout] = useState(list_of_workout);
        type ListOfWorkoutState = {
            [key: number]: { name: string; reps: number; set: number }[];
        };

        const [list_of_workout_state, setStateworkout] = useState<ListOfWorkoutState>(list_of_workout);



        const minasfromset = (index: number, x: number) => {
            //    function to minas from set and reps and change the state and update the ui
            let temp = JSON.parse(JSON.stringify(list_of_workout_state));;
            if (x === 1) {
                if (temp[day_of_chart][index]['set'] === 0) {
                    return;
                }
                temp[day_of_chart][index]['set'] = temp[day_of_chart][index]['set'] - 1;
            } else if (x === 2) {
                if (temp[day_of_chart][index]['reps'] === 0) {
                    return;
                }
                temp[day_of_chart][index]['reps'] = temp[day_of_chart][index]['reps'] - 1;
            } else if (x === 3) {

                temp[day_of_chart][index]['set'] = temp[day_of_chart][index]['set'] + 1;
            } else if (x === 4) {

                temp[day_of_chart][index]['reps'] = temp[day_of_chart][index]['reps'] + 1;
            }
            setStateworkout(temp);

        }


        useEffect(() => {
            if (day === '') {
                setNumberofdays(1);
                return;
            }
            else if (day === '0') {
                Alert.alert('Minimum number of days is 1');
                setNumberofdays(1);
            }
            else if (Number.isNaN(parseInt(day))) {
                Alert.alert('Please enter a number');
                setNumberofdays(1);
            } else if (parseInt(day) > 30) {
                Alert.alert('Maximum number of days is 30');
                setNumberofdays(30);
            }
            else {

                setNumberofdays(parseInt(day));
                let temp = [];
                for (let i = 0; i < parseInt(day); i++) {
                    temp.push(`${i + 1}`);
                }
                list_of_workout = { 1: [] };
                setDayofchart(1);
                for (let i = 1; i <= parseInt(day); i++) {
                    list_of_workout[i as keyof typeof list_of_workout] = [{ 'name': 'Empty', 'reps': 0, 'set': 0 }];
                }
                setStateworkout(list_of_workout);
                setList(temp);
            }

        }, [day])

        const [search_term, set_search_term] = useState('');
        const [bodyPart, setBodyPart] = useState('Chest');


        type FullList = {
            [key: string]: {
                name: string;
                reps: number;
                set: number;
            }[];
        };
        const [full_list, setfull_list] = useState<FullList>({ '': [{ name: "", reps: 0, set: 0 }] });

        const [full_list_key, setkeysOfFullList] = useState(['Loading...',])
        type ResultList = {
            name: string;
            reps: number;
            set: number;
        }[];

        useEffect(() => {
            function fetchData() {
                AsyncStorage.getItem('objectData').then((value) => {
                    setfull_list(value ? JSON.parse(value) : {});
                    setkeysOfFullList(value ? Object.keys(JSON.parse(value) as FullList) : []);
                    setResult_list(JSON.parse(value || '{}')?.[bodyPart as keyof typeof full_list]?.map((item: { reps: any; }) => ({ ...item, reps: item.reps || 0 })) || []);
                });
            }
            fetchData()
        }, [])

        const [result_list, setResult_list] = useState<ResultList>([{ 'name': 'bicep curl situp dummbel ssk ssd skaj fla fdsjf sdfsd hfhfs', 'reps': 10, 'set': 3 }, { 'name': 'abc', 'reps': 5, 'set': 11 }, { 'name': 'abcna slk', 'reps': 12, 'set': 2 }, { 'name': 'bicep curl situp dummbel ssk ssd skaj fla fdsjf sdfsd hfhfs', 'reps': 10, 'set': 3 }, { 'name': 'abc', 'reps': 5, 'set': 11 }, { 'name': 'abcna slk', 'reps': 12, 'set': 2 }, { 'name': 'bicep curl situp dummbel ssk ssd skaj fla fdsjf sdfsd hfhfs', 'reps': 10, 'set': 3 }, { 'name': 'abc', 'reps': 5, 'set': 11 }, { 'name': 'abcna slk', 'reps': 12, 'set': 2 }, { 'name': 'bicep curl situp dummbel ssk ssd skaj fla fdsjf sdfsd hfhfs', 'reps': 10, 'set': 3 }, { 'name': 'abc', 'reps': 5, 'set': 11 }, { 'name': 'abcna slk', 'reps': 12, 'set': 2 }]);
        useEffect(() => {

            if (search_term === '') {
                setResult_list(full_list?.[bodyPart as keyof typeof full_list]?.map(item => ({ ...item, reps: item.reps || 0 })) || []);
            }
            else {
                let temp = [];
                for (let i = 0; i < (full_list ?? {})[bodyPart as keyof typeof full_list]?.length ?? 0; i++) {
                    if ((full_list ?? {})[bodyPart as keyof typeof full_list][i]['name'].toLowerCase().includes(search_term.toLowerCase())) {
                        temp.push(full_list?.[bodyPart as keyof typeof full_list]?.[i]);
                    } else {
                        if (i === (full_list ?? {})[bodyPart as keyof typeof full_list]?.length - 1 && temp.length === 0) {
                            temp.push({ 'name': 'No result found', 'reps': 0, 'set': 0 })
                        }
                    }
                }
                setResult_list(temp.map(item => ({ ...item, reps: item.reps || 0, name: item.name || '', set: item.set || 0 })));
            }
            // };

            // fetchData();


        }, [search_term, bodyPart])

        const initalworkoutscountchang = (index: number, x: number) => {
            //    function to minas from set and reps and change the state and update the ui
            let temp = full_list[bodyPart as keyof typeof full_list] as { name: string; reps: number; set: number }[];
            if (x === 1) {
                if (temp[index]['set'] === 0) {
                    return;
                }
                temp[index]['set'] = temp[index]['set'] - 1;
            } else if (x === 2) {
                if (temp[index]['reps'] === 0) {
                    return;
                }
                temp[index]['reps'] = temp[index]['reps'] - 1;
            } else if (x === 3) {

                temp[index]['set'] = temp[index]['set'] + 1;
            } else if (x === 4) {

                temp[index]['reps'] = temp[index]['reps'] + 1;
            }
            setfull_list({ ...full_list, [bodyPart]: temp });
            // refresh the ui with new state
            setResult_list(temp.map(item => ({ ...item, reps: item.reps || 0 })));
        }

        const add_to_list_of_workout = (index: number) => {
            let temp = JSON.parse(JSON.stringify(list_of_workout_state));
            if (temp[day_of_chart].length === 1 && temp[day_of_chart][0]['name'] === 'Empty') {
                temp[day_of_chart] = [];
            }
            temp[day_of_chart].push(full_list[bodyPart as keyof typeof full_list][index]);
            setStateworkout(temp);
        }

        // cheaking namee avaiblity
        const [validatemessage, setValidatemessage] = useState('fill the name');
        const [is_animation, setIs_animation] = useState(true);
        const rotate_animation = useSharedValue('0deg');
        const [is_valid, setIs_valid] = useState(true);

        // animation
        useEffect(() => {
            const chake_username_server = (text: string) => {
                if (text === '') {
                    setValidatemessage('fill the name')
                    setIs_animation(false)
                    return;
                }
                fetch(`${url}/check_username_availability/templatename/${text}/`, {
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
                            setValidatemessage('Template name is not available')
                            rotate_animation.value = withTiming('0deg', { duration: 0 });
                        }
                    })
                    .catch((error) => {
                        Alert.alert('Something went wrong');
                    });
            }
            chake_username_server(template_name);
        }, [template_name])


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

        async function subbmitTemplate() {
            if (template_name === '') {
                Alert.alert('Please fill the name');
                return;
            }
            if (is_valid === false) {
                Alert.alert('Username is not available');
                return;
            }
            for (let i = 1; i <= number_of_days; i++) {
                if (list_of_workout_state[`${i}`].length === 1 && list_of_workout_state[`${i}`][0]['name'] === 'Empty') {
                    Alert.alert('Please add atleast one workout for every day', 'You can add Reast day from search');
                    return;
                }
            }
            let data = { 'name': template_name, 'days': number_of_days, 'exercises': list_of_workout_state };
            let token = await AsyncStorage.getItem('@token')
            fetch(`${url}/create_template/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token || '',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if (json['status'] == true) {
                        Alert.alert('Template created');
                    } else {
                        Alert.alert('Something went wrong');
                    }
                })
                .catch((error) => {
                    Alert.alert('Something went wrong');
                });
        }

        function name_change(name: string) {

            let tempname = name
            tempname = tempname.replaceAll(' ', '_')
            tempname = tempname.replaceAll('/', '_')
            tempname = tempname.replaceAll(':', '_')
            tempname = tempname.replaceAll('(', '_')
            tempname = tempname.replaceAll(')', '_')
            tempname = tempname.replaceAll('\'', '_')
            tempname = tempname.replaceAll(',', '_')
            tempname = tempname.replaceAll('.', '_')
            tempname = tempname.replaceAll('&', '_')
            tempname = tempname.replaceAll('-', '_')
            tempname = tempname.replaceAll('__', '_')

            tempname = tempname + '.jpg'
            return tempname

        }
        return (
            <View >
                {/* number input */}
                <View style={Styles.number_of_days_definer}>
                    <TextInput style={Styles.number_Of_days_input} placeholder='Enter number of Days' keyboardType='number-pad' onChangeText={newtext => setDay(newtext)} editable={is_editable_days} />
                    <View onTouchEnd={() => { setIs_editable_days(!is_editable_days) }} style={Styles.number_of_days_definer_button}>
                        <Text style={Styles.button_text}>{is_editable_days ? 'Confirm' : 'Edit'}</Text>
                    </View>
                </View>

                {/* list of days */}
                <View style={Styles.holder_box}>
                    {list.map((item, index) => {
                        if (index === day_of_chart - 1) {
                            return <TouchableOpacity key={index} style={{ ...Styles.holder_box_item, backgroundColor: nav_primiry }} onPress={() => { }} ><Text style={Styles.holder_box_item_text}>Day {index + 1}</Text></TouchableOpacity>;
                        }
                        return <TouchableOpacity key={index} style={Styles.holder_box_item} onPress={() => { setDayofchart(index + 1) }} ><Text style={Styles.holder_box_item_text}>Day {index + 1}</Text></TouchableOpacity>;
                    })}
                </View>
                <ScrollView contentContainerStyle={Styles.workout_cart} scrollEnabled={true} showsHorizontalScrollIndicator={true} >
                    {list_of_workout_state[day_of_chart].map((item, index) => {
                        return <View key={index} style={Styles.workout_cart_item}>
                            <View style={{ width: '30.5%', height: '80%', justifyContent: 'center' }}>
                                <FastImage style={Styles.workout_cart_item_image} source={{ uri: `${API_HOST}/media/exercise_images/${name_change((item as { name: string })['name'])}` }} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                                <Text style={Styles.workout_cart_item_name}>{item['name']}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 1) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{item['set']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 3) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 2) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{item['reps']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 4) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View>
                            </View>
                        </View>
                    })}
                </ScrollView>
                <ScrollView contentContainerStyle={Styles.workout_cart} scrollEnabled={true} showsHorizontalScrollIndicator={true} >
                    <Picker style={{ width: '100%', height: 50, color: white }} selectedValue={bodyPart} onValueChange={(itemValue, itemIndex) => { setBodyPart(itemValue) }} dropdownIconColor={white} dropdownIconRippleColor={nav_primiry} mode='dropdown' selectionColor={white}>
                        {/* <Picker.Item label="Chest" value="Chest" />
                        <Picker.Item label="Bicep" value="Bicep" />
                        <Picker.Item label="Tricep" value="Tricep" />
                        <Picker.Item label="Legs" value="Legs" />
                        <Picker.Item label="Shoulder" value="Shoulder" /> */}
                        {full_list_key.map((item, index) => (
                            <Picker.Item key={index} label={item} value={item} />
                        ))}
                    </Picker>
                    <TextInput placeholder='Enter name of workout' onChangeText={set_search_term} style={Styles.search_input} />
                    {result_list.map((item, index) => {

                        return <View key={index} style={Styles.workout_cart_item}>
                            <View style={{ width: '30.5%', height: '80%', justifyContent: 'center' }}>
                                <FastImage style={Styles.workout_cart_item_image} source={{ uri: `${API_HOST}/media/exercise_images/${name_change((item as { name: string })['name'])}` }} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                                <Text style={Styles.workout_cart_item_name}>{(item as { name: string })['name']}</Text>
                                {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { initalworkoutscountchang(index, 1) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{(item as { set: number })['set']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { initalworkoutscountchang(index, 3) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { initalworkoutscountchang(index, 2) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{(item as { reps: number })['reps']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { initalworkoutscountchang(index, 4) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View> */}
                                <TouchableOpacity style={{ width: '40%', height: 34, backgroundColor: nav_primiry, justifyContent: 'center', alignItems: 'center', borderRadius: 7, alignSelf: 'flex-start' }} onPress={() => { add_to_list_of_workout(index) }}><Text style={{ fontSize: 12, fontWeight: 'bold', color: white }}>Add</Text></TouchableOpacity>
                            </View>
                        </View>
                    })}
                </ScrollView>
                <View style={Styles.workoutform}>
                    <Text>{validatemessage}</Text>
                    <TextInput placeholder='Enter name of workout' onChangeText={setTemplate_name} style={Styles.workoutform_input} />
                    <TouchableOpacity onPress={() => { subbmitTemplate() }} style={Styles.workoutform_button}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: white }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    const WeekDays = () => {
        // const list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const [url, setUrl] = useState('http://192.168.0.102:8000')
        const [number_of_days, setNumberofdays] = useState(7);
        const [day, setDay] = useState('');
        const [day_of_chart, setDayofchart] = useState(1);
        const [list, setList] = useState<string[]>([]);
        let list_of_workout = { 1: [{ 'name': 'Empty', 'reps': 0, 'set': 0 }] }
        const [is_editable_days, setIs_editable_days] = useState(true);
        const [template_name, setTemplate_name] = useState('');
        // const [list_of_workout_state, setStateworkout] = useState(list_of_workout);
        type ListOfWorkoutState = {
            [key: number]: { name: string; reps: number; set: number }[];
        };

        const [list_of_workout_state, setStateworkout] = useState<ListOfWorkoutState>(list_of_workout);

        useEffect(() => {
            setDay('7');
        }, [])

        const minasfromset = (index: number, x: number) => {
            //    function to minas from set and reps and change the state and update the ui
            let temp = JSON.parse(JSON.stringify(list_of_workout_state));
            if (x === 1) {
                if (temp[day_of_chart][index]['set'] === 0) {
                    return;
                }
                temp[day_of_chart][index]['set'] = temp[day_of_chart][index]['set'] - 1;
            } else if (x === 2) {
                if (temp[day_of_chart][index]['reps'] === 0) {
                    return;
                }
                temp[day_of_chart][index]['reps'] = temp[day_of_chart][index]['reps'] - 1;
            } else if (x === 3) {

                temp[day_of_chart][index]['set'] = temp[day_of_chart][index]['set'] + 1;
            } else if (x === 4) {

                temp[day_of_chart][index]['reps'] = temp[day_of_chart][index]['reps'] + 1;
            }
            setStateworkout(temp);

        }


        useEffect(() => {
            if (day === '') {
                setNumberofdays(1);
                return;
            }
            else if (day === '0') {
                Alert.alert('Minimum number of days is 1');
                setNumberofdays(1);
            }
            else if (Number.isNaN(parseInt(day))) {
                Alert.alert('Please enter a number');
                setNumberofdays(1);
            } else if (parseInt(day) > 30) {
                Alert.alert('Maximum number of days is 30');
                setNumberofdays(30);
            }
            else {

                setNumberofdays(parseInt(day));
                let temp = [];
                for (let i = 0; i < parseInt(day); i++) {
                    temp.push(`${i + 1}`);
                }
                list_of_workout = { 1: [] };
                setDayofchart(1);
                for (let i = 1; i <= parseInt(day); i++) {
                    list_of_workout[i as keyof typeof list_of_workout] = [{ 'name': 'Empty', 'reps': 0, 'set': 0 }];
                }
                setStateworkout(list_of_workout);
                setList(temp);
            }

        }, [day])

        const [search_term, set_search_term] = useState('');
        const [bodyPart, setBodyPart] = useState('Chest');

        type FullList = {
            [key: string]: {
                name: string;
                reps: number;
                set: number;
            }[];
        };

        const [full_list, setfull_list] = useState<FullList>({ '': [{ name: "", reps: 0, set: 0 }] });

        const [full_list_key, setkeysOfFullList] = useState(['Loading...',])
        type ResultList = {
            name: string;
            reps: number;
            set: number;
        }[];

        useEffect(() => {
            function fetchData() {
                AsyncStorage.getItem('objectData').then((value) => {
                    setfull_list(value ? JSON.parse(value) : {});
                    setkeysOfFullList(value ? Object.keys(JSON.parse(value) as FullList) : []);
                    setResult_list(JSON.parse(value || '{}')?.[bodyPart as keyof typeof full_list]?.map((item: { reps: any; }) => ({ ...item, reps: item.reps || 0 })) || []);
                });
            }
            fetchData()
        }, [])

        const [result_list, setResult_list] = useState<ResultList>([{ 'name': 'bicep curl situp dummbel ssk ssd skaj fla fdsjf sdfsd hfhfs', 'reps': 10, 'set': 3 }, { 'name': 'abc', 'reps': 5, 'set': 11 }, { 'name': 'abcna slk', 'reps': 12, 'set': 2 }, { 'name': 'bicep curl situp dummbel ssk ssd skaj fla fdsjf sdfsd hfhfs', 'reps': 10, 'set': 3 }, { 'name': 'abc', 'reps': 5, 'set': 11 }, { 'name': 'abcna slk', 'reps': 12, 'set': 2 }, { 'name': 'bicep curl situp dummbel ssk ssd skaj fla fdsjf sdfsd hfhfs', 'reps': 10, 'set': 3 }, { 'name': 'abc', 'reps': 5, 'set': 11 }, { 'name': 'abcna slk', 'reps': 12, 'set': 2 }, { 'name': 'bicep curl situp dummbel ssk ssd skaj fla fdsjf sdfsd hfhfs', 'reps': 10, 'set': 3 }, { 'name': 'abc', 'reps': 5, 'set': 11 }, { 'name': 'abcna slk', 'reps': 12, 'set': 2 }]);
        useEffect(() => {

            if (search_term === '') {
                setResult_list(full_list?.[bodyPart as keyof typeof full_list]?.map(item => ({ ...item, reps: item.reps || 0 })) || []);
            }
            else {
                let temp = [];
                for (let i = 0; i < (full_list ?? {})[bodyPart as keyof typeof full_list]?.length ?? 0; i++) {
                    if ((full_list ?? {})[bodyPart as keyof typeof full_list][i]['name'].toLowerCase().includes(search_term.toLowerCase())) {
                        temp.push(full_list?.[bodyPart as keyof typeof full_list]?.[i]);
                    } else {
                        if (i === (full_list ?? {})[bodyPart as keyof typeof full_list]?.length - 1 && temp.length === 0) {
                            temp.push({ 'name': 'No result found', 'reps': 0, 'set': 0 })
                        }
                    }
                }
                setResult_list(temp.map(item => ({ ...item, reps: item.reps || 0, name: item.name || '', set: item.set || 0 })));
            }
            // };

            // fetchData();


        }, [search_term, bodyPart])

        const initalworkoutscountchang = (index: number, x: number) => {
            //    function to minas from set and reps and change the state and update the ui
            let temp = full_list[bodyPart as keyof typeof full_list] as { name: string; reps: number; set: number }[];
            if (x === 1) {
                if (temp[index]['set'] === 0) {
                    return;
                }
                temp[index]['set'] = temp[index]['set'] - 1;
            } else if (x === 2) {
                if (temp[index]['reps'] === 0) {
                    return;
                }
                temp[index]['reps'] = temp[index]['reps'] - 1;
            } else if (x === 3) {

                temp[index]['set'] = temp[index]['set'] + 1;
            } else if (x === 4) {

                temp[index]['reps'] = temp[index]['reps'] + 1;
            }
            setfull_list({ ...full_list, [bodyPart]: temp });
            // refresh the ui with new state
            setResult_list(temp.map(item => ({ ...item, reps: item.reps || 0 })));
        }

        const add_to_list_of_workout = (index: number) => {
            let temp = JSON.parse(JSON.stringify(list_of_workout_state));
            if (temp[day_of_chart].length === 1 && temp[day_of_chart][0]['name'] === 'Empty') {
                temp[day_of_chart] = [];
            }
            temp[day_of_chart].push(full_list[bodyPart as keyof typeof full_list][index]);
            setStateworkout(temp);
        }

        // cheaking namee avaiblity
        const [validatemessage, setValidatemessage] = useState('fill the name');
        const [is_animation, setIs_animation] = useState(true);
        const rotate_animation = useSharedValue('0deg');
        const [is_valid, setIs_valid] = useState(true);

        // animation
        useEffect(() => {
            const chake_username_server = (text: string) => {
                if (text === '') {
                    setValidatemessage('fill the name')
                    setIs_animation(false)
                    return;
                }
                fetch(`${url}/check_username_availability/templatename/${text}/`, {
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
            chake_username_server(template_name);
        }, [template_name])


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



        function subbmitTemplate() {
            if (template_name === '') {
                Alert.alert('Please fill the name');
                return;
            }
            if (is_valid === false) {
                Alert.alert('Username is not available');
                return;
            }
            if (list_of_workout_state[1].length === 1 && list_of_workout_state[1][0]['name'] === 'Empty') {
                Alert.alert('Please add atleast one workout');
                return;
            }
            let temp = JSON.parse(JSON.stringify(list_of_workout_state));;
            for (let i = 1; i <= number_of_days; i++) {
                if (temp[i].length === 1 && temp[i][0]['name'] === 'Empty') {
                    Alert.alert('Please add atleast one workout');
                    return;
                }
            }
            let data = { 'name': template_name, 'days': number_of_days, 'workout': list_of_workout_state };
            fetch(`${url}/create_template/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if (json['status'] == true) {
                        Alert.alert('Template created');
                    } else {
                        Alert.alert('Something went wrong');
                    }
                })
                .catch((error) => {
                    Alert.alert('Something went wrong');
                });
        }

        return (
            <View>
                {/* number input */}
                <TextInput style={[Styles.search_input, { display: 'none' }]} placeholder='Enter number of Days' keyboardType='number-pad' onChangeText={newtext => setDay(newtext)} editable={is_editable_days} />
                <View onTouchEnd={() => { setIs_editable_days(!is_editable_days) }} style={[Styles.button, { display: 'none' }]}>
                    <Text style={Styles.button_text}>{is_editable_days ? 'Confirm' : 'Edit'}</Text>
                </View>
                {/* list of days */}
                <View style={Styles.holder_box}>
                    {list.map((item, index) => {
                        if (index === day_of_chart - 1) {
                            return <TouchableOpacity key={index} style={{ ...Styles.holder_box_item, backgroundColor: nav_primiry }} onPress={() => { }} ><Text style={Styles.holder_box_item_text}>Day {index + 1}</Text></TouchableOpacity>;
                        }
                        return <TouchableOpacity key={index} style={Styles.holder_box_item} onPress={() => { setDayofchart(index + 1) }} ><Text style={Styles.holder_box_item_text}>Day {index + 1}</Text></TouchableOpacity>;
                    })}
                </View>
                <ScrollView contentContainerStyle={[Styles.workout_cart, { marginTop: 40 }]} scrollEnabled={true} showsHorizontalScrollIndicator={true} >
                    {list_of_workout_state[day_of_chart].map((item, index) => {
                        return <View key={index} style={Styles.workout_cart_item}>
                            <View style={{ width: '30.5%', height: '80%', justifyContent: 'center' }}>
                                <FastImage style={Styles.workout_cart_item_image} source={{ uri: `${API_HOST}/media/exercise_images/${name_change((item as { name: string })['name'])}` }} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                                <Text style={Styles.workout_cart_item_name}>{item['name']}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 1) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{item['set']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 3) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 2) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{item['reps']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 4) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View>
                            </View>
                        </View>
                    })}
                </ScrollView>
                <ScrollView contentContainerStyle={Styles.workout_cart} scrollEnabled={true} showsHorizontalScrollIndicator={true} >
                    <Picker style={{ width: '100%', height: 50, color: white, borderWidth: 1, borderColor: white }} selectedValue={bodyPart} onValueChange={(itemValue, itemIndex) => { setBodyPart(itemValue) }} dropdownIconColor={white} dropdownIconRippleColor={nav_primiry} mode='dropdown' selectionColor={white}>
                        {full_list_key.map((item, index) => (
                            <Picker.Item key={index} label={item} value={item} />
                        ))}
                    </Picker>
                    <TextInput placeholder='Enter name of workout' onChangeText={set_search_term} style={Styles.search_input} />
                    {result_list.map((item, index) => {

                        return <View key={index} style={Styles.workout_cart_item}>
                            <View style={{ width: '30.5%', height: '80%', justifyContent: 'center' }}>
                                <FastImage style={Styles.workout_cart_item_image} source={{ uri: `${API_HOST}/media/exercise_images/${name_change((item as { name: string })['name'])}` }} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                                <Text style={Styles.workout_cart_item_name}>{(item as { name: string })['name']}</Text>
                                {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { initalworkoutscountchang(index, 1) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>set:{(item as { set: number })['set']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { initalworkoutscountchang(index, 3) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { initalworkoutscountchang(index, 2) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{(item as { reps: number })['reps']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { initalworkoutscountchang(index, 4) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View> */}
                                <TouchableOpacity style={{ width: '40%', height: 30, backgroundColor: nav_primiry, justifyContent: 'center', alignItems: 'center', borderRadius: 4, alignSelf: 'flex-start', marginTop: 6 }} onPress={() => { add_to_list_of_workout(index) }}><Text style={{ fontSize: 12, fontWeight: 'bold', color: white }}>Add</Text></TouchableOpacity>
                            </View>
                        </View>
                    })}
                </ScrollView>
                <View style={Styles.workoutform}>
                    <Text>{validatemessage}</Text>
                    <TextInput placeholder='Enter name of workout' onChangeText={setTemplate_name} style={Styles.workoutform_input} />
                    <TouchableOpacity onPress={subbmitTemplate} style={Styles.workoutform_button}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: white }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const scroll_ref = useRef(null);
    const scroll_to_cart = () => {
        if (scroll_ref.current) {
            (scroll_ref.current as ScrollView).scrollTo({ x: 0, y: screenheight, animated: true });
        }
    }


    return (<View>
        <ScrollView ref={scroll_ref} contentContainerStyle={{ flexGrow: 1, backgroundColor: bg_color, overflow: 'scroll', display: 'flex', width: '100%' }}>
            <View style={Styles.create_box}>
                <Text style={Styles.heading_2}>Create</Text>
                <Text style={Styles.heading_3}>Create a new workout</Text>
                <View style={Styles.selecter}>
                    <Text onPress={() => { setOptionSelected('Custom') }} style={[Styles.option, { backgroundColor: option_selected == 'Custom' ? black : white, color: option_selected === 'Custom' ? white : black }]}>Custom</Text>
                    <Text onPress={() => { setOptionSelected('WeekDays') }} style={[Styles.option, { backgroundColor: option_selected == 'Custom' ? white : black, color: option_selected === 'Custom' ? black : white }]}>WeekDays</Text>
                </View>
                <View style={Styles.holder}>
                    {option_selected === 'Custom' ? <Custom /> : <WeekDays />}
                </View>
            </View >
        </ScrollView >
        <TouchableOpacity style={Styles.go_to_chart_button} onPress={scroll_to_cart}><Text style={Styles.button_text}>Create</Text></TouchableOpacity>
    </View>

    )
}


// light
let nav_primiry = '#480cfe'
let white = '#ffffff'
let black = '#000000'
let gray = '#808080'
let bg_color = '#eaeaea'

// dark
// nav_primiry = '#480cfe'
// white = '#000000'
// black = '#ffffff'
// gray = '#808080'
// bg_color = '#1e1e1e'

let Styles = StyleSheet.create({
    create_box: {
        width: '100%',
        backgroundColor: white,
        alignItems: 'center',
        paddingTop: 40,
        display: 'flex',

    },
    heading_2: {
        fontSize: 30,
        fontWeight: 'bold',
        color: nav_primiry,
    },
    heading_3: {
        fontSize: 20,
        fontWeight: 'bold',
        color: black,
    },
    selecter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    option: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        height: 50,
        padding: 10,
        borderRadius: 7,
    },
    holder: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10,
    },
    button: {
        width: 100,
        height: 50,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    button_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    holder_box: {
        width: '97%',
        backgroundColor: black,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 7,
        borderColor: nav_primiry,
        marginBottom: 10,
        alignSelf: 'center',
    },
    holder_scrol: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        overflow: 'scroll',
        opacity: 1,
        borderWidth: 1,
    },
    holder_box_item: {
        width: '30%',
        height: 40,
        backgroundColor: black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    }, holder_box_item_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: white,
    }, workout_cart: {
        width: '95.5%',
        backgroundColor: black,
        borderWidth: 1,
        borderRadius: 7,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        padding: 10,
        display: 'flex',
        alignSelf: 'center',
    }, workout_cart_item: {
        width: '100%',
        height: 150,
        backgroundColor: white,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
        borderColor: white,
        overflow: 'hidden',
        borderRadius: 7,
    },
    workout_cart_item_image: {
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        borderRadius: 7,
        justifyContent: 'center',
    },
    workout_cart_item_name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: black,
        overflow: 'hidden',
        width: '100%',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    workout_cart_item_button: {
        width: 22,
        height: 22,
        backgroundColor: black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,

    },
    workout_cart_item_button_text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: white,
    },
    search_input: {
        width: '100%',
        height: 50,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: nav_primiry,
        borderRadius: 7,
        marginBottom: 10,
        paddingLeft: 10,
    },
    number_holder: {
        fontSize: 18,
        fontWeight: 'bold',
        color: black,
    }, go_to_chart_button: {
        width: 100,
        height: 50,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginBottom: 20,
        position: 'absolute',
        bottom: 50,
        right: 12,
    },
    workoutform: {
        backgroundColor: white,
        alignItems: 'center',
        paddingTop: 10,
        display: 'flex',
        paddingBottom: 100,
        marginBottom: 250,
    }, workoutform_input: {
        width: '100%',
        height: 50,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: nav_primiry,
        borderRadius: 7,
        marginBottom: 10,
        paddingLeft: 10,
    },
    workoutform_button: {
        width: 100,
        height: 50,
        backgroundColor: nav_primiry,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    }, number_of_days_definer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    }, number_Of_days_input: {
        width: '67%',
        height: 50,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: nav_primiry,
        borderRadius: 7,
        marginBottom: 10,
        paddingLeft: 10,
    }, number_of_days_definer_button: {
        width: '27%',
        height: 50,
        backgroundColor: nav_primiry,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    }, number_of_days_definer_button_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: white,
    }

})

export default Template;
export { name_change };

// exersize image handeler
// {isError ? (
//     // Display the default image when an error occurs
//     <Image source={require('./path/to/default_image.jpg')} style={styles.image} />
//   ) : (
//     // Display the fetched image or the default image if the URL is not available
//     <Image source={{ uri: imageSource }} style={styles.image} onError={handleImageError} />
//   )}