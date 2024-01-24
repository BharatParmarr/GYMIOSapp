import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image as FastImage } from 'expo-image';
import { API_HOST } from '../config';
import { name_change } from './template';

type ListOfWorkoutState = {
    [key: string]: { name: string; set: number; reps: number; }[];
};

const Viewr_templet = ({ list_of_workout }: { list_of_workout: ListOfWorkoutState }) => {
    console.log(list_of_workout, 'list_of_workout')
    const [day_of_chart, setDayofchart] = useState(1);

    const [list_of_workout_state, setlist_of_workout_state] = useState<ListOfWorkoutState>(list_of_workout);
    // itterate through object and get the keys
    const keys = Object.keys(list_of_workout);
    // const [list, setlist] = useState([]);
    return (<View style={{ width: '100%' }}>
        <View style={Styles.holder_box}>
            {keys.map((item, index) => {
                if (index === day_of_chart - 1) {
                    return <TouchableOpacity key={index} style={{ ...Styles.holder_box_item, backgroundColor: nav_primiry }} onPress={() => { }} ><Text style={Styles.holder_box_item_text}>Day {index + 1}</Text></TouchableOpacity>;
                }
                return <TouchableOpacity key={index} style={Styles.holder_box_item} onPress={() => { setDayofchart(index + 1) }} ><Text style={Styles.holder_box_item_text}>Day {index + 1}</Text></TouchableOpacity>;
            })}
        </View>
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={[Styles.workout_cart, { marginTop: 40, }]}  >
            {list_of_workout_state[(day_of_chart).toString()].map((item, index) => {
                return <View key={index} style={Styles.workout_cart_item}>
                    <View style={{ width: '30.5%', height: '80%', justifyContent: 'center' }}>
                        <FastImage style={Styles.workout_cart_item_image} source={{ uri: `${API_HOST}/media/exercise_images/${name_change((item as { name: string })['name'])}` }} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                        <Text style={Styles.workout_cart_item_name}>{item['name']}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><Text style={Styles.number_holder}>{item['set']}</Text></View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><Text style={Styles.number_holder}>{item['reps']}</Text></View>
                    </View>
                </View>
            })}
        </ScrollView>
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
// let nav_primiry = '#480cfe'
// let white = '#000000'
// let black = '#ffffff'
// let gray = '#808080'
// let bg_color = '#1e1e1e'

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
export default Viewr_templet