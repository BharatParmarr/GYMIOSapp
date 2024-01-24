import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Appearance } from "react-native";

export async function Settheamcolor() {

    let obj = {
        nav_primiry: '#1800ec',
        white: '#ffffff',
        black: '#000000',
        gray: '#808080',
        bg_color: '#eaeaea',
    }
    await AsyncStorage.getItem('theme').then((value) => {
        console.log(value);
        if (value == 'light') {
            obj['nav_primiry'] = '#1800ec';
            obj['white'] = '#ffffff';
            obj['black'] = '#000000';
            obj['gray'] = '#808080';
            obj['bg_color'] = '#eaeaea';

        } else if (value == 'dark') {
            obj['nav_primiry'] = '#480cfe';
            obj['white'] = '#000000';
            obj['black'] = '#ffffff';
            obj['gray'] = '#808080';
            obj['bg_color'] = '#1e1e1e';
        } else {
            let colorScheme = Appearance.getColorScheme();
            if (colorScheme == 'light') {
                obj['nav_primiry'] = '#1800ec';
                obj['white'] = '#ffffff';
                obj['black'] = '#000000';
                obj['gray'] = '#808080';
                obj['bg_color'] = '#eaeaea';
            } else if (colorScheme == 'dark') {
                obj['nav_primiry'] = '#480cfe';
                obj['white'] = '#000000';
                obj['black'] = '#ffffff';
                obj['gray'] = '#808080';
                obj['bg_color'] = '#1e1e1e';
            }
        }
    });
    return obj;
}