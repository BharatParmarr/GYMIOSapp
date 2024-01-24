
import React, { createContext } from 'react';

const themecolors = {
    nav_primiry: '#1800ec',
    white: '#ffffff',
    black: '#000000',
    gray: '#808080',
    bg_color: '#eaeaea',
};

export const ThemeContext = createContext({
    themecolors: themecolors,
    setThemecolor: (value: any) => { },
});

export const UserDetails = createContext({
    userdetails: {
        userid: 0,
        username: 'loading...',
        email: 'loading...',
        bio: 'loading...',
        is_member: true,
        is_admin: false,
        is_trainer: false,
        is_private: true,
        first_name: 'loading...',
        last_name: 'loading...',
        followers: '0',
        following: '0',
        posts: '0',
        profile_pic: './images/profilepicture.jpg',
        link: 'loading...',
    },
    setuserdetails: (value: any) => { },
});

export const Bestlift = createContext({
    bestlift: {
        bench_press: '0',
        squat: '0',
        dead_lift: '0',
        Push_ups: '0',
    },
    setbestlift: (value: any) => { },
});

export const Templates = createContext({
    templates: {
        asign_workouts: [],
        asign_workouts_name: [],
        currenday_of_asign: [],
    },
    settemplates: (value: any) => { },
});

export const List = React.createContext({
    list: {
        followers_list: [],
        following_list: [],
    },
    setlist: (value: any) => { },
})

export const Gym = createContext({
    Gymdetails: [{ 'name': 'Loading...', 'address': '.', 'image': '/media/gym_images/image.jpeg' }],
    setGymdetails: (value: any) => { },
})

export const prograss = createContext({
    prograsslist: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    setprograsslist: (value: any) => { },
});