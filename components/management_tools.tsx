import { View, Text, Touchable, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, UserDetails } from './theamcontext'

const Management_tools = ({ navigation }: any) => {
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
        page_headimg: {
            fontSize: 30,
            fontWeight: 'bold',
            color: nav_primiry,
            textAlign: 'center',
            marginTop: 20,
        },
        managment_tool: {
            marginTop: 30,
            alignItems: 'center',
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 20,
        },
        manage_gyms: {
            backgroundColor: nav_primiry,
            width: '40%',
            height: 100,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
        },
        manage_button: {
            backgroundColor: nav_primiry,
            width: '40%',
            height: 100,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
        },
        button_text: {
            color: white,
            fontSize: 18,
            fontWeight: 'bold',
        },
        notice: {
            marginTop: 20,
            fontSize: 20,
            fontWeight: 'bold',
            color: gray,
        },
    })

    const { userdetails, setuserdetails } = useContext(UserDetails);

    const [Is_admin, setIs_admin] = useState(userdetails.is_admin);
    const [Is_member, setIs_member] = useState(userdetails.is_member);
    const [is_trainer, setis_trainer] = useState(userdetails.is_trainer);

    console.log(userdetails.is_admin)

    useEffect(() => {
        setIs_admin(userdetails.is_admin);
        setIs_member(userdetails.is_member);
        setis_trainer(userdetails.is_trainer);
    }, [userdetails])

    return (
        <View>
            <Text style={styles.page_headimg}>Management_tools</Text>
            {!is_trainer && !Is_admin ? <View >
                {/* add your gym */}
                <View style={styles.manage_gyms} >
                    <TouchableOpacity style={styles.manage_button} onPress={() => navigation.navigate('add_gym')}>
                        <Text style={styles.button_text}>Add Gyms</Text>
                    </TouchableOpacity>
                </View>
                <Text>or</Text>
                {/* ask to gym menager */}
                <Text style={styles.notice}>Ask your gym manager to add you as trainer</Text>
            </View>
                :
                <View style={styles.managment_tool} >
                    {/* management tools */}
                    <View style={styles.container}>
                        <View style={styles.manage_gyms} >
                            <TouchableOpacity style={styles.manage_button} onPress={() => navigation.navigate('HomePage')}>
                                <Text style={styles.button_text}>Manage Gyms</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.manage_gyms} >
                            <TouchableOpacity style={styles.manage_button} onPress={() => navigation.navigate('add_gym')}>
                                <Text style={styles.button_text}>Add Gyms</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default Management_tools