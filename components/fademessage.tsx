// FadeOutAlert.js
import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const FadeOutAlert = ({ message, onHide }: any) => {
    const [fadeAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        const fadeOut = () => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                // Callback when fade-out is complete
                onHide();
            });
        };

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            fadeOut();
        }, 1000);

        return () => clearTimeout(timeout);
    }, [fadeAnim, onHide]);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <View
                style={[{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 10,
                    borderRadius: 5,
                }, styles.contaioner]}
            >
                <Text style={{ color: 'white', textAlign: 'center' }}>{message}</Text>
            </View>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    contaioner: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 10,
    },
});
export default FadeOutAlert;
