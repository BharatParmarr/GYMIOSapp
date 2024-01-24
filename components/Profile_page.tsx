import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Dimensions, RefreshControl, FlatList, Linking, PermissionsAndroid } from 'react-native';
import { Image as FastImage } from 'expo-image'
import { API_HOST } from '../config';
import Profile from './Profile';
import { assign, debounce, get, last, set, throttle } from 'lodash';
import Popover from 'react-native-popover-view';
import Viewr_templet from './viewr_templet';
import FadeOutAlert from './fademessage';
import { SvgXml } from 'react-native-svg';

import axios from 'axios';
import { Settheamcolor } from './theamcolorchanger';
import { Bestlift, ThemeContext, UserDetails } from './theamcontext';
import * as RNFS from 'expo-file-system';
import RNFetchBlob from 'rn-fetch-blob';
import { name_change } from './template';




const ProfileComponent = ({ navigation }: any) => {
    // check if user is login or not
    const [usernamestored, setUsernamestored] = useState('');

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



    useEffect(() => {
        async function checklogin() {
            try {
                if (await AsyncStorage.getItem('@username') == null || await AsyncStorage.getItem('@token') == null) {
                    navigation.navigate('login');
                }
            } catch (e) {
                console.log(e)
                navigation.navigate('login');
            }
            setUsernamestored(await AsyncStorage.getItem('@username') || '');
        }
        checklogin();
        // 
    }, [])
    // ui elements
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: bg_color,
            width: '100%',
        },
        profileHeader: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        profileImage: {
            width: 90,
            height: 90,
            borderRadius: 50,
        },
        profileDetails: {
            marginLeft: 30,
            alignSelf: 'flex-start',
        },
        profileName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: black,
        },
        profileRole: {
            fontSize: 14,
            color: gray,
        },
        profileBio: {
            display: 'flex',
            width: '100%',
            alignItems: 'flex-start',
            marginTop: 15,
            padding: 10,
            borderBottomColor: gray,
            borderBottomWidth: 1,
        },
        profileBio_text: {
            fontSize: 14,
            color: black,
        },
        profileButtons: {
            flexDirection: 'row',
            marginTop: 10,
        },
        first_buttons: {
            backgroundColor: nav_primiry,
            padding: 7,
            borderRadius: 5,
            marginRight: 10,
        },
        button_text: {
            fontSize: 14,
            color: '#fff',
        },
        follow_cont: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: 10,
            width: '100%',
            borderBottomColor: gray,
            borderBottomWidth: 1,
        },
        follow_cont_item: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        lable_text: {
            fontSize: 14,
            color: gray,
        },
        coun_text: {
            fontSize: 14,
            color: black,
        },
        post_holder: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 20,
        },
        post_img: {
            width: '100%',
            height: 'auto',
        }, workout_cart_item: {
            width: '100%',
            height: 150,
            backgroundColor: white,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 17,
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
            width: '30%',
            height: 22,
            backgroundColor: nav_primiry,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,

        },
        workout_cart_item_button_text: {
            fontSize: 15,
            fontWeight: 'bold',
            color: white,
        }, setting_icon: {
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 100,
        }

    });
    const { userdetails, setuserdetails } = useContext(UserDetails);
    useEffect(() => {
        setUsername(userdetails.username);
        setUserid(userdetails.userid);
        setEmail(userdetails.email);
        setIs_admin(userdetails.is_admin);
        setIs_member(userdetails.is_member);
        setis_trainer(userdetails.is_trainer);
        setis_private(userdetails.is_private);
        setFirst_name(userdetails.first_name);
        setLast_name(userdetails.last_name);
        setBio(userdetails.bio);
        setFollowers(userdetails.followers);
        setFollowing(userdetails.following);
        setPosts(userdetails.posts);
        setLinks(userdetails.link);
        setProfile_picture(userdetails.profile_pic);
    }, [userdetails])
    const { bestlift, setbestlift } = useContext(Bestlift);

    const [username, setUsername] = useState(userdetails.username)
    const [userid, setUserid] = useState(userdetails.userid)
    const [email, setEmail] = useState('')
    const [is_member, setIs_member] = useState(userdetails.is_member)
    const [is_admin, setIs_admin] = useState(userdetails.is_admin)
    const [is_trainer, setis_trainer] = useState(userdetails.is_trainer)
    const [is_private, setis_private] = useState(userdetails.is_private)
    const [first_name, setFirst_name] = useState(userdetails.first_name)
    const [last_name, setLast_name] = useState(userdetails.last_name)
    const [bio, setBio] = useState(userdetails.bio)
    const [followers, setFollowers] = useState(userdetails.followers)
    const [following, setFollowing] = useState(userdetails.following)
    const [posts, setPosts] = useState(userdetails.posts)
    const [Push_ups, setPush_ups] = useState(bestlift.Push_ups)
    const [bench_press, setBench_press] = useState(bestlift.bench_press)
    const [dead_lift, setDead_lift] = useState(bestlift.dead_lift)
    const [squat, setSquat] = useState(bestlift.squat)
    const [store, setStore] = useState('post')

    const [asign_workouts, set_asign_workouts] = useState<object[]>([])
    const [asign_workouts_name, set_asign_workouts_name] = useState<string[]>([])
    const [currenday_of_asign, setcurrenday_of_asign] = useState<string[]>([])
    const [showeditbutton, setshoweditbutton] = useState(false)
    const [links, setLinks] = useState('')
    const [profile_picture, setProfile_picture] = useState('')
    const [followers_list, setFollowers_list] = useState<string[]>([])
    const [following_list, setFollowing_list] = useState<string[]>([])
    const [gym_name, setGym_name] = useState('')
    const [gym_address, setGym_address] = useState('')

    const firstUpdate = useRef(true);
    const firstUpdate2 = useRef(true);



    const [alertVisible, setAlertVisible] = useState(false);
    const [alertmessage, setAlertmessage] = useState(' ');
    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

    // post data 
    const [post, setPost] = useState<{ id: number; uri: string; like: number; iscomment: boolean, comment: number; share: number; discription: string; height: number; isliked: boolean }[]>([
        { id: 1, uri: 'https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547?s=200', like: 100, iscomment: true, comment: 10, share: 10, discription: 'example post and trying something', height: 100, isliked: true },
        { id: 1, uri: 'https://images.unsplash.com/photo-1701964619678-36b35865e238?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', like: 100, iscomment: false, comment: 10, share: 10, discription: 'example post and trying something', height: 100, isliked: false },
        { id: 1, uri: 'https://miro.medium.com/v2/resize:fit:1200/1*HRqVf3HxHR4CvzwKnZTXNA.jpeg', like: 100, iscomment: false, comment: 10, share: 10, discription: 'example post and trying something', height: 100, isliked: false }])
    const [iseverything, setiseverything] = useState(false)


    const [list_of_workout_state, set_list_of_workout_state] = useState<{ [key: string]: { [key: string]: { name: string; set: number; reps: number; }[] } }>()
    useEffect(() => {
        function transformData(data: any) {
            type TransformedData = {
                [key: string]: any;
            };
            const transformedData: TransformedData = {};

            for (let key in data) {
                if (key.startsWith('obj1')) {
                    let newKey = data[key];
                    transformedData[newKey as string] = data[`obj7_${key.split('_')[1]}`];
                } else if (!key.startsWith('obj7') && !key.startsWith('obj8')) {
                    transformedData[key] = data[key];
                }
            }

            return transformedData;
        }
        // fatch data
        // get data from async storage
        const getdata = async () => {
            let token = await AsyncStorage.getItem('@token');
            let username = await AsyncStorage.getItem('@username');
            fetch(`${API_HOST}/${username}/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json['message'] == true) {
                        json = transformData(json)
                        // save token
                        console.log(json)
                        setUsername(json['username']);
                        setUserid(json['id']);
                        setEmail(json['email']);
                        setIs_member(json['is_member']);
                        setIs_admin(json['is_manager']);
                        setis_trainer(json['is_trainer']);

                        setBio(json['bio']);
                        setFirst_name(json['first_name']);
                        setLast_name(json['last_name']);
                        for (const i in json['bestlift']) {

                            if ((json['bestlift'][i] as unknown as { lift_type: string }).lift_type === 'bench_press') {
                                setBench_press((i as unknown as { lift_type: string }).lift_type ? String((i as unknown as { weight: number }).weight) : '0');
                            }
                            if ((json['bestlift'][i] as unknown as { lift_type: string }).lift_type === 'deadlift') {
                                setDead_lift((i as unknown as { lift_type: string }).lift_type ? String((i as unknown as { weight: number }).weight) : '0');
                            }
                            if ((json['bestlift'][i] as unknown as { lift_type: string }).lift_type === 'squat') {
                                setSquat((i as unknown as { lift_type: string }).lift_type ? String((i as unknown as { weight: number }).weight) : '0');
                            }
                            if ((json['bestlift'][i] as unknown as { lift_type: string }).lift_type === 'Push_up') {
                                setPush_ups((i as unknown as { lift_type: string }).lift_type ? String((i as unknown as { weight: number }).weight) : '0');
                            }

                        }
                        setLinks(json['links']);
                        if (json['profile_picture'] == null || json['profile_picture'] == 'null') {
                            setProfile_picture('https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png');
                        } else {
                            setProfile_picture(API_HOST + '/' + json['profile_picture']);
                        }
                        setuserdetails({
                            userid: json['id'],
                            username: json['username'],
                            email: json['email'],
                            bio: json['bio'],
                            is_member: json['is_member'],
                            is_admin: json['is_manager'],
                            is_trainer: json['is_trainer'],
                            is_private: json['is_private'],
                            first_name: json['first_name'],
                            last_name: json['last_name'],
                            followers: json['followers_count'],
                            following: json['following_count'],
                            posts: json['images_count'],
                            profile_pic: json['profile_picture'],
                            link: json['links'],

                        })
                        setFollowers(json['followers_count']);
                        setFollowing(json['following_count']);
                        setFollowers_list(json['followers']);
                        setFollowing_list(json['following']);
                        setPosts(json['images_count']);
                        if (json.hasOwnProperty('iseverything')) {
                            setiseverything(json['iseverything'])
                        } else {
                            setiseverything(false)
                        }
                        let images: object[] = json['images'].map((element: any, index: number) => {
                            if (element['image'] == null || element['image'] == 'null') {
                                return null;
                            } else {
                                return { id: element['id'], uri: `${API_HOST}${element['image']}`, like: element['likes'].length, isliked: element['likes'].some((obj: { user: any; }) => obj.user === json['id']), iscomment: element['iscommnet'], comment: 10, share: 10, discription: 'example post and trying something', height: 100 }
                            }
                        }).filter((element: any) => {
                            if (element == null) {
                                return false;
                            } else {
                                return true;
                            }
                        })
                        const handleImageDimensions = async () => {
                            let datadeepcopy = JSON.parse(JSON.stringify(images))
                            const modifiedData = await Promise.all(
                                datadeepcopy.map(async (item: any) => {
                                    if (!item.uri || item.uri == null || item.uri == 'null') return item;
                                    const calculatedHeight = await new Promise<number>((resolve, reject) => {
                                        Image.getSize(item.uri, (width, height) => {
                                            const screenWidth = Dimensions.get('window').width;
                                            const calculatedHeight = screenWidth * (height / width);
                                            resolve(calculatedHeight);
                                        }, reject);
                                    });
                                    return { ...item, height: calculatedHeight };
                                })
                            );
                            setPost(modifiedData);
                            setShouldRunEffect(false);
                            setLikedPosts(modifiedData.reduce((acc, curr) => {
                                acc[curr.id] = curr.isliked;
                                return acc;
                            }, {} as { [key: string]: boolean }));
                        };


                        handleImageDimensions();
                        const fech_assign_template = async () => {
                            fetch(`${API_HOST}/asign_template/`, {
                                method: 'get',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${token}`,
                                }
                            },
                            ).then((response) => response.json())
                                .then((json) => {
                                    if (json['message'] == true) {
                                        for (let key in json['template_data']) {
                                            set_asign_workouts((prev) => [...prev, json['exercise'][json['template_data'][key]]]);
                                            set_asign_workouts_name((prev) => [...prev, json['template_data'][key]]);
                                            setcurrenday_of_asign((prev) => [...prev, json['current_day'][json['template_data'][key]]]);
                                        }
                                        setAlertmessage('Asigned Template feched')
                                        showAlert();
                                    } else {
                                        setAlertmessage('Something went wrong')
                                        showAlert();
                                    }
                                })
                                .catch((e) => {
                                    console.log(e);
                                    setAlertmessage('Something went wrong')
                                    showAlert();
                                });
                        }
                        fech_assign_template();
                        AsyncStorage.setItem('@dataofuser', JSON.stringify(json));

                    } else {
                        setAlertmessage(json['message'])
                        showAlert();
                    }
                })
                .catch((e) => {
                    console.log(e);
                    setAlertmessage('Something went wrong')
                    showAlert();
                });
        }
        getdata();


        const get_workout_templates = async () => {
            let token = await AsyncStorage.getItem('@token');
            fetch(`${API_HOST}/workout_template/`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },

            })
                .then((response) => response.json())
                .then((json) => {
                    if (json['message'] == true) {
                        console.log(json['data'], 'workout template data')
                        set_list_of_workout_state(json['data']);
                    } else {
                        Alert.alert(json['message']);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    Alert.alert('Something went wrong');
                });
        }
        get_workout_templates();

        //     getdata2();
        setshoweditbutton(true)
    }, []);
    const scrollViewRef = useRef<ScrollView>(null);
    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const midpoint = contentOffset.x + layoutMeasurement.width / 2; // Midpoint of the screen
        let targetIndex;

        if (midpoint < contentSize.width / 3) {
            targetIndex = 0; // Closest to the first view
        } else if (midpoint < 2 * contentSize.width / 3) {
            targetIndex = 1; // Closest to the second view
        } else {
            targetIndex = 2; // Closest to the third view
        }

        if (scrollViewRef.current) {

            scrollViewRef.current.scrollTo({
                x: targetIndex * layoutMeasurement.width,
                animated: true,
            });
            setStore(targetIndex == 0 ? 'post' : targetIndex == 1 ? 'workout' : 'template')
        }
    };


    useEffect(() => {
        if (scrollViewRef.current) {
            if (store == 'post') {
                scrollViewRef.current.scrollTo({
                    x: 0,
                    animated: true,
                });
            }
            else if (store == 'workout') {
                scrollViewRef.current.scrollTo({
                    x: Dimensions.get('window').width - 20,
                    animated: true,
                });
            }
            else if (store == 'template') {
                scrollViewRef.current.scrollTo({
                    x: Dimensions.get('window').width * 2 - 20,
                    animated: true,
                });
            }
        }
    }, [store]);

    const [list_of_members, set_list_of_members] = useState<string[]>([])
    useEffect(() => {
        if (is_trainer || is_admin) {
            const get_list_of_members = async () => {
                let token = await AsyncStorage.getItem('@token');
                fetch(`${API_HOST}/list_of_members/`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json['message'] == true) {
                            set_list_of_members(json['data']);
                        }
                    }
                    )
            }
            get_list_of_members();
        } else {
            set_list_of_members([username])
        }
    }, [, is_trainer, is_admin, username])

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        function transformData(data: any) {
            type TransformedData = {
                [key: string]: any;
            };
            const transformedData: TransformedData = {};

            for (let key in data) {
                if (key.startsWith('obj1')) {
                    let newKey = data[key];
                    transformedData[newKey as string] = data[`obj7_${key.split('_')[1]}`];
                } else if (!key.startsWith('obj7') && !key.startsWith('obj8')) {
                    transformedData[key] = data[key];
                }
            }

            return transformedData;
        }
        const getdata = async () => {
            let token = await AsyncStorage.getItem('@token');
            let username = await AsyncStorage.getItem('@username');
            fetch(`${API_HOST}/${username}/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json['message'] == true) {
                        json = transformData(json)
                        // save token
                        console.log(json)
                        setUsername(json['username']);
                        setUserid(json['id']);
                        setEmail(json['email']);
                        setIs_member(json['is_member']);
                        setIs_admin(json['is_manager']);
                        setis_trainer(json['is_trainer']);

                        setBio(json['bio']);
                        setFirst_name(json['first_name']);
                        setLast_name(json['last_name']);
                        for (const i in json['bestlift']) {

                            if ((json['bestlift'][i] as unknown as { lift_type: string }).lift_type === 'bench_press') {
                                setBench_press((i as unknown as { lift_type: string }).lift_type ? String((i as unknown as { weight: number }).weight) : '0');
                            }
                            if ((json['bestlift'][i] as unknown as { lift_type: string }).lift_type === 'deadlift') {
                                setDead_lift((i as unknown as { lift_type: string }).lift_type ? String((i as unknown as { weight: number }).weight) : '0');
                            }
                            if ((json['bestlift'][i] as unknown as { lift_type: string }).lift_type === 'squat') {
                                setSquat((i as unknown as { lift_type: string }).lift_type ? String((i as unknown as { weight: number }).weight) : '0');
                            }
                            if ((json['bestlift'][i] as unknown as { lift_type: string }).lift_type === 'Push_up') {
                                setPush_ups((i as unknown as { lift_type: string }).lift_type ? String((i as unknown as { weight: number }).weight) : '0');
                            }

                        }
                        setLinks(json['links']);
                        if (json['profile_picture'] == null || json['profile_picture'] == 'null') {
                            setProfile_picture('https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png');
                        } else {
                            setProfile_picture(API_HOST + '/' + json['profile_picture']);
                        }
                        setuserdetails({
                            userid: json['id'],
                            username: json['username'],
                            email: json['email'],
                            bio: json['bio'],
                            is_member: json['is_member'],
                            is_admin: json['is_manager'],
                            is_trainer: json['is_trainer'],
                            is_private: json['is_private'],
                            first_name: json['first_name'],
                            last_name: json['last_name'],
                            followers: json['followers_count'],
                            following: json['following_count'],
                            posts: json['images_count'],
                            profile_pic: json['profile_picture'] == null ? `${API_HOST}${json['profile_picture']}` : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                            link: json['links'],

                        })
                        setFollowers(json['followers_count']);
                        setFollowing(json['following_count']);
                        setFollowers_list(json['followers']);
                        setFollowing_list(json['following']);
                        setPosts(json['images_count']);
                        if (json.hasOwnProperty('iseverything')) {
                            setiseverything(json['iseverything'])
                        } else {
                            setiseverything(false)
                        }
                        let images: object[] = json['images'].map((element: any, index: number) => {
                            if (element['image'] == null || element['image'] == 'null') {
                                return null;
                            } else {
                                return { id: element['id'], uri: `${API_HOST}${element['image']}`, like: element['likes'].length, isliked: element['likes'].some((obj: { user: any; }) => obj.user === json['id']), iscomment: element['iscommnet'], comment: 10, share: 10, discription: 'example post and trying something', height: 100 }
                            }
                        }).filter((element: any) => {
                            if (element == null) {
                                return false;
                            } else {
                                return true;
                            }
                        })
                        const handleImageDimensions = async () => {
                            let datadeepcopy = JSON.parse(JSON.stringify(images))
                            const modifiedData = await Promise.all(
                                datadeepcopy.map(async (item: any) => {
                                    if (!item.uri || item.uri == null || item.uri == 'null') return item;
                                    const calculatedHeight = await new Promise<number>((resolve, reject) => {
                                        Image.getSize(item.uri, (width, height) => {
                                            const screenWidth = Dimensions.get('window').width;
                                            const calculatedHeight = screenWidth * (height / width);
                                            resolve(calculatedHeight);
                                        }, reject);
                                    });
                                    return { ...item, height: calculatedHeight };
                                })
                            );
                            setPost(modifiedData);
                            setShouldRunEffect(false);
                            setLikedPosts(modifiedData.reduce((acc, curr) => {
                                acc[curr.id] = curr.isliked;
                                return acc;
                            }, {} as { [key: string]: boolean }));
                        };


                        handleImageDimensions();
                        const fech_assign_template = async () => {
                            fetch(`${API_HOST}/asign_template/`, {
                                method: 'get',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${token}`,
                                }
                            },
                            ).then((response) => response.json())
                                .then((json) => {
                                    if (json['message'] == true) {
                                        for (let key in json['template_data']) {
                                            set_asign_workouts((prev) => [...prev, json['exercise'][json['template_data'][key]]]);
                                            set_asign_workouts_name((prev) => [...prev, json['template_data'][key]]);
                                            setcurrenday_of_asign((prev) => [...prev, json['current_day'][json['template_data'][key]]]);
                                        }
                                        setAlertmessage('Asigned Template feched')
                                        showAlert();
                                    } else {
                                        setAlertmessage('Something went wrong')
                                        showAlert();
                                    }
                                })
                                .catch((e) => {
                                    console.log(e);
                                    setAlertmessage('Something went wrong')
                                    showAlert();
                                });
                        }
                        fech_assign_template();
                        AsyncStorage.setItem('@dataofuser', JSON.stringify(json));

                    } else {
                        setAlertmessage(json['message'])
                        showAlert();
                    }
                })
                .catch((e) => {
                    console.log(e);
                    setAlertmessage('Something went wrong')
                    showAlert();
                });
        }
        getdata();


        const get_workout_templates = async () => {
            let token = await AsyncStorage.getItem('@token');
            fetch(`${API_HOST}/workout_template/`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },

            })
                .then((response) => response.json())
                .then((json) => {
                    if (json['message'] == true) {
                        console.log(json['data'], 'workout template data')
                        set_list_of_workout_state(json['data']);
                    } else {
                        Alert.alert(json['message']);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    Alert.alert('Something went wrong');
                });
        }
        get_workout_templates();
        setPage(1);
        return () => {
            // setRefreshing(false);
        };

    }, [refreshing]);


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
    </svg>`

    let setting_svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none"></rect>
    <line x1="80" y1="48" x2="80" y2="208" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
    <line x1="176" y1="48" x2="176" y2="208" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
    <circle cx="128" cy="128" r="48" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle>
    <circle cx="128" cy="128" r="80" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle>
    </svg>`

    const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>(
        post.reduce((acc, curr) => {
            acc[curr.id] = curr.isliked;
            return acc;
        }, {} as { [key: string]: boolean })
    );
    const [shouldRunEffect, setShouldRunEffect] = useState(true);
    const axiosSource = axios.CancelToken.source();

    const toggleLike = (postId: number) => {
        setShouldRunEffect(true);
        setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [postId]: !prevLikedPosts[postId],
        }));
    };

    useEffect(() => {
        if (!shouldRunEffect) {
            setShouldRunEffect(true);
            return;
        }
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        const likeChanged = async () => {

            try {
                // Iterate over likedPosts and perform async operations
                for (const postId in likedPosts) {
                    if (likedPosts[postId] !== post.find((p) => p.id === Number(postId))?.isliked) {
                        // Like the post and save the like in the database
                        const response = await axios.post(
                            `${API_HOST}/post/user_images_likes/`,
                            { image: postId },
                            {
                                cancelToken: axiosSource.token,
                                headers: {
                                    Authorization: 'Token ' + (await AsyncStorage.getItem('@token')),
                                    'Content-Type': 'application/json',
                                },
                            }
                        );
                        if (response.status === 201 || response.status === 200) {
                            setAlertmessage('Liked');
                            showAlert();
                        }
                    }
                }

                // Change the like count
                setPost((prevPosts) => {
                    return prevPosts.map((post) => {
                        const postId = post.id.toString();
                        if (likedPosts[postId] !== post.isliked) {
                            return {
                                ...post,
                                like: likedPosts[postId] ? post.like + 1 : post.like - 1,
                                isliked: !post.isliked,
                            };
                        }
                        return post;
                    });
                });
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.log(error);
                    // handle error
                }
            }
        };

        likeChanged();

        return () => {
            axiosSource.cancel('Operation canceled by the user.');
        };
    }, [likedPosts]);



    const [refreshingscroll, setRefreshingscroll] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1); // Track the current page
    const [hasMoreData, setHasMoreData] = useState(true);


    useEffect(() => {
        if (firstUpdate2.current) {
            firstUpdate2.current = false;
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_HOST}/userimages?page=${page}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                    },
                });
                const newData = await response.json();
                // Update the data state
                // setPost((prevPosts) => [...prevPosts, ...newData]);
                if (newData.length == 0 || newData['message']) {
                    setHasMoreData(false);
                    return;
                }
                let json = { 'images': [...post, ...newData['data']], 'id': userid }
                if (page == 1) {
                    json = { 'images': newData['data'], 'id': userid }
                }
                let images: (object | null)[] = json['images'].map((element: any, index: number) => {
                    if (element['image'] == null || element['image'] == 'null') {
                        return null;
                    } else {
                        return { id: element['id'], uri: `${API_HOST}${element['image']}`, like: element['likes'].length, isliked: element['likes'].some((obj: { user: any; }) => obj.user === json['id']), iscomment: element['iscommnet'], comment: 10, share: 10, discription: 'example post and trying something', height: 100 }
                    }
                }).filter((element: any) => {
                    if (element == null) {
                        return false;
                    } else {
                        return true;
                    }
                })
                const handleImageDimensions = async () => {
                    let datadeepcopy = JSON.parse(JSON.stringify(images))
                    const modifiedData = await Promise.all(
                        datadeepcopy.map(async (item: any) => {
                            if (!item.uri || item.uri == null || item.uri == 'null') return item;
                            const calculatedHeight = await new Promise<number>((resolve, reject) => {
                                Image.getSize(item.uri, (width, height) => {
                                    const screenWidth = Dimensions.get('window').width;
                                    const calculatedHeight = screenWidth * (height / width);
                                    resolve(calculatedHeight);
                                }, reject);
                            });
                            return { ...item, height: calculatedHeight };
                        })
                    );
                    setPost(modifiedData);
                    setShouldRunEffect(false);
                    setLikedPosts(modifiedData.reduce((acc, curr) => {
                        acc[curr.id] = curr.isliked;
                        return acc;
                    }, {} as { [key: string]: boolean }));
                };


                handleImageDimensions();
                // Set refreshing and loadingMore to false after data is fetched
                setRefreshingscroll(false);
                setLoadingMore(false);
            } catch (error) {
                setAlertmessage('Something went wrong')
                showAlert();
                // Handle error as needed
                setRefreshing(false);
                setLoadingMore(false);
            }
        };
        fetchData();
    }, [page]); // Trigger fetch when page changes

    const handleRefresh = () => {
        setRefreshing(true);
        // Reset page to 1 to fetch the initial data
        setPage(1);
    };

    const handleLoadMore = () => {
        // Check if already loading more or refreshing
        if (loadingMore || refreshingscroll || !hasMoreData) {
            return;
        }
        setLoadingMore(true);
        // Increment the page to fetch the next set of data
        setPage((prevPage) => prevPage + 1);
    };

    const onScroll = (event: any) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

        // Load more data when the user is near the end of the scroll view
        if (isCloseToBottom) {
            handleLoadMore();
        }
    };


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
        return tempname
    }

    const Download_template = async (item: object, element: string) => {
        console.log(item, element)
        let list = [{ 'name': { '1': [{ 'name': '1' }] } }]
        try {
            list = JSON.parse(await AsyncStorage.getItem('@template') as string)
            console.log(list, 'temo;ate list')
        } catch (e) {
            console.log(e)
            list = []
        }
        // Request storage permissions
        try {

            // Permission granted, proceed to download
            Object.keys(item).forEach(async (key) => {
                (item as { [key: string]: any })[key].map(async (key2: object) => {
                    const downloadDest = `${RNFS.documentDirectory}/gym/${name_change((key2 as { name: string })['name'])}.jpg`;

                    const response = await RNFS.downloadAsync(
                        `${API_HOST}/media/exercise_images/${name_change((key2 as { name: string })['name'])}`,
                        downloadDest
                    );

                    if (response.status === 200) {
                        // File was downloaded
                        // console.log('File downloaded to ', response.uri);
                    } else {
                        // Download failed
                        // console.log('Download failed');
                    }
                })

            });
            let temp: { [key: string]: any } = {}; // Replace 'object' with the appropriate type
            temp[element] = item;
            if (list === null) {
                list = [];
            }
            list.push(temp as any);
            await AsyncStorage.setItem('@template', JSON.stringify(list));
            setAlertmessage('Template Downloaded')
            showAlert();

        } catch (err) {
            console.log(err);
            console.warn(err);
        }
    }




    return (
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            <View style={styles.container}>
                {alertVisible && (
                    <View style={{ position: 'absolute', top: 250, width: '100%', zIndex: 100, alignSelf: 'center', justifyContent: 'center' }}>
                        <FadeOutAlert
                            message={alertmessage}
                            onHide={hideAlert}
                        />
                    </View>
                )}
                <View style={styles.setting_icon} >
                    <TouchableOpacity onPress={() => { navigation.navigate('Setting') }}>
                        <SvgXml xml={setting_svg} width={30} height={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileHeader}>
                    <FastImage style={styles.profileImage} source={{ uri: profile_picture }} />
                    <View style={styles.profileDetails}>
                        <Text style={styles.profileName}>{username}</Text>
                        {is_member && <Text style={styles.profileRole}>member</Text>}
                        {is_admin && <Text style={styles.profileRole}>admin</Text>}
                        {is_trainer && <Text style={styles.profileRole}>staff</Text>}
                        <View style={styles.profileButtons}>
                            <TouchableOpacity onPress={() => {
                                setAlertmessage('Followed')
                                showAlert();
                                navigation.navigate('OfflinePage')
                            }} style={styles.first_buttons}>
                                <Text style={styles.button_text}>Follow</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Message_list'); }} style={styles.first_buttons}>
                                <Text style={styles.button_text} > Messages</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.profileBio}>
                        <Text style={styles.profileBio_text}>{bio}</Text>
                        {/* link */}
                        <View style={{ flexDirection: 'row', marginTop: 10, width: '100%', alignContent: 'flex-start', alignItems: 'flex-start' }}>
                            <TouchableOpacity onPress={() => {
                                let url = links;
                                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                                    url = `http://${url}`;
                                }
                                Linking.openURL(url);
                            }} style={{ backgroundColor: white, padding: 2, borderRadius: 3, paddingLeft: 4, paddingRight: 4 }}>
                                <Text style={{ fontSize: 14, color: 'blue' }}>{links}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.follow_cont}>
                        <View style={styles.follow_cont_item}>
                            <Text style={styles.lable_text}>Posts</Text>
                            <Text style={styles.coun_text}>{posts}</Text>
                        </View>
                        <View style={styles.follow_cont_item}>
                            <Text style={styles.lable_text}>Followers</Text>
                            <Text style={styles.coun_text}>{followers}</Text>
                        </View>
                        <View style={styles.follow_cont_item}>
                            <Text style={styles.lable_text}>Following</Text>
                            <Text style={styles.coun_text}>{following}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.follow_cont}>
                    <View style={styles.follow_cont_item}>
                        <Text style={styles.lable_text}>Push Ups</Text>
                        <Text style={styles.coun_text}>{Push_ups}</Text>
                    </View>
                    <View style={styles.follow_cont_item}>
                        <Text style={styles.lable_text}>Bench Press</Text>
                        <Text style={styles.coun_text}>{bench_press}</Text>
                    </View>
                    <View style={styles.follow_cont_item}>
                        <Text style={styles.lable_text}>Dead Lift</Text>
                        <Text style={styles.coun_text}>{dead_lift}</Text>
                    </View>
                    <View style={styles.follow_cont_item}>
                        <Text style={styles.lable_text}>Squat</Text>
                        <Text style={styles.coun_text}>{squat}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, width: '100%', marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => { setStore('post') }} style={{ backgroundColor: store == 'post' ? nav_primiry : white, padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 14, color: store == 'post' ? white : black }}>Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setStore('workout') }} style={{ backgroundColor: store == 'workout' ? nav_primiry : white, padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 14, color: store == 'workout' ? white : black }}>Workouts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setStore('template') }} style={{ backgroundColor: store == 'template' ? nav_primiry : white, padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 14, color: store == 'template' ? white : black }}>Templates</Text>
                    </TouchableOpacity>
                </View>
                {showeditbutton && <>
                    <View style={{ width: '100%', backgroundColor: gray, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', padding: 10 }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('EditProfile', {
                                username: username,
                                firstName: first_name,
                                lastName: last_name,
                                bio: bio,
                                links: links,
                                profilePicture: profile_picture,
                                isPrivate: is_private,
                            });
                        }} style={{ width: '33.33%', backgroundColor: nav_primiry, alignContent: 'center', justifyContent: 'center', padding: 5, borderRadius: 4 }}>
                            <Text style={{ textAlign: 'center', color: white }}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '33.33%', backgroundColor: nav_primiry, alignContent: 'center', justifyContent: 'center', padding: 5, borderRadius: 4 }}>
                            <Text style={{ textAlign: 'center', color: white }}>
                                Placeholder
                            </Text>
                        </TouchableOpacity>
                    </View></>}
                <ScrollView ref={scrollViewRef} contentContainerStyle={{ display: 'flex', flexDirection: 'row', width: '300%', justifyContent: 'space-around', marginBottom: 50, height: 900 }} nestedScrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={handleScroll}>
                    {/* <View style={{ display: 'flex', flexDirection: 'row', width: '100%', overflow: 'scroll' }}> */}
                    <View style={{ width: '33.33%' }}>
                        <ScrollView nestedScrollEnabled={true} onScroll={onScroll}>
                            {iseverything ? <>{post.map((element, index) => (
                                <View key={index} style={styles.post_holder}>
                                    <Image style={{ height: element['height'], width: '100%' }} source={{ uri: element['uri'] }} />
                                    {/* <Text style={styles.coun_text}>{element['discription']}</Text> */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '90%', alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: '10%', marginTop: 7 }}>
                                            {/* {element['isliked'] ? <SvgXml xml={l_button_svg_ld} width={27} height={27} onPress={() => { }} /> : <SvgXml xml={l_button_svg} width={27} height={27} onPress={() => { }} />} */}
                                            {likedPosts[element.id] ? <SvgXml xml={l_button_svg_ld} width={27} height={27} onPress={() => toggleLike(element.id)} /> : <SvgXml xml={l_button_svg} width={27} height={27} onPress={() => toggleLike(element.id)} />}
                                            <Text style={{ fontSize: 11, alignSelf: 'center', color: gray }}>{element['like']}</Text>
                                        </View>
                                        {element['iscomment'] && <Text>{element['comment']}</Text>}
                                        <Text>{element['share']}</Text>
                                    </View>
                                </View>
                            ))}</> : <>{post.map((element, index) => (
                                <View key={index} style={styles.post_holder}>
                                    <Image style={{ height: element['height'], width: '100%' }} source={{ uri: element['uri'] }} />
                                    {/* <Text style={styles.coun_text}>{element['discription']}</Text> */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '90%', alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', marginTop: 7, borderWidth: 0 }}>
                                            {likedPosts[element.id] ? <SvgXml xml={l_button_svg_ld} width={27} height={27} onPress={() => toggleLike(element.id)} /> : <SvgXml xml={l_button_svg} width={27} height={27} onPress={() => toggleLike(element.id)} />}
                                            <Text style={{ fontSize: 11, alignSelf: 'center', color: gray }}>{element['like']}</Text>
                                        </View>
                                        {element['iscomment'] && <Text>{element['comment']}</Text>}
                                        <Text> </Text>
                                        <Text> </Text>

                                    </View>
                                </View>
                            ))}</>}
                        </ScrollView>
                    </View>
                    <View style={{ display: 'flex', width: '33.33%', backgroundColor: black, height: '100%', padding: 10, borderRadius: 5, marginTop: 12 }}>
                        <ScrollView nestedScrollEnabled={true}>
                            {asign_workouts_name.map((item, index) => {
                                return <View key={index} style={styles.workout_cart_item}>
                                    {/* <View style={{ width: '30.5%', height: '80%', justifyContent: 'center' }}>
                                <FastImage style={styles.workout_cart_item_image} source={{ uri: `${API_HOST}/media/exercise_images/${name_change((item as { name: string })['name'])}` }} />
                            </View> */}
                                    <View style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                                        <Text style={styles.workout_cart_item_name}>{item} {asign_workouts.join(', ')}</Text>
                                        {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 1) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{item['set']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 3) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 2) }}><Text style={Styles.workout_cart_item_button_text}> - </Text></TouchableOpacity><Text style={Styles.number_holder}>{item['reps']}</Text><TouchableOpacity style={Styles.workout_cart_item_button} onPress={() => { minasfromset(index, 4) }}><Text style={Styles.workout_cart_item_button_text}>+</Text></TouchableOpacity></View> */}
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 2 }}><TouchableOpacity style={styles.workout_cart_item_button} onPress={() => { navigation.navigate('start_workout', { workoutlist: asign_workouts[index], day: currenday_of_asign[index] }); }}><Text style={styles.workout_cart_item_button_text}>Start Workout </Text></TouchableOpacity></View>
                                    </View>
                                </View>
                            })}
                            {list_of_workout_state && Object.keys(list_of_workout_state).map((element, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'column', alignItems: 'center', marginTop: 15, marginBottom: 5, backgroundColor: white, width: '100%', borderRadius: 5 }}>
                                        <Text style={{ fontSize: 14, color: black }}>{element}</Text>
                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', padding: 10, alignItems: 'center' }}>
                                            <View style={{ width: '99%', padding: 10, flexDirection: 'row' }}>
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
                                                        <Viewr_templet list_of_workout={list_of_workout_state[element]} />
                                                    </View>
                                                </Popover>
                                                <Popover
                                                    arrowSize={{ width: 0, height: 0 }}
                                                    popoverStyle={{ width: 450 }}
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

                                                            <Text style={{ color: black }}>Asign</Text>
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
                                                        <FlatList data={list_of_members} renderItem={({ item, index }) => {
                                                            return (
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 10 }}>
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
                                                                    }} onPress={() => { assign_to(index, element, item) }}>
                                                                        <Text style={{ fontSize: 14, color: black }}>Asign to </Text><Text style={{ fontSize: 14, color: black }}>{item}</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )
                                                        }} />
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
                                                }} onPress={() => { Download_template(list_of_workout_state[element], element) }}>
                                                    <Text style={{ color: black }}>Download</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>)
                            })}
                        </ScrollView>
                    </View>
                    <View style={{ width: '33.2%', backgroundColor: gray, height: '100%' }}>
                        <ScrollView nestedScrollEnabled={true}>
                            <Profile navigation={navigation} />
                        </ScrollView>
                    </View>

                    {/* </View> */}
                </ScrollView>
            </View>
        </ScrollView >
    );
};



