import { View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity, Image, Alert, Platform, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './theamcontext';
import { API_HOST } from '../config';
import ImagePicker from 'react-native-image-crop-picker';
import FadeOutAlert from './fademessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LikeAnimation from './like_animation';
import { flatMap } from 'lodash';



const Add_gym = ({ navigation }: any) => {
    const { themecolors, setThemecolor } = useContext(ThemeContext);
    const [nav_primiry, setnav_primiry] = useState(themecolors.nav_primiry);
    const [white, setwhite] = useState(themecolors.white);
    const [black, setblack] = useState(themecolors.black);
    const [gray, setgray] = useState(themecolors.gray);
    const [bg_color, setbg_color] = useState(themecolors.bg_color);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertmessage, setAlertmessage] = useState('');
    const [button_text, setbutton_text] = useState('Upload Image');

    useEffect(() => {
        setnav_primiry(themecolors.nav_primiry);
        setwhite(themecolors.white);
        setblack(themecolors.black);
        setgray(themecolors.gray);
        setbg_color(themecolors.bg_color);
    }, [themecolors])
    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };
    let styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: white,
            padding: 20,
            overflow: 'scroll',
            paddingBottom: 40,
            paddingTop: 40,
        },

        input: {
            width: '100%',
            height: 40,
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
        },
        image_container: {
            width: '100%',
            height: 330,
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: 10,
        },
        image_style: {
            width: '95%',
            height: 280,
        },
        backbutton: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 100,
            padding: 10,
            borderBottomRightRadius: 4,
        },
        savebutton: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 100,
            padding: 10,
            borderBottomLeftRadius: 4,
        }, headingstyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: 14,
            marginTop: 14,
        }, upload_image_indicater: {
            position: 'absolute',
            bottom: 10,
            right: 10,
            color: white,
            backgroundColor: gray,
            padding: 5,
            borderRadius: 5,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            overflow: 'hidden',
            left: 10,
            height: 30,
            textAlign: 'center',
            shadowColor: black,
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            elevation: 5,
        }
    });

    const [gym_name, setgym_name] = useState('');
    const [gym_address, setgym_address] = useState('');
    const [gym_country, setgym_country] = useState('India');
    const [gym_zipcode, setgym_zipcode] = useState('');
    const [gym_phone, setgym_phone] = useState('');
    const [gym_email, setgym_email] = useState('');
    const [gym_website, setgym_website] = useState('');
    const [image, setImage] = useState<{ uri: string } | null>(null); // Add type annotation to image state
    const [isanimation, setisanimation] = useState(false);
    function onhidefunction() {
        setisanimation(false)
    }

    const pickImage = ({ navigation }: any) => {

        ImagePicker.openPicker({
            cropping: true,
            mediaType: 'photo',
            forceJpg: true,
            cropperActiveWidgetColor: nav_primiry,
            cropperToolbarColor: white,
            cropperToolbarWidgetColor: black,
            compressImageQuality: 0.8,
        }).then(image => {
            setImage({ uri: image.path })
            setbutton_text('Change Image')
        }).catch(() => {
            setAlertmessage('Error Something went wrong');
            showAlert();
        })

    };

    const add_gym = async () => {
        let id = null;
        try {
            id = await AsyncStorage.getItem('@id')
        }
        catch (e) {
            navigation.navigate('login')
        }
        const data = new FormData();

        if (gym_name == '') {
            Alert.alert('Information missing', 'Please enter gym name');
        } else if (gym_address == '') {
            Alert.alert('Information missing', 'Please enter gym address');
        } else if (gym_phone == '') {
            Alert.alert('Information missing', 'Please enter gym phone');
        } else if (gym_email == '') {
            Alert.alert('Information missing', 'Please enter gym email');
        } else if (gym_zipcode == '') {
            Alert.alert('Information missing', 'Please enter gym zipcode');
        } else if (image == null) {
            Alert.alert('Information missing', 'Please upload gym image');
        }
        else {
            data.append('name', gym_name);
            data.append('address', gym_address);
            data.append('phone', gym_phone);
            data.append('email', gym_email);
            data.append('weblink', gym_website);
            data.append('user_id', id);
            data.append('country', gym_country);
            data.append('zipcode', gym_zipcode);

            const imageFile = image ? (Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '')) : '';
            try {
                data.append('image', {
                    name: 'image.jpeg',
                    type: 'image/jpeg',
                    uri: imageFile,
                });
            } catch (error) {
                setAlertmessage('Reupload the image.');
                showAlert();
                return;
            }

            await fetch(`${API_HOST}/add_gym/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                },
                body: data
            }).then(res => res.json()).then(data => {
                if (data.status == 'success' || data.message) {
                    setAlertmessage('Gym added successfully');
                    showAlert();
                    setTimeout(() => {
                        navigation.navigate('Home');
                    }, 1100);
                } else {

                    setAlertmessage('Gym not added.');
                    showAlert();
                }
            }).catch((e) => {
                console.log(e)
                setAlertmessage('Gym not added.');
                showAlert();
            })
        }
    }

    useEffect(() => {
        if (gym_phone.length > 10) {
            setgym_phone(gym_phone.slice(0, 10))
        }
    }, [gym_phone])

    return (
        <View style={styles.container}>
            <ScrollView style={{}} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                {alertVisible && (
                    <View style={{ position: 'absolute', top: 250, width: '100%', zIndex: 100, alignSelf: 'center', justifyContent: 'center' }}>
                        <FadeOutAlert
                            message={alertmessage}
                            onHide={hideAlert}
                        />
                    </View>
                )}
                <Text style={styles.headingstyle}>Add your gym details</Text>
                <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => { setgym_name(text) }} />
                <TouchableOpacity onPress={pickImage} style={styles.image_container}>
                    {image ?
                        <Image source={image} style={styles.image_style} />
                        :
                        <Image source={require('./images/defult.jpg')} style={styles.image_style} />
                    }
                    <Text style={styles.upload_image_indicater}>{button_text}</Text>
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder="address*" onChangeText={(text) => { setgym_address(text) }} />
                <TextInput style={styles.input} placeholder="country*" onChangeText={(text) => { setgym_country(text) }} value={gym_country} />
                <TextInput style={styles.input} placeholder="zipcode*" onChangeText={(text) => { setgym_zipcode(text) }} />
                <TextInput style={styles.input} placeholder="phone*" onChangeText={(text) => { setgym_phone(text) }} value={gym_phone} />
                <TextInput style={styles.input} placeholder="email" onChangeText={(text) => { setgym_email(text) }} />
                <TextInput style={styles.input} placeholder="website" onChangeText={(text) => { setgym_website(text) }} />

            </ScrollView>
            <TouchableOpacity style={styles.backbutton} onPress={() => {
                navigation.goBack();
            }}>
                <Text style={{ color: black, fontSize: 15 }} >Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.savebutton} onPress={() => { add_gym() }}>
                <Text style={{ color: nav_primiry, fontSize: 15 }}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}


export default Add_gym;