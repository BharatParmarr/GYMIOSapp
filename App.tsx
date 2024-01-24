// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React, { useEffect, useRef, useState } from 'react';
// import { ScrollView, StyleSheet, useColorScheme, View, Platform, SafeAreaView, Text, } from 'react-native';

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
// import ProfileComponent from './components/Profile_page';
// import Create_post from './components/create_post';
// import AppLaunchScreen from './components/lounch';
// import Timertest from './components/timertest';
// import { NavigationContainer, useIsFocused } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   const Stack = createNativeStackNavigator();

//   return (<>

//     <NavigationContainer>
//       <View style={styles.container}>
//         <Stack.Navigator>
//           <Stack.Screen options={{ headerShown: false }} name="lounch" component={AppLaunchScreen} />
//           <Stack.Screen options={{ headerShown: false }} name="login" component={AuthComponent} />
//           <Stack.Screen options={{ headerShown: false }} name="profile" component={ProfileComponent} />
//           <Stack.Screen options={{ headerShown: false }} name="home" component={Workout_holder} />
//           <Stack.Screen options={{ headerShown: false }} name="trainer" component={Trainer} />
//           <Stack.Screen options={{ headerShown: false }} name="search" component={Search} />
//           <Stack.Screen options={{ headerShown: false }} name="create_template" component={Template} />
//           <Stack.Screen options={{ headerShown: false }} name="create_post" component={Create_post} />
//           <Stack.Screen options={{ headerShown: false }} name="start_workout" component={WorkoutTimer} />
//         </Stack.Navigator>
//       </View>
//       {/* <Nav_bar /> */}
//       <View style={styles.bottom_nav}>
//         <Nav_bar />
//       </View>
//     </NavigationContainer>

//   </>
//   );
// };

// let nav_primiry = '#1800ec';
// let white = '#ffffff';
// let black = '#000000';
// let gray = '#808080';
// let bg_color = '#eaeaea';

// let styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//   },
//   bottom_nav: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     zIndex: 10,
//     width: '100%',
//     height: '6.29%',
//   },
//   top_container: {
//     width: '100%',
//     height: '93.71%',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     zIndex: 19,
//     backgroundColor: '#fff',
//   }, brand_name: {

//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     zIndex: 10,
//     width: '100%',
//     height: '6.29%',
//   }
// });

// export default App;
import { View, Text, Appearance, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ProfileComponent from './components/Profile_page';
import AuthComponent from './components/login';
import AppLaunchScreen from './components/lounch';
import MainApp from './MainApp';
// import OfflinePage from './components/offlinePage';
// import { ThemeContext, UserDetails, Gym } from './components/theamcontext';
// import { Settheamcolor } from './components/theamcolorchanger';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Notification, Notifications } from 'react-native-notifications';
// import Test from './components/test';
// import PushNotification from 'react-native-push-notification';
// import PeginesionUser from './components/peginesionUser';
// import AddTrainer from './components/Add_trainer';
// import AddMember from './components/Add_member';
// import Gym_member from './components/Gym_member_view';
// import Gym_trainer from './components/gym_trainer_view';
// import Expences_peginator from './components/expences_peginator';
// import Bmi_calculator from './components/Bmi_calculator';
// import Message_list from './components/message_list';


const App = () => {
  const Stack = createNativeStackNavigator();

  //   useEffect(() => {
  //     // request notification permission
  //     const requestPermissions = async () => {
  //       if (Platform.OS === 'ios') {
  //         PushNotification.requestPermissions().then((permissions) => {
  //           if (permissions.alert) {
  //             console.log('iOS Notification Permission Granted!');
  //           } else {
  //             console.log('iOS Notification Permission Denied!');
  //           }
  //         });
  //       } if (Platform.OS === 'android') {
  //         await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((granted) => {
  //           console.log('granted : ' + granted);
  //         });
  //       }
  //     }
  //     requestPermissions();

  //     Notifications.registerRemoteNotifications();
  //     console.log('registerRemoteNotifications : ' + Notifications.registerRemoteNotifications());
  //   }, []);


  //   const [themecolors, setTheme] = useState({
  //     nav_primiry: '#1800ec',
  //     white: '#ffffff',
  //     black: '#000000',
  //     gray: '#808080',
  //     bg_color: '#eaeaea',
  //   });
  //   const [userdetails, setuserdetails] = useState({
  //     userid: 0,
  //     username: 'loading...',
  //     email: 'loading...',
  //     bio: 'loading...',
  //     is_member: true,
  //     is_admin: false,
  //     is_trainer: false,
  //     is_private: true,
  //     first_name: 'loading...',
  //     last_name: 'loading...',
  //     followers: '0',
  //     following: '0',
  //     posts: '0',
  //     profile_pic: './images/profilepicture.jpg',
  //     link: 'loading...',
  //   });

  // const [bestlift, setbestlift] = useState({
  //   bench_press: 0,
  //   squat: 0,
  //   dead_lift: 0,
  //   Push_ups: 0,
  // });

  // const [Gymdetails, setGymdetails] = useState([{
  //   'name': 'loading...',
  //   'address': 'loading...',
  //   'image': './images/defult.jpg',
  // }]);

  // useEffect(() => {
  //   Settheamcolor().then((value) => {
  //     setTheme(value);
  //   });
  // }, []);

  // useEffect(() => {

  //   const unsubscribe = Appearance.addChangeListener(async ({ colorScheme }) => {
  //     let systemtheam = await AsyncStorage.getItem('theme');
  //     if (systemtheam == 'system') {
  //       Settheamcolor().then((value) => {
  //         setTheme(value);
  //       });
  //     }
  //   });
  //   return () => {
  //     unsubscribe.remove();
  //   };
  // }, []);

  return (
    // <ThemeContext.Provider value={{ themecolors: themecolors, setThemecolor: setTheme }}>
    //   <UserDetails.Provider value={{ userdetails: userdetails, setuserdetails: setuserdetails }}>
    //     <Gym.Provider value={{ Gymdetails: Gymdetails, setGymdetails: setGymdetails }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="lounch" component={AppLaunchScreen} />
        <Stack.Screen options={{ headerShown: false }} name="App" component={MainApp} />
        <Stack.Screen options={{ headerShown: false }} name="login" component={AuthComponent} />
        {/* <Stack.Screen options={{ headerShown: false }} name="bmi_calculator" component={Bmi_calculator} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="OfflinePage" component={OfflinePage} /> */}
        {/*} <Stack.Screen options={{ headerShown: false }} name="peginesionuser" component={PeginesionUser} />
              <Stack.Screen options={{ headerShown: false }} name="AddTrainer" component={AddTrainer} />
              <Stack.Screen options={{ headerShown: false }} name="AddMember" component={AddMember} />
              <Stack.Screen options={{ headerShown: false }} name="Gym_member" component={Gym_member} />
              <Stack.Screen options={{ headerShown: false }} name="Gym_trainer" component={Gym_trainer} />
              <Stack.Screen options={{ headerShown: false }} name="Expences_peginator" component={Expences_peginator} />
              <Stack.Screen options={{ headerShown: true, title: 'message', headerStyle: { backgroundColor: themecolors.bg_color } }} name="Message_list" component={Message_list} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    //     </Gym.Provider>
    //   </UserDetails.Provider>
    // </ThemeContext.Provider>
  )
}


export default App