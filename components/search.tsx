import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FastImage from 'react-native-fast-image'
import { Svg, SvgXml } from 'react-native-svg'
import Popover from 'react-native-popover-view'
import Viewr_templet from './viewr_templet'
import { API_HOST } from '../config'
import FadeOutAlert from './fademessage'
import { ThemeContext } from './theamcontext'

const Search = () => {

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
        header: {
            width: '100%',
            height: 50,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
            padding: 10,
            color: nav_primiry,
        },
        heading_text: {
            fontSize: 20,
            fontWeight: 'bold',
            color: nav_primiry,
        },
        main_holder: {
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            justifyContent: 'flex-start',
            display: 'flex',
        },
        result_holder: {
            width: '85%',
            maxHeight: '50%',
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderTopWidth: 0,
            overflow: 'scroll',
        },
        search_input_filed: {
            width: '85%',
            height: 50,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 60,
            borderWidth: 1,
            borderRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            padding: 10,
            color: nav_primiry,
        },
        result: {
            width: '100%',
            height: 40,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
            borderBottomWidth: 1,
            borderRadius: 0,
            padding: 5,
            textAlign: 'left',
            textAlignVertical: 'center',
        },
        post_container: {
            width: '100%',
            height: 400,
            backgroundColor: '#ffffff',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10,
            padding: 10,
            color: nav_primiry,
        },
        post_header: {
            width: '100%',
            height: 50,
            backgroundColor: '#ffffff',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,
            padding: 10,
            color: nav_primiry,
            flexDirection: 'row',
        },
        post_header_left: {
            width: '50%',
            height: '100%',
            backgroundColor: '#ffffff',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 0,
            padding: 0,
            color: nav_primiry,
            flexDirection: 'row',
        },
        post_header_right: {
            width: '50%',
            height: '100%',
            backgroundColor: '#ffffff',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 0,
            padding: 0,
            color: nav_primiry,
            flexDirection: 'row',
        },
        post_profile_picture: {
            width: 30,
            height: 30,
            borderRadius: 50,
            marginRight: 10,
        },
        post_username: {
            fontSize: 14,
            fontWeight: 'bold',
            color: nav_primiry,
        },
        post_like_count: {
            fontSize: 14,
            fontWeight: 'bold',
            color: nav_primiry,
        },
        post_content: {
            width: '100%',
            height: 300,
            backgroundColor: '#ffffff',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 0,
            padding: 10,
            color: nav_primiry,
        },
        post_content_text: {
            fontSize: 14,
            fontWeight: 'bold',
            color: nav_primiry,
        },
        post_template_image: {
            width: '100%',
            height: 200,
            backgroundColor: '#ffffff',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 0,
            padding: 10,
            color: nav_primiry,
        },
        template_item: {
            width: '100%',
            height: 50,
            backgroundColor: '#ffffff',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,
            padding: 10,
            color: nav_primiry,
            flexDirection: 'row',
        },
        template_name: {
            fontSize: 14,
            fontWeight: 'bold',
            color: nav_primiry,
        },
        template_button_area: {
            width: '50%',
            height: '100%',
            backgroundColor: '#ffffff',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 0,
            padding: 0,
            color: nav_primiry,
            flexDirection: 'row',
        },
        template_button: {
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 0,
            padding: 0,
            color: nav_primiry,
            flexDirection: 'row',
        },

    })
    const [search_list, setSearch_list] = useState(['abce', 'template', 'runa', 'making', 'furiousa', 'hurculis', 'abce', 'template', 'runa', 'making', 'faurious', 'huarculis'])
    const [result, setResult] = React.useState(['...'])
    const [explore_list, setExplore_list] = useState([{ 'name': 'abc', 'content_type': 'post', 'content': '/media/user_images/user_11_is.jpeg', 'like_count': '5', 'username': 'user', 'profile_picture': '/media/user_images/user_11_bqqihi.jpeg', 'post_discription': 'discritption of post show', 'is_liked': false, 'id': 1 },
    { 'name': 'abc2', 'content_type': 'comunity_post', 'content': 'loreum ipsum sojs f sjfsdljdio fsfdfo', 'like_count': '5', 'username': 'user', 'profile_picture': '/media/user_images/user_11_bqqihi.jpeg', 'is_liked': false, 'id': 55 },
    { 'name': 'abc3', 'content_type': 'template', 'content': { '1': {}, '2': {} }, 'like_count': '5', 'username': 'user', 'profile_picture': '/media/user_images/user_11_bqqihi.jpeg', 'template_image': '/media/user_images/user_11_bqqihi.jpeg', 'template_name': 'template1', 'id': 2 },
    ])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [is_focused, setIs_focused] = useState(false)
    const show_results = (e: any) => {

        // get the value of the input field
        let value = e.nativeEvent.text
        if (value == '') {
            setResult(['...'])
            return
        }
        // filter the search_list
        setResult(search_list.filter((item) => {
            return item.includes(value.toLowerCase())
        }))
    }


    useEffect(() => {
        const setchachedResults = async () => {
            try {
                let list = await AsyncStorage.getItem('@ssearchResults')
                if (list != null) {
                    setSearch_list(JSON.parse(list))
                } else {
                    setSearch_list(['...'])
                }
            } catch (error) {
                setSearch_list(['...'])
            }
        }
        setchachedResults()


    }, [])


    const l_button_svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
       version="1.1"
       id="svg7940"
       width="65.096001"
       height="65.096001"
       viewBox="0 0 65.096001 65.096001"
       sodipodi:docname="26859.jpg"
       inkscape:export-filename="26859.svg"
       inkscape:export-xdpi="96"
       inkscape:export-ydpi="96"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs7944" />
      <sodipodi:namedview
         id="namedview7942"
         pagecolor="#ffffff"
         bordercolor="#000000"
         borderopacity="0.25"
         inkscape:showpageshadow="2"
         inkscape:pageopacity="0.0"
         inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1"
         showgrid="false" />
      <g
         inkscape:groupmode="layer"
         inkscape:label="Image"
         id="g7946">
        <path
           style="fill:none;stroke:#12012e;stroke-width:1.45138;stroke-dasharray:none;stroke-opacity:1;paint-order:markers stroke fill"
           d="M 5.6144384,43.008833 32.719763,18.890934 59.517075,42.667944 59.055031,29.628939 32.642734,6.0223762 6.3459479,29.756777 Z"
           id="path8186"
           sodipodi:nodetypes="ccccccc" />
        <path
           style="fill:none;stroke:#12012e;stroke-width:1.5;stroke-dasharray:none;stroke-opacity:1;paint-order:markers stroke fill"
           d="m 13.420178,56.509031 0.783228,-11.435311 18.4655,-15.06642 18.49813,15.08735 0.54386,11.09429 -19.07156,-15.05185 z"
           id="path8188"
           sodipodi:nodetypes="ccccccc" />
      </g>
    </svg>`;
    const l_button_svg_ld = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
       version="1.1"
       id="svg7940"
       width="65.096001"
       height="65.096001"
       viewBox="0 0 65.096001 65.096001"
       sodipodi:docname="26859.jpg"
       inkscape:export-filename="26859.svg"
       inkscape:export-xdpi="96"
       inkscape:export-ydpi="96"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs7944" />
      <sodipodi:namedview
         id="namedview7942"
         pagecolor="#ffffff"
         bordercolor="#000000"
         borderopacity="0.25"
         inkscape:showpageshadow="2"
         inkscape:pageopacity="0.0"
         inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1"
         showgrid="false" />
      <g
         inkscape:groupmode="layer"
         inkscape:label="Image"
         id="g7946">
        <path
           style="fill:${nav_primiry};stroke:#12012e;stroke-width:1.45138;stroke-dasharray:none;stroke-opacity:1;paint-order:markers stroke fill"
           d="M 5.6144384,43.008833 32.719763,18.890934 59.517075,42.667944 59.055031,29.628939 32.642734,6.0223762 6.3459479,29.756777 Z"
           id="path8186"
           sodipodi:nodetypes="ccccccc" />
        <path
           style="fill:${nav_primiry};stroke:#12012e;stroke-width:1.5;stroke-dasharray:none;stroke-opacity:1;paint-order:markers stroke fill"
           d="m 13.420178,56.509031 0.783228,-11.435311 18.4655,-15.06642 18.49813,15.08735 0.54386,11.09429 -19.07156,-15.05185 z"
           id="path8188"
           sodipodi:nodetypes="ccccccc" />
      </g>
    </svg>`;
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertmessage, setAlertmessage] = useState(' ');
    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };
    const assign_to = async (index: number, name_of_template: string, username: string) => {
        let token = await AsyncStorage.getItem('@token');
        // let username = await AsyncStorage.getItem('@username');
        fetch(`${API_HOST}/asign_template/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                asignTo: username,
                template_name: name_of_template,
            }),

        })
            .then((response) => response.json())
            .then((json) => {

                if (json['message'] == true) {
                    // Alert.alert('Asigned');
                    setAlertmessage('Asigned')
                    showAlert();


                } else {
                    setAlertmessage('Something went wrong')
                    showAlert();

                }
            })
    }

    const toggleLike = async (content_type: string, id: number) => {
        let token = await AsyncStorage.getItem('@token');
        // let username = await AsyncStorage.getItem('@username');
        fetch(`${API_HOST}/like/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                content_type: content_type,
                id: id,
            }),

        })
            .then((response) => response.json())
            .then((json) => {

                if (json['message'] == true) {
                    // Alert.alert('Asigned');
                    setAlertmessage('Liked')
                    showAlert();
                } else {
                    setAlertmessage('Something went wrong')
                    showAlert();
                }
            }
            )
    }
    return (
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.main_holder}>
            {alertVisible && (
                <View style={{ position: 'absolute', top: 250, width: '100%', zIndex: 100, alignSelf: 'center', justifyContent: 'center' }}>
                    <FadeOutAlert
                        message={alertmessage}
                        onHide={hideAlert}
                    />
                </View>
            )}
            <View style={styles.header}>
                <Text style={styles.heading_text}>GyM</Text>
            </View>
            <TextInput onBlur={() => { setIs_focused(false) }} onFocus={() => { setIs_focused(true) }} onChange={show_results} style={styles.search_input_filed} placeholder='Search' />
            <View style={styles.result_holder}>
                <ScrollView nestedScrollEnabled={true} contentInsetAdjustmentBehavior="automatic" >
                    {result.map((item, index) => {
                        return (
                            <Text key={index} style={styles.result}>{item}</Text>
                        )
                    })}
                    {/* <Text style={styles.result}>Result 1</Text>
                    <Text style={styles.result}>Result 2</Text>
                    <Text style={styles.result}>Result 3</Text>
                    <Text style={styles.result}>Result 4</Text>
                    <Text style={styles.result}>Result 5</Text>
                    <Text style={styles.result}>Result 6</Text>
                    <Text style={styles.result}>Result 1</Text>
                    <Text style={styles.result}>Result 2</Text>
                    <Text style={styles.result}>Result 3</Text>
                    <Text style={styles.result}>Result 4</Text>
                    <Text style={styles.result}>Result 5</Text>
                    <Text style={styles.result}>Result 6</Text> */}
                </ScrollView>
                <ScrollView style={{ width: '100%', height: '100%', display: (is_focused ? 'none' : 'flex') }} contentInsetAdjustmentBehavior="automatic" >
                    {explore_list.map((item, index) => {
                        return (
                            <View style={styles.post_container}>
                                <View style={styles.post_header}>
                                    <View style={styles.post_header_left}>
                                        <FastImage style={styles.post_profile_picture} source={{ uri: `${API_HOST}/${item.profile_picture}` }} />
                                        <Text style={styles.post_username}>{item.username}</Text>
                                    </View>
                                    <View style={styles.post_header_right}>
                                        <Text style={styles.post_like_count}>{item.like_count}</Text>
                                        {item.content_type == 'template' ? null : <>{item.is_liked ? <SvgXml xml={l_button_svg_ld} width={27} height={27} onPress={() => toggleLike(item.content_type, item.id)} /> : <SvgXml xml={l_button_svg} width={27} height={27} onPress={() => toggleLike(item.content_type, item.id)} />}</>}
                                    </View>
                                </View>
                                <View style={styles.post_content}>
                                    {item.content_type == 'post' && <Text style={styles.post_content_text}>{item.post_discription}</Text>}
                                    {item.content_type == 'comunity_post' && <Text style={styles.post_content_text}>{item.content as string}</Text>}
                                    {item.content_type == 'template' && <><Image style={styles.post_template_image} source={{ uri: `${API_HOST}/${item.template_image}` }} />
                                        <View key={index} style={styles.template_item}>
                                            <Text style={styles.template_name}>{item.template_name}</Text>
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
                                                            <Viewr_templet list_of_workout={item.content as {}} />
                                                        </View>
                                                    </Popover>
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
                                                    }} onPress={() => { assign_to(index, item.template_name as string, 'self') }}>
                                                        <Text style={{ fontSize: 14, color: black }}>Asign to </Text><Text style={{ fontSize: 14, color: black }}>{item.template_name as string}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View></>}
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </ScrollView>
    )
}




export default Search