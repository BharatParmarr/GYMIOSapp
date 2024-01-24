import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Button, Image, View, Platform, PermissionsAndroid, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';

const Create_post = ({ navigation }: any) => {
    const [image, setImage] = useState<{ uri: string } | null>(null); // Add type annotation to image state

    const pickImage = () => {

        ImagePicker.openPicker({
            cropping: true,
            mediaType: 'photo',
            forceJpg: true,
            cropperActiveWidgetColor: nav_primiry,
            cropperToolbarColor: white,
            cropperToolbarWidgetColor: black,
            compressImageQuality: 0.7,

        }).then(image => {
            setImage({ uri: image.path })
        }).catch(() => {
            Alert.alert('Error', 'Something went wrong');
        })

    };

    const uploadImage = async () => {
        let id = null;
        try {
            const name = await AsyncStorage.getItem('@username')
            id = await AsyncStorage.getItem('@id')
        }
        catch (e) {
            navigation.navigate('login')
        }
        const data = new FormData();
        data.append('name', 'avatar');
        data.append('user', id); // Replace with the user ID
        const imageFile = image ? (Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '')) : '';
        try {
            data.append('image', {
                name: 'image.jpeg',
                type: 'image/jpeg',
                uri: imageFile,
            });
        } catch (error) {
            console.error('Error fetching image:', error);
            // Handle the error appropriately (e.g., show a message to the user)
        }
        console.log(data);
        const token = await AsyncStorage.getItem('@token')
        const response = await fetch('http://192.168.0.102:8000/post/user_images/', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`, // Replace with your token
            },
        });

        const responseData = await response.json();
        console.log(responseData);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
            <Button title="Upload image" onPress={uploadImage} />
            <Image source={{ uri: 'http://192.168.0.102:8000/media/user_images/image.jpeg' }} style={{ width: 200, height: 200 }} />
        </View>
    );
};

let nav_primiry = '#1800ec';
let white = '#ffffff';
let black = '#000000';
let gray = '#808080';
let bg_color = '#eaeaea';

export default Create_post;