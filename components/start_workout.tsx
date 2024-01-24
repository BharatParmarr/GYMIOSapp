import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import StopwatchTimer, { StopwatchTimerMethods } from 'react-native-animated-stopwatch-timer';
import SoundPlayer from 'react-native-sound-player'
import { ImageSlider } from "react-native-image-slider-banner";
import { API_HOST } from '../config';



const WorkoutTimer = ({ route }: any) => {


  let [list_of_workouts, setlist_of_workout] = useState(route.params.workoutlist[route.params.day]);
  useEffect(() => {
    if (route.params.length > 0) {
      setlist_of_workout(route.params[route.params.day]);
    }
  }, []);

  const [workoutList, setWorkoutList] = useState(list_of_workouts);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(workoutList[currentWorkoutIndex].time);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restTime, setRestTime] = useState(30);
  const [sound_is_playing, setSoun] = useState(false);

  // modify workout list by adding rest as a workout in between
  let list1 = [{ name: 'Rest', time: restTime, sets: 0, reps: 0, rest: 0 }];
  list1.pop();
  for (let i = 0; i < list_of_workouts.length; i++) {
    for (let j = 0; j < list_of_workouts[i].sets; j++) {
      list1.push({ name: list_of_workouts[i].name, time: list_of_workouts[i].time, sets: j + 1, reps: list_of_workouts[i].reps, rest: list_of_workouts[i].rest });
      list1.push({ name: 'Rest', time: restTime, sets: 0, reps: 0, rest: 0 });
    }
  }

  list1.pop();
  useEffect(() => {
    setWorkoutList(list1);
    setRemainingTime(list1[currentWorkoutIndex].time);
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      if (isTimerRunning && remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
        console.log(remainingTime);
      }
      else if (remainingTime === 0) {
        if (currentWorkoutIndex < workoutList.length - 1) {
          setCurrentWorkoutIndex(currentWorkoutIndex + 1);
          setRemainingTime(workoutList[currentWorkoutIndex + 1].time);
          handleStartTimer();
        } else {
          setIsTimerRunning(false);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, remainingTime, currentWorkoutIndex, workoutList]);


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

  const handleNextWorkout = () => {
    if (currentWorkoutIndex < workoutList.length - 1) {
      setCurrentWorkoutIndex(currentWorkoutIndex + 1,);
      setRemainingTime(workoutList[currentWorkoutIndex + 1].time);
      reset();
      setTimeout(() => {
        handleStartTimer();

        if (sound_is_playing) {
          SoundPlayer.stop()
          setSoun(false)
        }
      }, 200);
    } else {
      Alert.alert('Workout Finished', 'Congratulations! You have completed your workout');
    }
  };

  const currentWorkout = workoutList[currentWorkoutIndex];
  const [images, setImages] = useState(['https://media.istockphoto.com/id/1423605865/photo/india-at-night-viewed-from-space-with-city-lights-showing-activity-in-indian-cities-delhi.jpg?s=2048x2048&w=is&k=20&c=nOnJk8vyVRjuJjC9zvRW9M5tFmKeigM91jjy6VYqTZw=', 'https://media.istockphoto.com/id/1423605865/photo/india-at-night-viewed-from-space-with-city-lights-showing-activity-in-indian-cities-delhi.jpg?s=2048x2048&w=is&k=20&c=nOnJk8vyVRjuJjC9zvRW9M5tFmKeigM91jjy6VYqTZw=', 'https://media.istockphoto.com/id/1423605865/photo/india-at-night-viewed-from-space-with-city-lights-showing-activity-in-indian-cities-delhi.jpg?s=2048x2048&w=is&k=20&c=nOnJk8vyVRjuJjC9zvRW9M5tFmKeigM91jjy6VYqTZw=']);

  useEffect(() => {
    const image_chacker = async () => {
      let list = [];
      const imageUrls = [
        `${API_HOST}/media/${currentWorkout.name}.jpg`,
        `${API_HOST}/media/${currentWorkout.name}_1.jpg`,
        `${API_HOST}/media/${currentWorkout.name}_2.jpg`,
      ];
      const defaultImageUrl = 'https://media.istockphoto.com/id/1423605865/photo/india-at-night-viewed-from-space-with-city-lights-showing-activity-in-indian-cities-delhi.jpg?s=2048x2048&w=is&k=20&c=nOnJk8vyVRjuJjC9zvRW9M5tFmKeigM91jjy6VYqTZw=';
      let count = 1;
      for (const imageUrl of imageUrls) {
        try {
          const response = await fetch(imageUrl, { method: 'HEAD' });
          if (response.ok) {
            list.push(imageUrl);
          } else {
            if (count === imageUrls.length) {
              list.push(defaultImageUrl);
            }
          }
        } catch (e) {
          if (count === imageUrls.length) {
            list.push(defaultImageUrl);
          }
        } finally {
          count++;
        }
      }

      setImages(list);
    };
    image_chacker()
  }, [currentWorkoutIndex]);

  function playSound_10() {
    try {
      SoundPlayer.playSoundFile('clocl_tiking', 'mp3')
      setSoun(true)
      setTimeout(() => {
        SoundPlayer.stop()
        setSoun(false)
      }, 10000);
    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
  }

  // stopwatch
  const stopwatchTimerRef = useRef<StopwatchTimerMethods>(null);
  const stopwatchTimerRefmain = useRef<StopwatchTimerMethods>(null);


  // Methods to control the stopwatch


  function reset() {
    stopwatchTimerRef.current?.reset();
  }

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => (num < 10 ? `0${num}` : num);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentWorkout.name}</Text>
      {currentWorkout.sets > 0 && (
        <Text style={styles.workoutName}>
          {currentWorkout.sets === 1
            ? `${currentWorkout.sets}st set of ${currentWorkout.reps} rep`
            : currentWorkout.sets === 2
              ? `${currentWorkout.sets}nd set of ${currentWorkout.reps} reps`
              : currentWorkout.sets === 3
                ? `${currentWorkout.sets}rd set of ${currentWorkout.reps} reps`
                : `${currentWorkout.sets}th set of ${currentWorkout.reps} reps`}
        </Text>
      )}
      {/* <Text style={styles.time}>{currentWorkout.sets} Sets X {currentWorkout.reps} Reps</Text> */}
      <Text style={styles.time}>Rest Time : {restTime} s</Text>
      <View style={styles.img}>
        <ImageSlider
          previewImageStyle={styles.img}
          activeIndicatorStyle={{ backgroundColor: nav_primiry, width: 16, height: 6, borderRadius: 5, marginHorizontal: 5, }}
          indicatorStyle={{ backgroundColor: gray, width: 6, height: 6, borderRadius: 5, marginHorizontal: 5, }}
          data={images.map((item) => ({ img: item }))}
        />
      </View>
      <View style={styles.time_holder}>
        {currentWorkout.name === 'Rest' ? (
          <StopwatchTimer containerStyle={styles.counter_time} onFinish={handleNextWorkout} mode={'timer'} digitStyle={styles.text_next_button} ref={stopwatchTimerRef} initialTimeInMs={(workoutList[currentWorkoutIndex].time - 1) * 1000} trailingZeros={2} />
        ) : (
          <StopwatchTimer containerStyle={styles.counter_time} onFinish={handleNextWorkout} mode={'stopwatch'} digitStyle={styles.text_next_button} ref={stopwatchTimerRef} trailingZeros={2} />
        )}
      </View>
      <Text></Text>
      <View style={styles.time_container}>
        <Text style={styles.text_next_button}>{`${formatTime(seconds)}`}</Text>
      </View>
      <View style={styles.button_container}>
        {isTimerRunning ? (
          <View style={styles.stop_button} onTouchEnd={handleStopTimer} ><Text style={styles.text_button}>Stop</Text></View>
        ) : (
          <View style={styles.start_button} onTouchEnd={handleStartTimer} ><Text style={styles.text_button}>Start</Text></View>
        )}
        <View style={styles.next_button} onTouchEnd={handleNextWorkout} ><Text style={styles.text_next_button}>Next</Text></View>
      </View>
    </View>
  );
};

let nav_primiry = '#5a06eb'
let white = '#ffffff'
let black = '#000000'
let gray = '#808080'
let bg_color = '#eaeaea'

// let nav_primiry = '#5a06eb'
// let white = '#000000'
// let black = '#ffffff'
// let gray = '#808080'
// let bg_color = '#151515'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg_color,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: nav_primiry,
    margin: 30,
  },
  time: {
    fontSize: 18,
    color: black,
    margin: 10,
  },
  workoutName: {
    fontSize: 16,
    color: black,
    margin: 10,
  },
  img: {
    width: 230,
    height: 230,
    borderRadius: 5,
    margin: 20,
  },
  start_button: {
    backgroundColor: nav_primiry,
    width: 125,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,

  },
  stop_button: {
    backgroundColor: black,
    width: 125,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  text_button: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 30,
  },
  next_button: {
    backgroundColor: white,
    width: 125,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  text_next_button: {
    color: black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  time_holder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  counter_time: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    backgroundColor: white,
    borderRadius: 4,
    alignItems: 'center',
  },
  time_container: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    backgroundColor: white,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default WorkoutTimer;