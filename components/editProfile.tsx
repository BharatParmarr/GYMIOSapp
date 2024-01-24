import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { API_HOST } from '../config';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import FadeOutAlert from './fademessage';
import _, { floor, set } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './loading';
import { UserDetails } from './theamcontext';


// import ImagePicker from 'react-native-image-picker';

const ProfileEditScreen = ({ navigation, route }: any) => {
    const opacity = useSharedValue(1);
    const [username, setUsername] = useState(route.params.username);
    const [firstName, setFirstName] = useState(route.params.firstName);
    const [lastName, setLastName] = useState(route.params.lastName);
    const [bio, setBio] = useState(route.params.bio);
    const [links, setLinks] = useState(route.params.links);
    const [profilePicture, setProfilePicture] = useState(route.params.profile_picture);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [loading, setloading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertmessage, setAlertmessage] = useState('');
    const [private_account, setis_private] = useState(false);

    const { userdetails, setuserdetails } = useContext(UserDetails);
    useEffect(() => {
        setUsername(userdetails.username);
        setis_private(userdetails.is_private);
        setFirstName(userdetails.first_name);
        setLastName(userdetails.last_name);
        setBio(userdetails.bio);
        setLinks(userdetails.link);
        setProfilePicture(userdetails.profile_pic);
    }, [userdetails])
    const showAlert = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const handleChange = (field: string, value: React.SetStateAction<string>) => {
        switch (field) {
            case
                'username':
                setIs_animation(true)
                setValidatemessage('⌛')
                rotate_animation.value = withTiming('360deg', { duration: 1000 });
                function userCalledFunction() {
                    // Cancel the previous invocation
                    debouncedCheckUsername.cancel();

                    // Start a new delay
                    debouncedCheckUsername(value as string);
                }
                userCalledFunction()
                setUsername(value);
                break;
            case
                'firstName':
                setFirstName(value);
                break;
            case
                'lastName':
                setLastName(value);
                break;
            case 'bio':
                setBio(value);
                break;
            case 'link':
                setLinks(value);
                break;
        }
    };

    const pickImage = async () => {
        // Use ImagePicker library for image selection
        const result = await ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            maxFiles: 1,
            compressImageQuality: 0.7,
            mediaType: 'photo',
        }); // Use ImageCropPicker for image cropping

        if (result) {
            setProfilePicture(result.path);
        }
    };

    const handleSubmit = async () => {
        if (!isUsernameValid) {
            setAlertmessage('Username is not available')
            showAlert();
            return;
        }
        const formData = new FormData();
        let privacy = private_account ? 'true' : 'false';
        formData.append('username', username);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('bio', bio);
        formData.append('links', links);
        formData.append('is_private_string', privacy);
        console.log(profilePicture)
        if (profilePicture.startsWith('http://') || profilePicture.startsWith('https://') || profilePicture.startsWith('/media')) {
            // profilePicture is a URL, do nothing
            console.log('profilePicture is a URL, do nothing');
        } else {
            // profilePicture is a local file, append it to formData
            if (profilePicture) {
                formData.append('profile_picture', {
                    uri: profilePicture,
                    type: 'image/jpeg',
                    name: 'profile_picture.jpg',
                });
            }
        }


        try {
            // loading screen
            setloading(true);
            if (profilePicture != route.params.profile_picture) {
                let image
            }
            const response = await fetch(`${API_HOST}/updateprofile/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Token ' + await AsyncStorage.getItem('@token'),
                },
                body: formData,
            }).then((response) => response.json()).then((data) => {


                if (data.message) {
                    setuserdetails({
                        userid: userdetails.userid,
                        username: username,
                        email: userdetails.email,
                        bio: bio,
                        is_member: userdetails.is_member,
                        is_admin: userdetails.is_admin,
                        is_trainer: userdetails.is_trainer,
                        is_private: private_account,
                        first_name: firstName,
                        last_name: lastName,
                        followers: userdetails.followers,
                        following: userdetails.following,
                        posts: userdetails.posts,
                        profile_pic: profilePicture,
                        link: links,
                    }); // Update user details in context
                    navigation.navigate('profile'); // Navigate back to profile screen
                } else {
                    // Handle error
                    console.error(data);
                    setloading(false);
                    setAlertmessage('An error occurred')
                    showAlert();

                }
            })
        } catch (error) {
            console.error(error);
            setloading(false);
            setAlertmessage('An error occurred')
            showAlert();
        }
    };

    const [is_animation, setIs_animation] = useState(false)
    const [is_valid, setIs_valid] = useState(false)
    const [validate_message, setValidatemessage] = useState('')
    const rotate_animation = useSharedValue('0deg')


    const chake_username_server = (username: string) => {
        console.log('chake_username_server')
        if (username == '') {
            setIs_animation(false)
            setIsUsernameValid(false);
            setValidatemessage('Username is not available')
            rotate_animation.value = withTiming('0deg', { duration: 0 });
            setIsUsernameValid(false);
            console.log('username is empty')
            return false
        } else if (username == route.params.username) {
            setIs_animation(false)
            setIsUsernameValid(true);
            setValidatemessage('✔')
            setIsUsernameValid(true);
            console.log('username is same')
            rotate_animation.value = withTiming('0deg', { duration: 0 });
            return true
        }
        fetch(`${API_HOST}/check_username_availability/${username}/`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json['available'] == true) {
                    setValidatemessage('✔')
                    setIs_animation(true)
                    setIs_valid(true)
                    rotate_animation.value = withTiming('0deg', { duration: 0 });
                    setIsUsernameValid(true);
                } else {
                    setIs_animation(true)
                    setIs_valid(false)
                    setValidatemessage('Username is not available')
                    rotate_animation.value = withTiming('0deg', { duration: 0 });
                    setIsUsernameValid(false);
                }
            })
            .catch((error) => {
                setAlertmessage('An error occurred')
                showAlert();
            });
    }
    const debouncedCheckUsername = useCallback(
        _.debounce(chake_username_server, 1000),
        []  // dependencies array is empty to create the debounced function only once
    );

    let animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateX: rotate_animation.value }],
        };
    });
    return (
        <ScrollView style={styles.container} nestedScrollEnabled={true}>
            {alertVisible && (
                <View style={{ position: 'absolute', top: 250, width: '100%', zIndex: 100, alignSelf: 'center', justifyContent: 'center' }}>
                    <FadeOutAlert
                        message={alertmessage}
                        onHide={hideAlert}
                    />
                </View>
            )}
            {loading ? <View style={styles.loading_container}>
                <Loading />
            </View> : null}
            <Text>Profile Edit Screen</Text>
            <View style={styles.profilePictureContainer}>
                <Image
                    style={styles.profilePicture}
                    source={
                        profilePicture
                            ? { uri: profilePicture.startsWith('/') ? `${API_HOST}${profilePicture}` : profilePicture }
                            : { uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }
                    }
                />
                {/* <Button title="Pick an image" onPress={pickImage} /> */}
                <TouchableOpacity onPress={pickImage}>
                    <Text>Change a Profile Picture</Text>
                </TouchableOpacity>
            </View>
            {!is_animation ? <Text style={[styles.validatemessage]} >{validate_message}</Text>
                : <Animated.View style={[styles.formContainer, animatedStyle]}>
                    <Text style={[styles.validatemessage, { color: is_valid ? '#00ff00' : '#ff0000' }]} >{validate_message}</Text>
                </Animated.View>}
            <View style={styles.biocontainer}>
                <Text style={styles.bio_background}>User Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => handleChange('username', text.toLocaleLowerCase())}
                />
            </View>
            <View style={styles.biocontainer}>
                <Text style={styles.bio_background}>First name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(text) => handleChange('firstName', text)}
                />
            </View>
            <View style={styles.biocontainer}>
                <Text style={styles.bio_background}>Last name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(text) => handleChange('lastName', text)}
                />
            </View>
            <View style={styles.biocontainer}>
                <Text style={styles.bio_background}>Bio</Text>
                <TextInput
                    style={[styles.input, { height: bio.length > 20 ? (floor(bio.length / 10)) * 10 : 40, }]}
                    placeholder="Bio"
                    value={bio}
                    onChangeText={(text) => handleChange('bio', text)}
                    multiline={true}
                    numberOfLines={4} // Adjust this value based on your desired number of lines
                />
            </View>
            <View style={styles.biocontainer}>
                <Text style={styles.bio_background}>Link</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Link"
                    value={links}
                    onChangeText={(text) => handleChange('link', text)}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
                <Text style={{ marginRight: 10, }}>Private Account</Text>
                <TouchableOpacity onPress={() => setis_private(!private_account)}>
                    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: black, backgroundColor: private_account ? black : white }} />
                </TouchableOpacity>
            </View>
            {/* <Button title="Submit" onPress={handleSubmit} /> */}
            <TouchableOpacity style={styles.submit_button} onPress={handleSubmit}>
                <Text style={styles.submit_button_text} >Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

let nav_primiry = '#1800ec';
let white = '#ffffff';
let black = '#000000';
let gray = '#808080';
let bg_color = '#eaeaea';

let styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: white,
        padding: 20,
        paddingBottom: 50,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
    },
    submit_button: {
        width: '100%',
        height: 50,
        backgroundColor: '#480cfe',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 6,
        marginBottom: 100,
    },
    submit_button_text: {
        color: white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    validatemessage: {
        color: nav_primiry,
        fontWeight: 'bold',
        fontSize: 16,
    },
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loading_container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: `${white}80`,
        zIndex: 100,
        justifyContent: 'center',
    },
    biocontainer: {
        width: '100%',
        marginBottom: 5,
    },
    bio_background: {
        position: 'absolute',
        top: -10,
        left: 10,
        zIndex: 10,
        backgroundColor: white,
        paddingHorizontal: 5,
        color: gray,
    }


});

export default ProfileEditScreen;