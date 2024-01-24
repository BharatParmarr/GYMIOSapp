import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'


const Trainer = () => {
    const do_somthing = () => {
        console.log('do somthing')
    }
    let users = [
        {
            name: 'John Doe',
            email: 'email@gmail.com',
            phone: '+91 9876543210',
            img: require('./images/img.jpg'),
        },
        {
            name: 'John Doe',
            email: 'email@gmail2.com',
            phone: '+91 9876543210',
            img: require('./images/img.jpg'),
        },
        {
            name: 'John Doe',
            email: 'email@gmail.com',
            phone: '+91 9876543210',
            img: require('./images/img.jpg'),
        }, {
            name: 'John Doe',
            email: 'email@gmail.com',
            phone: '+91 9876543210',
            img: require('./images/img.jpg'),
        },
        {
            name: 'John Doe',
            email: 'email@gmail2.com',
            phone: '+91 9876543210',
            img: require('./images/img.jpg'),
        },
        {
            name: 'John Doe',
            email: 'email@gmail.com',
            phone: '+91 9876543210',
            img: require('./images/img.jpg'),
        }
    ]
    return (
        <ScrollView style={styles.box_container}>

            {users.map((user, index) => {
                return (
                    <View key={index} style={styles.usr_box}>

                        <View style={styles.usr_img}>
                            <Image style={styles.usr_img_img} source={user.img} />
                        </View>
                        <View style={styles.usr_info}>
                            <Text style={styles.usr_info_name}>{user.name}</Text>
                            <Text style={styles.usr_info_email}>{user.email}</Text>
                            <Text style={styles.usr_info_phone}>{user.phone}</Text>
                        </View>
                        <View style={styles.usr_info_btn}>
                            <View style={styles.user_button} onTouchStart={do_somthing} ><Text style={styles.button_text}>Add Workout</Text></View>
                            <View style={styles.user_button} ><Text style={styles.button_text}>Diet</Text></View>
                        </View>
                    </View>
                )
            })}
            {/* <View style={styles.usr_box}>

                <View style={styles.usr_img}>
                    <Image style={styles.usr_img_img} source={require('./images/img.jpg')} />
                </View>
                <View style={styles.usr_info}>
                    <Text style={styles.usr_info_name}>John Doe1</Text>
                    <Text style={styles.usr_info_email}>email@gamil.com 1</Text>
                    <Text style={styles.usr_info_phone}>+91 9876543210 1</Text>
                </View>
                <View style={styles.usr_info_btn}>
                    <View style={styles.user_button} onTouchStart={do_somthing} ><Text style={styles.button_text}>Add Workout</Text></View>
                    <View style={styles.user_button} ><Text style={styles.button_text}>Diet</Text></View>
                </View>
            </View>
            <View style={styles.usr_box}>
                <View style={styles.usr_img}>
                    <Image style={styles.usr_img_img} source={require('./images/img.jpg')} />
                </View>
                <View style={styles.usr_info}>
                    <Text style={styles.usr_info_name}>John Doe</Text>
                    <Text style={styles.usr_info_email}>email@gamil.com 3</Text>
                    <Text style={styles.usr_info_phone}>+91 9876543210 3</Text>
                </View>
                <View style={styles.usr_info_btn}>
                    <View style={styles.user_button} ><Text style={styles.button_text}>Add Workout</Text></View>
                    <View style={styles.user_button} ><Text style={styles.button_text}>Diet</Text></View>
                </View>
            </View>
            <View style={styles.usr_box}>
                <View style={styles.usr_img}>
                    <Image style={styles.usr_img_img} source={require('./images/img.jpg')} />
                </View>
                <View style={styles.usr_info}>
                    <Text style={styles.usr_info_name}>John Doe</Text>
                    <Text style={styles.usr_info_email}>email@gamil.com 3</Text>
                    <Text style={styles.usr_info_phone}>+91 9876543210</Text>
                </View>
                <View style={styles.usr_info_btn}>
                    <View style={styles.user_button} onTouchStart={do_somthing} ><Text style={styles.button_text}>Add Workout</Text></View>
                    <View style={styles.user_button} ><Text style={styles.button_text}>Diet</Text></View>
                </View> 
            </View>*/}
        </ScrollView>
    )
}


let nav_primiry = '#480cfe'
let white = '#ffffff'
let black = '#000000'
let gray = '#808080'
let bg_color = '#eaeaea'


let styles = StyleSheet.create({
    box_container: {
        width: '100%',
        height: '100%',
        backgroundColor: bg_color,
    },
    usr_box: {
        height: 450,
        width: '84.5%',
        backgroundColor: white,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center',
        margin: 20,
    },
    usr_img: {
        width: '60%',
        height: '41%',
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    usr_img_img: {
        width: '100%',
        height: '100%',
        padding: 10,
        borderRadius: 5,
    },
    usr_info: {
        width: '100%',
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    usr_info_name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: black,
    },
    usr_info_email: {
        fontSize: 15,
        color: gray,
    },
    usr_info_phone: {
        fontSize: 15,
        color: gray,
    },
    usr_info_btn: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    user_button: {
        width: '30%',
        height: '90%',
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        margin: 10,
        shadowColor: nav_primiry,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.22,
        shadowRadius: 7.22,
        elevation: 8,
        borderWidth: 1,
        borderColor: nav_primiry,
    },
    button_text: {
        color: black,
    }
})


export default Trainer;