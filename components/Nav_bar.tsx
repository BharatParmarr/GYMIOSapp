import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './theamcontext';



function Nav_bar() {

    const navigation = useNavigation();

    const home = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"  stroke="#00000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33537 7.87495C1.79491 9.00229 1.98463 10.3208 2.36407 12.9579L2.64284 14.8952C3.13025 18.2827 3.37396 19.9764 4.54903 20.9882C5.72409 22 7.44737 22 10.8939 22H13.1061C16.5526 22 18.2759 22 19.451 20.9882C20.626 19.9764 20.8697 18.2827 21.3572 14.8952L21.6359 12.9579C22.0154 10.3208 22.2051 9.00229 21.6646 7.87495C21.1242 6.7476 19.9738 6.06234 17.6731 4.69181L16.2882 3.86687C14.199 2.62229 13.1543 2 12 2C10.8457 2 9.80104 2.62229 7.71175 3.86687L6.32691 4.69181C4.02619 6.06234 2.87583 6.7476 2.33537 7.87495ZM8.2501 17.9998C8.2501 17.5856 8.58589 17.2498 9.0001 17.2498H15.0001C15.4143 17.2498 15.7501 17.5856 15.7501 17.9998C15.7501 18.414 15.4143 18.7498 15.0001 18.7498H9.0001C8.58589 18.7498 8.2501 18.414 8.2501 17.9998Z" fill="#6906fe"/> </g></svg>`

    const search = `<svg viewBox="0 0 24 24" fill="none" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#6906fe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`

    const plus = `<svg viewBox="0 0 24 24" fill="none" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5V19M5 12H19" stroke="#6906fe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`

    const notifications = `<svg fill="#6909fe" viewBox="0 0 512 512"  stroke="#6909fe"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-j</title><path d="M256,480a80.09,80.09,0,0,0,73.3-48H182.7A80.09,80.09,0,0,0,256,480Z"></path><path d="M400,288V227.47C400,157,372.64,95.61,304,80l-8-48H216l-8,48c-68.88,15.61-96,76.76-96,147.47V288L64,352v48H448V352Z"></path></g></svg>`

    const persone = `<svg fill="#6909fe" viewBox="0 0 32 32"  stroke="#6909fe"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg>`

    const { themecolors, setThemecolor } = useContext(ThemeContext);
    const [nav_primiry, setnav_primiry] = useState(themecolors.nav_primiry);
    const [white, setwhite] = useState(themecolors.white);
    const [black, setblack] = useState(themecolors.black);
    const [gray, setgray] = useState(themecolors.gray);
    const [bg_color, setbg_color] = useState(themecolors.bg_color);

    useEffect(() => {
        setnav_primiry(themecolors.nav_primiry);
        setwhite(themecolors.white);
        setblack(themecolors.black);
        setgray(themecolors.gray);
        setbg_color(themecolors.bg_color);
    }, [themecolors])

    const styles = StyleSheet.create({
        nav_container: {
            width: '100%',
            height: '100%',
            backgroundColor: white,
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
            shadowColor: black,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }
    })
    return (
        <View style={styles.nav_container} >
            <SvgXml xml={home} width={24} height={24} onPress={() => { navigation.navigate('start_workout') }} />
            <SvgXml xml={search} width={24} height={24} onPress={() => navigation.navigate('search')} />
            <SvgXml xml={plus} width={26} height={26} onPress={() => { navigation.navigate('create_template') }} />
            <SvgXml xml={notifications} width={24} height={24} onPress={() => { navigation.navigate('notification') }} />
            <SvgXml xml={persone} width={27} height={27} onPress={() => { navigation.navigate('profile') }} />
        </View>
    )
}


export default Nav_bar;