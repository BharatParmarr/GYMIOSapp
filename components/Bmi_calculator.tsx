// bmi calculator component
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native'
import React, {
    useEffect,
    useState,
    useContext,
} from 'react'
import { ThemeContext } from './theamcontext';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,

} from 'react-native-reanimated';
import { set } from 'lodash';
import { Picker } from '@react-native-picker/picker';
import { API_HOST } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bmi_calculator = () => {
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

    const styles = StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor: bg_color,
            padding: 20,
        },
        lable_text: {
            fontSize: 18,
            marginBottom: 10,
            color: black,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        input: {
            borderWidth: 1,
            borderColor: gray,
            padding: 10,
            borderRadius: 5,
            backgroundColor: white,
            width: '70%',
            height: '100%',
        },
        piker_style: {
            borderRadius: 5,
            backgroundColor: white,
            height: '100%',
            width: '18%',
            overflow: 'hidden',
        },
        calculateButton: {
            backgroundColor: nav_primiry,
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
        },
        calculateButtonText: {
            color: white,
            fontSize: 16,
        },
        bmi_meter: {
            marginTop: 20,
        },
        bmi_meter_text: {
            fontSize: 18,
            color: 'white',
            marginBottom: 5,
            textAlign: 'center',
            width: '90%',
        },
        bmi_meter_bar: {
            height: 30,
            backgroundColor: gray,
            marginBottom: 7,
            marginTop: 25,
            marginHorizontal: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,

        },
        bmi_meter_bar_indicator: {
            backgroundColor: nav_primiry,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,

        },
        bmi_meter_bar_fill: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            backgroundColor: bg_color,
            borderRadius: 0,
            /* Adjust color for BMI range */
        },
        heading: {
            fontSize: 20,
            fontWeight: 'bold',
            color: black,
            marginBottom: 20,
            padding: 10,
        },
        calculate_button: {
            backgroundColor: nav_primiry,
            padding: 5,
            borderRadius: 5,
            alignItems: 'center',
            marginHorizontal: 90,
            height: 40,
            justifyContent: 'center',
        },
        bmi_section_show: {
            left: 0,
            height: 30,
            flexDirection: 'row',
            borderRadius: 4,
            justifyContent: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 20,
            top: -24,
            zIndex: -1,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,

        },
        bmi_Underweight: {
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '46.25%',
            backgroundColor: '#9d0000',
            borderBottomLeftRadius: 10,
            justifyContent: 'flex-end'
        },
        bmi_Normal: {
            position: 'absolute',
            left: '46.25%',
            top: 0,
            height: '100%',
            width: '16%',
            backgroundColor: '#009d22',
            justifyContent: 'flex-end'

        },
        bmi_Overweight: {
            position: 'absolute',
            left: '62.25%',
            top: 0,
            height: '100%',
            width: '12.25%',
            backgroundColor: '#959d00',
            justifyContent: 'flex-end'

        },
        bmi_Obese: {
            position: 'absolute',
            left: '74.5%',
            top: 0,
            height: '100%',
            width: '25.5%',
            backgroundColor: '#9d0000',
            borderBottomRightRadius: 10,
            justifyContent: 'flex-end'
        },
        bmi_section_count: {
            color: white,
            fontSize: 12,
        },
        holder: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 40,
            width: '92%',
            marginHorizontal: '4%',
            marginBottom: 20,
        },
        save_button: {
            backgroundColor: black,
            padding: 5,
            borderRadius: 5,
            alignItems: 'center',
            marginHorizontal: 90,
            height: 40,
            justifyContent: 'center',
            marginBottom: 20,
        },
    });


    const send_bmi = async () => {
        if (ref.current) {
            ref.current = false;
            return;
        }
        if (bmi == '0') return;
        if (bmi == 'NaN') return;

        fetch(`${API_HOST}/meserments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
            },
            body: JSON.stringify({
                'BMI': bmi,
            }),
        }).then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.message == true) {
                    Alert.alert('BMI saved successfully');
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    const animated_bmi_meter_bar_fill = useSharedValue(0);
    const animated_bmi_meter_bar_fill_color = useSharedValue('red');

    const animated_bmi_meter_bar_fill_style = useAnimatedStyle(() => {
        return {
            width: withTiming(animated_bmi_meter_bar_fill.value, {
                duration: 1000,
                easing: Easing.linear,
            }),
            height: '100%',
            backgroundColor: animated_bmi_meter_bar_fill_color.value,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,

        };
    });
    const animated_bmi_meter_bar_fill2 = useSharedValue(0);
    const animated_bmi_meter_bar_fill_borderradius = useSharedValue(0);
    const animated_bmi_meter_bar_fill_style2 = useAnimatedStyle(() => {
        return {
            left: withTiming(animated_bmi_meter_bar_fill2.value, {
                duration: 1000,
                easing: Easing.linear,
            }),
            height: '100%',
            position: 'absolute',
            top: -31,
            borderWidth: 0,
            borderColor: black,
            backgroundColor: withTiming(animated_bmi_meter_bar_fill_color.value, {
                duration: 1000,
                easing: Easing.linear,
            }),
            zIndex: 10,
            borderRadius: withTiming(animated_bmi_meter_bar_fill_borderradius.value, {
                duration: 200,
                easing: Easing.linear,

            }),

        };
    });
    const [bmi, setbmi] = useState('0');
    const [weight, setweight] = useState('0');
    const [height, setheight] = useState('0');
    const [type_weight, settype_weight] = useState('Kg');
    const [type_height, settype_height] = useState('cm');
    const [condition, setcondition] = useState('Underweight');

    const calculate_bmi = () => {
        let weightof = parseFloat(weight);
        let heightof = parseFloat(height);
        if (type_weight == 'Pounds') {
            weightof = weightof * 0.453592;
        }
        if (type_height == 'inches') {
            heightof = heightof * 0.0254;
        }
        if (type_height == 'feet') {
            heightof = heightof * 0.3048;
        }
        heightof = heightof;
        let bmi = weightof / (heightof * heightof);
        let width_of_screen = Dimensions.get('window').width;
        const borderRadiusValues = [10, 0, 10, 0, 10, 4];
        let delay = 200;

        if (bmi < 18.5) {
            setcondition('Underweight');
            animated_bmi_meter_bar_fill2.value = 10;
            animated_bmi_meter_bar_fill_color.value = 'red';
            for (let i = 0; i < borderRadiusValues.length; i++) {
                setTimeout(() => {
                    animated_bmi_meter_bar_fill_borderradius.value = borderRadiusValues[i];
                }, delay);
                delay += 200;
            }
        }
        if (bmi >= 18.5 && bmi <= 24.9) {
            setcondition('Normal');
            animated_bmi_meter_bar_fill2.value = ((width_of_screen - 20) / 2) - 50;


            for (let i = 0; i < borderRadiusValues.length; i++) {
                setTimeout(() => {
                    animated_bmi_meter_bar_fill_borderradius.value = borderRadiusValues[i];
                }, delay);
                delay += 200;
            }

            animated_bmi_meter_bar_fill_color.value = 'green';
        }
        if (bmi >= 25 && bmi <= 29.9) {
            setcondition('Overweight');
            animated_bmi_meter_bar_fill2.value = (width_of_screen - 20) / 1.7;
            animated_bmi_meter_bar_fill_color.value = 'yellow';
            for (let i = 0; i < borderRadiusValues.length; i++) {
                setTimeout(() => {
                    animated_bmi_meter_bar_fill_borderradius.value = borderRadiusValues[i];
                }, delay);
                delay += 200;
            }
        }
        if (bmi >= 30) {
            setcondition('Obese');
            animated_bmi_meter_bar_fill2.value = (width_of_screen - 20) - 100;
            animated_bmi_meter_bar_fill_color.value = 'red';
            for (let i = 0; i < borderRadiusValues.length; i++) {
                setTimeout(() => {
                    animated_bmi_meter_bar_fill_borderradius.value = borderRadiusValues[i];
                }, delay);
                delay += 200;
            }
        }
        // bmi range from 0 - 40
        let bmi_meter_bar_fill_width = width_of_screen - 20;
        let bmi_meter_bar_fill_width_per_unit = bmi_meter_bar_fill_width / 40;
        let bmi_meter_bar_fill_width_per_unit_value = bmi_meter_bar_fill_width_per_unit * bmi;
        animated_bmi_meter_bar_fill.value = bmi_meter_bar_fill_width_per_unit_value;
        return bmi.toFixed(2);
    }

    return (
        <ScrollView>
            <Text style={styles.heading}>Bmi_calculator</Text>
            <Text style={styles.lable_text}>Weignt</Text>
            <View style={styles.holder}>
                <TextInput
                    style={styles.input}
                    onChangeText={setweight}
                    value={weight}
                    keyboardType="numeric"
                />
                <View style={styles.piker_style}>
                    <Picker style={{}} dropdownIconColor={black} dropdownIconRippleColor={nav_primiry} mode='dropdown' onValueChange={(value: string) => { settype_weight(value) }} selectedValue={type_weight}>
                        <Picker.Item label="Kg" value="Kg" />
                        <Picker.Item label="Pounds" value="Pounds" />
                    </Picker>
                </View>
            </View>

            <Text style={styles.lable_text}>Height</Text>
            <View style={styles.holder}>
                <TextInput
                    style={styles.input}
                    onChangeText={setheight}
                    value={height}
                    keyboardType="numeric"
                />
                <View style={styles.piker_style}>
                    <Picker dropdownIconColor={black} dropdownIconRippleColor={nav_primiry} mode='dropdown' onValueChange={(value: string) => { settype_height(value) }} selectedValue={type_height}>
                        <Picker.Item label="cm" value="cm" />
                        <Picker.Item label="inches" value="inches" />
                        <Picker.Item label="feet" value="feet" />
                    </Picker>
                </View>
            </View>

            <TouchableOpacity style={styles.save_button} onPress={() => { setbmi(`${calculate_bmi()}`) }}>
                <Text style={{ color: white }}>Calculate</Text>
            </TouchableOpacity>

            <View style={styles.bmi_meter}>
                <Text style={[styles.bmi_meter_text, { color: gray }]}>BMI :<Text style={{ color: nav_primiry }}> {bmi}</Text></Text>


                <View style={styles.bmi_meter_bar}>
                    <Animated.View style={[styles.bmi_meter_bar_indicator, animated_bmi_meter_bar_fill_style2]}>
                        {condition == 'Underweight' ? <Text style={styles.bmi_meter_text}>Underweight</Text> : null}
                        {condition == 'Normal' ? <Text style={styles.bmi_meter_text}>Normal</Text> : null}
                        {condition == 'Overweight' ? <Text style={styles.bmi_meter_text}>Overweight</Text> : null}
                        {condition == 'Obese' ? <Text style={styles.bmi_meter_text}>Obese</Text> : null}
                    </Animated.View>
                    <View style={styles.bmi_meter_bar_fill}>
                        <Animated.View style={animated_bmi_meter_bar_fill_style}>
                        </Animated.View>
                    </View>

                </View>
                <View style={styles.bmi_section_show}>
                    <View style={styles.bmi_Underweight}><Text style={styles.bmi_section_count}> 0</Text></View>
                    <View style={styles.bmi_Normal}><Text style={styles.bmi_section_count}>18.5</Text></View>
                    <View style={styles.bmi_Overweight}><Text style={styles.bmi_section_count}>24.9</Text></View>
                    <View style={styles.bmi_Obese}><Text style={styles.bmi_section_count}>30</Text></View>
                </View>
            </View>
            <TouchableOpacity style={styles.save_button} onPress={() => { send_bmi() }}>
                <Text style={{ color: white }}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Bmi_calculator