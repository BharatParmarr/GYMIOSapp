import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

export default function LikeAnimation({ onhide }: any) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(0);
    console.log('LikeAnimation');

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 400, easing: Easing.linear });
        translateY.value = withTiming(-600, { duration: 400, easing: Easing.linear });
        setTimeout(() => {
            onhide()
            console.log('LikeAnimation onhide');
        }, 600);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'white' }}>
            <Animated.View style={[{ position: 'absolute' }, animatedStyle]}>
                <Svg height="50" width="50">
                    <Circle cx="25" cy="25" r="25" fill="blue" />
                </Svg>
            </Animated.View>
        </View>
    );
}