// dark
// let nav_primiry = '#480cfe'
// let white = '#000000'
// let black = '#ffffff'
// let gray = '#808080'
// let bg_color = '#1e1e1e'

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor: bg_color,
//         width: '100%',
//     },
//     profileHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     profileImage: {
//         width: 90,
//         height: 90,
//         borderRadius: 50,
//     },
//     profileDetails: {
//         marginLeft: 30,
//         alignSelf: 'flex-start',
//     },
//     profileName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: black,
//     },
//     profileRole: {
//         fontSize: 14,
//         color: gray,
//     },
//     profileBio: {
//         display: 'flex',
//         width: '100%',
//         alignItems: 'flex-start',
//         marginTop: 15,
//         padding: 10,
//         borderBottomColor: gray,
//         borderBottomWidth: 1,
//     },
//     profileBio_text: {
//         fontSize: 14,
//         color: black,
//     },
//     profileButtons: {
//         flexDirection: 'row',
//         marginTop: 10,
//     },
//     first_buttons: {
//         backgroundColor: nav_primiry,
//         padding: 7,
//         borderRadius: 5,
//         marginRight: 10,
//     },
//     button_text: {
//         fontSize: 14,
//         color: '#fff',
//     },
//     follow_cont: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         padding: 10,
//         width: '100%',
//         borderBottomColor: gray,
//         borderBottomWidth: 1,
//     },
//     follow_cont_item: {
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     lable_text: {
//         fontSize: 14,
//         color: gray,
//     },
//     coun_text: {
//         fontSize: 14,
//         color: black,
//     },
//     post_holder: {
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         marginTop: 20,
//     },
//     post_img: {
//         width: '100%',
//         height: 'auto',
//     }, workout_cart_item: {
//         width: '100%',
//         height: 150,
//         backgroundColor: white,
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         flexDirection: 'row',
//         gap: 10,
//         borderWidth: 1,
//         borderColor: white,
//         overflow: 'hidden',
//         borderRadius: 7,
//     },
//     workout_cart_item_image: {
//         width: '90%',
//         height: '90%',
//         alignSelf: 'center',
//         borderRadius: 7,
//         justifyContent: 'center',
//     },
//     workout_cart_item_name: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: black,
//         overflow: 'hidden',
//         width: '100%',
//         alignItems: 'center',
//         flexWrap: 'wrap',
//         alignSelf: 'center',
//     },
//     workout_cart_item_button: {
//         width: '30%',
//         height: 22,
//         backgroundColor: nav_primiry,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 7,

//     },
//     workout_cart_item_button_text: {
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: white,
//     }, setting_icon: {
//         position: 'absolute',
//         top: 10,
//         right: 10,
//         zIndex: 100,
//     }

// });

export default ProfileComponent;




// comments

// useEffect(() => {
//     type datafiled1 = { 'username': string, 'email': string, 'is_member': boolean, 'is_admin': boolean, 'is_trainer': boolean, 'first_name': string, 'last_name': string };
//     let Data1 = { 'username': '', 'email': '', 'is_member': true, 'is_admin': false, 'is_trainer': false, 'first_name': '', 'last_name': '' };
//     try {
//         const getDataofuser = async () => {
//             const value = await AsyncStorage.getItem('@dataofuser');
//             if (value !== null) {
//                 // value previously stored
//                 Data1 = JSON.parse(value) || Data1;
//                 return JSON.parse(value) as datafiled1;
//             }
//         }
//         getDataofuser();
//         setUsername(Data1['username'])
//         setEmail(Data1['email'])
//         setIs_member(Data1['is_member'])
//         setIs_admin(Data1['is_admin'])
//         setis_trainer(Data1['is_staff'])
//         setFirst_name(Data1['first_name'])
//         setLast_name(Data1['last_name'])
//         // Data = getDataofuser();
//     } catch (error) {
//         console.log(error, 'error')
//     }

// }, [])



//     const getdata2 = async () => {
//         let token = await AsyncStorage.getItem('@token');
//         let username = await AsyncStorage.getItem('@username');
//         fetch(`${API_HOST}/${username}/data/`, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 token: token,
//             }),
//         })
//             .then((response) => response.json())
//             .then((json) => {

//                 if (json['message'] == true) {
//                     // save token
//                     // setmembership
//                     setFollowers(json['followers']);
//                     setFollowing(json['following']);
//                     setPosts(json['posts']);
//                     setWeight(json['weight']);
//                     setBench_press(json['bench_press']);
//                     setDead_lift(json['dead_lift']);
//                     setSquat(json['squat']);
//                     setProfile_pic(json['profile_pic']);

//                     AsyncStorage.setItem('@dataofuser2', JSON.stringify(json));

//                 } else {
//                     Alert.alert(json['message']);
//                 }
//             })
//             .catch((e) => {
//                 console.log(e);
//                 Alert.alert('Something went wrong');
//             });
//     }