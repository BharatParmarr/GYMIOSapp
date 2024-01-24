import { View, Text, Animated, Easing, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef, useContext } from 'react'
import { ThemeContext } from './theamcontext';

const Loading = () => {
    let [display, setDisplay] = useState('flex');
    const spinValue = useRef(new Animated.Value(0)).current;
    const loopRef = useRef<Animated.CompositeAnimation | null>(null);


    const { themecolors, setThemecolor } = useContext(ThemeContext);

    const [nav_primiry, setnav_primiry] = useState(themecolors.nav_primiry);
    const [white, setwhite] = useState(themecolors.white);

    useEffect(() => {
        // Rotate animation configuration
        loopRef.current = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 800, // Adjust the duration as needed
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        loopRef.current.start();
        setTimeout(() => {
            if (loopRef.current) {
                loopRef.current.stop();

                spinValue.setValue(0);
                setDisplay('none')
            }
        }, 20000);
    }, [spinValue]);

    // Interpolate rotation value for transformation
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const { width, height } = Dimensions.get('window');

    return (
        <View style={{ display: 'flex', position: 'absolute', backgroundColor: `${white}99`, alignSelf: 'center', height: height, width: width, alignContent: 'center', alignItems: 'center', justifyContent: 'center', left: 0, top: 0, bottom: 0, right: 0 }} >
            <Animated.View style={{ width: 50, height: 50, borderRadius: 150, borderWidth: 2, borderColor: nav_primiry, borderBottomWidth: 1, borderTopWidth: 3, borderLeftWidth: 0, transform: [{ rotate: spin }], alignSelf: 'center', }}></Animated.View>
        </View>
    )
}



export default Loading;