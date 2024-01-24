import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { API_HOST } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from 'react-native-image-slider-banner/src/style'
import { ThemeContext } from './theamcontext'

const PeginesionUser = ({ route, navigation }: any) => {

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

    let styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: bg_color,
        },
        search_result: {
            backgroundColor: bg_color,
            borderRadius: 0,
            borderWidth: 0,
            borderColor: gray,
            justifyContent: 'flex-start',
            padding: 5,
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
        },
        input: {
            height: 45,
            borderColor: 'gray',
            borderWidth: 0,
            padding: 7,
            margin: 15,
            marginTop: 23,
            marginBottom: 23,
            borderRadius: 5,
            backgroundColor: white,
            color: black,
            fontFamily: 'Roboto',
            shadowColor: black,
            shadowRadius: 10,
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 0 },
            elevation: 2,
        },
        list_image: {
            width: 50,
            height: 50,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: gray,
        },
        list_name: {
            fontSize: 15,
            marginLeft: 10,
            marginTop: 10,
            color: black,
        },
        plus_icon_holder: {
            position: 'absolute',
            right: 10,
            top: 10,
        },
        plus_icon: {
            fontSize: 10,
            color: gray,
        },
        image_background: {
            width: 50,
            height: 50,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: gray,
            backgroundColor: white,
            justifyContent: 'center',
            alignItems: 'center',
        },
        flatlist: {
            flex: 1,
            backgroundColor: bg_color,
        },
        end_message: {
            textAlign: 'center',
            color: gray,
            fontSize: 12,
            marginVertical: 10,
        }
    })

    const { name } = route.params
    const { id } = route.params

    const [data, setData] = useState([{ user: { username: 'Loading...', profile_picture: null }, id: 1 }])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [isRemaining, setIsRemaining] = useState(true)
    const ref = React.useRef(true);
    const [endmessge, setEndmessge] = useState('')

    // console.log('no data', data)
    useEffect(() => {
        if (loading) {
            return
        } else {
            setLoading(true)
            const fetchdata = async () => {

                fetch(`${API_HOST}/pagination/${name}/${id}/?${page}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.data.length === 0) {
                            setIsRemaining(false)
                            setLoading(false)

                            return;
                        }
                        // console.log(res.data)
                        setData(res.data)
                        setLoading(false)
                    })
                    .catch(err => {
                        setError(err)
                        setLoading(false)
                    })
            }
            fetchdata()
        }
    }, [])

    useEffect(() => {
        if (ref.current) {
            ref.current = false
            return;
        }
        const fetchdata = async () => {
            console.log('page', page)
            let url = `${API_HOST}/pagination/${name}/${id}/?page=${page}`
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${await AsyncStorage.getItem('@token')}`,
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.data.length === 0) {
                        setIsRemaining(false)
                        setLoading(false)
                        return;
                    }
                    console.log(res.data)
                    setData([...data, ...res.data])
                    setLoading(false)
                })
                .catch(err => {
                    setError(err)
                    setLoading(false)
                })
        }
        fetchdata()

    }, [page])
    return (<>
        <FlatList
            style={styles.flatlist}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => {
                console.log('end')
                if (isRemaining && !loading) {
                    setPage(page + 1)
                } else if (!isRemaining) {
                    setEndmessge('No more data')
                }
            }}
            renderItem={
                ({ item }) => (
                    <TouchableOpacity activeOpacity={0.6} style={styles.search_result}>
                        <View style={styles.image_background}>
                            {item.user.profile_picture == null ? <Image style={styles.list_image} source={require('./images/defult.jpg')} /> : <Image style={styles.list_image} source={{ uri: `${API_HOST}/${item.user.profile_picture}` }} />}
                        </View>
                        <Text style={styles.list_name}>{item.user.username}</Text>
                        {isRemaining ? <View style={styles.plus_icon_holder} onPointerUp={() => setPage(page + 1)}><Text style={styles.plus_icon}>View More</Text></View> : <View style={styles.plus_icon_holder}><Text style={styles.plus_icon}>No more data</Text></View>}

                    </TouchableOpacity>
                )
            } />
        {endmessge ? <Text style={styles.end_message}>{endmessge}</Text> : null}
    </>
    )
}

export default PeginesionUser