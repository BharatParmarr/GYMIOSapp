import { View, Text, Touchable, TouchableOpacity, Alert, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Popover from 'react-native-popover-view'
import Viewr_templet from './viewr_templet'
import { ThemeContext } from './theamcontext'

const OfflinePage = ({ navigation }: any) => {
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
        main_container: {
            width: '100%',
            height: '100%',
            backgroundColor: bg_color,
            padding: 10,
        },
        template_container: {
            width: '100%',
            height: '100%',
            backgroundColor: bg_color,
            padding: 10,
        },
        template_item: {
            width: '100%',
            height: 200,
            backgroundColor: white,
            borderRadius: 10,
            marginBottom: 10,
            padding: 10,
            shadowColor: black,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,

        },
        template_name: {
            fontSize: 20,
            fontWeight: 'bold',
            color: black,
            marginBottom: 10,
        },
        template_button_area: {
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        template_button: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        template_start_button: {
            backgroundColor: white,
            padding: 10,
            borderRadius: 5,
            marginLeft: 10,
            shadowColor: black,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            width: '40%',
            alignItems: 'center'
        }
    })

    const [list_of_templates, setList_of_templates] = useState([] as any)

    useEffect(() => {
        const getTemplates = async () => {
            let list = []
            try {
                list = JSON.parse(await AsyncStorage.getItem('@template') as string)
                console.log(list, 'temo;ate list')
                setList_of_templates(list)
            } catch (e) {
                console.log(e)
                list = [{ 'no download': { 'no download': { 'name': 'no download', 'id': 'no download', 'description': 'no download', 'image': 'no download', 'price': 'no download', 'category': 'no download', 'tags': 'no download', 'type': 'no download', 'size': 'no download', 'download': 'no download', 'preview': 'no download', 'date': 'no download', 'author': 'no download', 'author_url': 'no download', 'compatibility': 'no download', 'resolution': 'no download', 'file_size': 'no download', 'files_included': 'no download', 'columns': 'no download', 'layout': 'no download', 'themeforest_url': 'no download', 'documentation': 'no download', 'video_preview': 'no download', 'rating': 'no download', 'sales': 'no download', 'price_currency': 'no download', 'comments': 'no download', 'last_update': 'no download', 'free': 'no download' } } }]
                setList_of_templates(list)
            }
        }
        getTemplates()
    }, [])
    return (
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.main_container}>

            <ScrollView contentContainerStyle={styles.template_container} nestedScrollEnabled={true}>

                {list_of_templates && list_of_templates.map((element: object, index: any) => {
                    return (
                        <View key={index} style={styles.template_item}>
                            <Text style={styles.template_name}>{Object.keys(element)[0]}</Text>
                            <View key={index} style={styles.template_button_area}>
                                <View style={styles.template_button}>
                                    <Popover
                                        arrowSize={{ width: 0, height: 0 }}
                                        popoverStyle={{ width: 450, height: 550 }}
                                        from={(
                                            <TouchableOpacity style={{
                                                backgroundColor: white,
                                                padding: 10,
                                                borderRadius: 5,
                                                marginLeft: 10,
                                                shadowColor: black,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,
                                                elevation: 5,
                                                width: '40%',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{ color: black }}>View</Text>
                                            </TouchableOpacity>
                                        )}
                                    >
                                        <View style={{
                                            width: '100%',
                                            backgroundColor: white,
                                            shadowColor: black,
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                            padding: 10,
                                        }}>
                                            <Viewr_templet list_of_workout={element[Object.keys(element)[0] as keyof typeof element]} />
                                        </View>
                                    </Popover>
                                    <TouchableOpacity style={styles.template_start_button} onPress={() => { navigation.navigate('start_workout', { workoutlist: element[Object.keys(element)[0] as keyof typeof element], day: 1 }); }}>
                                        <Text style={{ color: black }}>Start</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>)
                }
                )}
            </ScrollView>
        </ScrollView>
    )
}


export default OfflinePage