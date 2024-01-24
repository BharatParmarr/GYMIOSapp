import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import StopwatchTimer, { StopwatchTimerMethods } from 'react-native-animated-stopwatch-timer';
import SoundPlayer from 'react-native-sound-player'
import { ImageSlider } from "react-native-image-slider-banner";
import { API_HOST } from '../config';

const Timertest = ({ route }: any) => {
    const stopwatchTimerRef = React.useRef<StopwatchTimer>(null)
    const stopwatchTimerRefmain = React.useRef<StopwatchTimer>(null)
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
    // const [remainingTime, setRemainingTime] = useState(workoutList[currentWorkoutIndex].time);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [restTime, setRestTime] = useState(30);
    const [sound_is_playing, setSoun] = useState(false);
    // let [list_of_workouts, setlist_of_workout] = useState(route.params.workoutlist[route.params.day]);

    let list_of_workouts = [{ name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, }, { name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, }, { name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, }, { name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, }, { name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, }, { name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, }, { name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, }, { name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, }, { name: 'Pushups', time: 12, sets: 3, reps: 10, rest: 30, },]
    useEffect(() => {
        //     if (route.params.length > 0) {
        //       setlist_of_workout(route.params[route.params.day]);
        //     }
        stopwatchTimerRefmain.current?.reset();
        stopwatchTimerRef.current?.reset();
        // stopwatchTimerRefmain.current?.play();
    }, []);

    const handleStartTimer = () => {

        setIsTimerRunning(true);
        stopwatchTimerRef.current?.play();
        if (sound_is_playing) {
            SoundPlayer.resume();
            setSoun(true)
        }
    };

    const handleStopTimer = () => {
        setIsTimerRunning(false);
        stopwatchTimerRef.current?.pause();
        if (sound_is_playing) {
            SoundPlayer.pause();
            setSoun(true)
        }
    };

    return (
        <View>
            <StopwatchTimer containerStyle={styles.counter_time} mode={'stopwatch'} digitStyle={styles.text_next_button} ref={stopwatchTimerRefmain} trailingZeros={2} />
            <StopwatchTimer containerStyle={styles.counter_time} mode={'stopwatch'} digitStyle={styles.text_next_button} ref={stopwatchTimerRef} trailingZeros={2} />
            <TouchableOpacity onPress={() => stopwatchTimerRef.current?.reset()}>
                <Text style={styles.text_next_button}>Reset</Text>
            </TouchableOpacity>
            {!isTimerRunning ? (
                <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={() => handleStartTimer()}>
                    <Text style={styles.text_next_button}>Start</Text>
                </TouchableOpacity>) : (
                <TouchableOpacity onPress={() => handleStopTimer()}>
                    <Text style={styles.text_next_button}>Stop</Text>
                </TouchableOpacity>)}
        </View>
    )
}

let styles = StyleSheet.create({
    counter_time: {
        width: '100%',
        height: '22%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    text_next_button: {
        color: '#ffffff',
        fontSize: 30,
        fontWeight: 'bold',
    },
})

export default Timertest