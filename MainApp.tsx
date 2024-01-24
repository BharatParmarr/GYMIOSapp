/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, useColorScheme, View, Platform, SafeAreaView, Text, } from 'react-native';

// import { Colors, } from 'react-native/Libraries/NewAppScreen';
// import Nav_bar from './components/Nav_bar';
// import Workout_holder from './components/workout_holder';
// import Loading from './components/loading';
// import Trainer from './components/trainer';
// import Search from './components/search';
// import WorkoutTimer from './components/start_workout';
// import Test from './components/test';
// import Template from './components/template';
// import Profile from './components/Profile';
// import AuthComponent from './components/login';
import ProfileComponent from './components/Profile_page';
// import Create_post from './components/create_post';
// import AppLaunchScreen from './components/lounch';
// import Timertest from './components/timertest';
// import NotificationPage from './components/NotificationPage';
// import ProfileEditScreen from './components/editProfile';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import Settings from './components/Settings';
// import Management_tools from './components/management_tools';
// import Add_gym from './components/add_gym';
// import Gym_view from './components/Gym_view';
// import AddTrainer from './components/Add_trainer';
// import AddMember from './components/Add_member';

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const Stack = createNativeStackNavigator();

    return (<>

        {/* <NavigationContainer> */}
        <View style={styles.container}>
            <Stack.Navigator>

                {/* <Stack.Screen options={{  headerShown: false }} name="lounch" component={AppLaunchScreen} />
            <Stack.Screen options={{  headerShown: false }} name="login" component={AuthComponent} /> */}
                <Stack.Screen options={{ headerShown: false }} name="profile" component={ProfileComponent} />
                {/*   <Stack.Screen options={{ headerShown: false }} name="home" component={Workout_holder} />
                <Stack.Screen options={{ headerShown: false }} name="trainer" component={Trainer} />
                <Stack.Screen options={{ headerShown: false, presentation: 'card' }} name="search" component={Search} />
                <Stack.Screen options={{ headerShown: false, animation: 'slide_from_bottom' }} name="create_template" component={Template} />
                <Stack.Screen options={{ headerShown: false, animation: 'slide_from_bottom' }} name="create_post" component={Create_post} />
                <Stack.Screen options={{ headerShown: false }} name="start_workout" component={WorkoutTimer} />
                <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="notification" component={NotificationPage} />
                <Stack.Screen options={{ headerShown: false, animation: 'slide_from_left' }} name="EditProfile" component={ProfileEditScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Setting" component={Settings} />
                <Stack.Screen options={{ headerShown: false }} name="Management_tools" component={Management_tools} />
                <Stack.Screen options={{ headerShown: false }} name="add_gym" component={Add_gym} />
                <Stack.Screen options={{ headerShown: false }} name="Gym_view" component={Gym_view} />
                <Stack.Screen options={{ headerShown: false }} name="HomePage" component={Profile} /> */}

            </Stack.Navigator>
        </View>
        {/* <Nav_bar /> */}
        <View style={styles.bottom_nav}>
            {/* <Nav_bar /> */}
        </View>
        {/* </NavigationContainer> */}

    </>
    );
};

let nav_primiry = '#1800ec';
let white = '#ffffff';
let black = '#000000';
let gray = '#808080';
let bg_color = '#eaeaea';

let styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    bottom_nav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        height: '6.29%',
    },
    top_container: {
        width: '100%',
        height: '93.71%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 19,
        backgroundColor: '#fff',
    }, brand_name: {

        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        height: '6.29%',
    }
});

export default App;
