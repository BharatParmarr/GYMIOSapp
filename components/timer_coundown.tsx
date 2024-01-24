import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

const CircularProgressBar = ({ duration, remainingTime }: any) => {
    const progress = useSharedValue(0);
    useEffect(() => {
        progress.value = withTiming(1, { duration: duration * 1000, easing: Easing.linear });
    }, [duration]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: 2 * Math.PI * 50 * (1 - progress.value),
    }));

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${progress.value * 2 * Math.PI}rad` }],
    }));

    return (
        <View style={styles.container}>
            <Svg width={100} height={100} viewBox="0 0 100 100">
                <Path
                    d="M 50, 50 m -45, 0 a 45,45 0 1 1 90, 0 a 45,45 0 1 1 -90, 0"
                    fill="transparent"
                    stroke="#ddd"
                    strokeDasharray={[2 * Math.PI * 50, 2 * Math.PI * 100]}
                    strokeWidth={5}
                />
                <AnimatedPath
                    animatedProps={animatedProps}
                    d="M 50, 50 m -45, 0 a 45,45 0 1 1 90, 0 a 45,45 0 1 1 -90, 0"
                    fill="transparent"
                    stroke="#ff0000"
                    strokeDasharray={[2 * Math.PI * 50, 2 * Math.PI * 50]}
                    strokeWidth={5}
                />
            </Svg>
            <Text style={styles.text}>{Math.floor(remainingTime / 60)}:{remainingTime % 60}</Text>
        </View>
    );
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5a06eb',
    },
});

export default CircularProgressBar;











// import React, { useState, useEffect, useRef } from 'react';
// import { Animated, StyleSheet, View, Text } from 'react-native';
// import { Svg, Path } from 'react-native-svg';
// import { useAnimatedProps } from 'react-native-reanimated';

// const CircularProgressBar = ({ duration, remainingTime }: any) => {
    
//     const progress = useRef(new Animated.Value(0)).current;
//     useEffect(() => {
//         const timer = setInterval(() => {
//             remainingTime--;
//             progress.setValue(1 - remainingTime / duration);
//             if (remainingTime === 0) {
//                 clearInterval(timer);
//             }
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [remainingTime, duration]);

//     const animatedProps = useAnimatedProps(() => {
//         return {
//             strokeDashoffset: progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, 2 * Math.PI * 50], // adjust this value based on your circle size
//             }),
//         };
//     });

//     return (
//         <View style={styles.container}>
//             <Svg width={100} height={100} viewBox="0 0 100 100">
//                 <Path
//                     d="M 50, 50 m -45, 0 a 45,45 0 1 1 90, 0 a 45,45 0 1 1 -90, 0"
//                     fill="transparent"
//                     stroke="#ddd"
//                     strokeDasharray={[2 * Math.PI * 50, 2 * Math.PI * 100]}
//                     strokeWidth={5}
//                 />
//                 <Path
//                     d="M 50, 50 m -45, 0 a 45,45 0 1 1 90, 0 a 45,45 0 1 1 -90, 0"
//                     fill="transparent"
//                     stroke="#ff0000"
//                     strokeDasharray={[2 * Math.PI * 50, 2 * Math.PI * 50]}
//                     strokeWidth={5}
//                     {...animatedProps}
//                 />
//             </Svg>
//             <Text style={styles.text}>{Math.floor(remainingTime / 60)}:{remainingTime % 60}</Text>
//         </View>
//     );
// };

// const AnimatedPath = Animated.createAnimatedComponent(Path);
// let black = '#fff';

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#5a06eb',
//     },
// });

// export default CircularProgressBar;

















// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
// import Svg, { Path, Text as SvgText } from 'react-native-svg';

// const CircularProgressBar = ({ duration, remainingTime }: any) => {
//     const progress = useSharedValue(0);
//     const timerRef = useRef(null);
//     const storedProgress = useRef(0);
//     const [remaining_time, setRemainingTime] = useState(remainingTime);

//     const stopTimer = () => {
//         clearInterval(timerRef.current);
//     };

//     const restartTimer = () => {
//         stopTimer(); // Stop the current timer (if any)
//         storedProgress.current = progress.value; // Store current progress
//         remainingTime = duration; // Reset remaining time
//         startTimer(); // Start a new timer
//     };

//     const startTimer = () => {
//         timerRef.current = setInterval(() => {
//             remainingTime--;
//             setRemainingTime(remainingTime);
//             progress.value = withTiming(1 - remainingTime / duration, { duration: 1000, easing: Easing.linear });
//             if (remainingTime === 0) {
//                 stopTimer();
//             }
//         }, 1000);
//     };

//     useEffect(() => {
//         startTimer(); // Initial start
//         return stopTimer; // Cleanup function
//     }, [remainingTime, duration, progress]);

//     const animatedProps = useAnimatedProps(() => {
//         return {
//             strokeDashoffset: 2 * Math.PI * 50 * (1 - progress.value),
//         };
//     });

//     return (
//         <View>
//             <Svg width={100} height={100} viewBox="0 0 100 100">
//                 <Path
//                     d="M 50, 50 m -45, 0 a 45,45 0 1 1 90, 0 a 45,45 0 1 1 -90, 0"
//                     fill="transparent"
//                     stroke="#ddd"
//                     strokeDasharray={[2 * Math.PI * 50, 2 * Math.PI * 100]}
//                     strokeWidth={5}
//                 />
//                 <AnimatedPath
//                     d="M 50, 50 m -45, 0 a 45,45 0 1 1 90, 0 a 45,45 0 1 1 -90, 0"
//                     fill="transparent"
//                     stroke="#ff0000"
//                     strokeDasharray={[2 * Math.PI * 50, 2 * Math.PI * 50]}
//                     strokeWidth={5}
//                     animatedProps={animatedProps}
//                 />
//                 <SvgText x="45%" y="45%" fontSize="25" textAnchor="middle" dy=".63em" fill="#fff">
//                     {Math.floor(remaining_time / 60)}:{remaining_time % 60}
//                 </SvgText>
//             </Svg>
//             <Text>{Math.floor(remainingTime / 60)}:{remainingTime % 60}</Text>
//             <TouchableOpacity onPress={stopTimer}>
//                 <Text>Stop Timer</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={restartTimer}>
//                 <Text>Restart Timer</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };