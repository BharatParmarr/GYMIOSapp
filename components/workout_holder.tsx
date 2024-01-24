import { Image, Text, View, StyleSheet, ScrollView, Animated, Easing } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'


function Workout_holder(){

   let [curent_day, set_curent_day] = useState('1')

    let workout = {
        '1':[['workout_name','10','1'],['chest press','20', '2'],['leg press', 20, 1],['le', 20, 1],['le',4,2],['workout_name','10','1'],['chest press','20', '2'],['leg press', 20, 1],['le', 20, 1],['le',4,2]],
        '2':[['workout_name','10','1'],['leg press', 20, 1]],
        '3':[['workout_name','10','1'],['leg press', 20, 1]],
        '4':[['workout_name','10','1'],['leg press', 20, 1]],
    }
    return (
      <ScrollView style={styles.holder_table}>
          
        <View style={styles.table_heading_row}>
            <Text style={{color: black,textAlign: 'center'}}>Image</Text>
            <Text style={{color: black,textAlign: 'center'}}>Workout Name</Text>
            <Text style={{color: black,textAlign: 'center'}}>sets</Text>
            <Text style={{color: black,textAlign: 'center'}}>reps</Text>
        </View>
        {/* workout object */}
        {/* loading */}
        
        {workout[curent_day].map((item, index) => {
                return (
                    <View style={styles.table_row}>
                        <Image source={require('./images/img.jpg')} style={{width: '25%', height: 60}} />
                        <Text style={{color: black,textAlign: 'center',width: '25%'} }>{item[0]}</Text>
                        <Text style={{color: black,textAlign: 'center', width: '25%'}}>{item[1]}</Text>
                        <Text style={{color: black,textAlign: 'center', width: '25%'}}>{item[2]}</Text>
                    </View>
                )
            })
        }
      </ScrollView>
    )
}


let nav_primiry = '#6906fe'
let white = '#ffffff'
let black = '#000000'
let gray = '#808080'
let bg_color = '#eaeaea'

let styles = StyleSheet.create({
    holder_table: {
        flexDirection: 'column',
        backgroundColor: white,
        borderRadius: 0,
        padding: 10,
        margin: 0,
        shadowColor: gray,
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        display: 'flex',
        height: '0%',
        width: '100%',
    },
    table_heading_row: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        width: '94%',
        height: '70px',
        alignSelf: 'center',
    },
    table_row: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        padding: 3,
        margin: 3,
        display: 'flex',
        width: '100%',
        height: 85,
        borderTopColor: black,
        borderTopWidth: 1,
        alignSelf: 'center',
        color: black,
    },
    loading: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 2,
        backgroundColor: white,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: black,
        top: 0,
        left: 0,
    }
})

export default Workout_holder