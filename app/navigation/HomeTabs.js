import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../pages/Home.js'
import Challenge from '../pages/Challenge.js'
import End from '../pages/End.js'
import Leaderboard from '../pages/Leaderboard.js'
import Start from '../pages/Start.js'
import Profile from '../pages/Profile.js'

import colors from '../assets/colors'
import { auth } from '../firebase/config';

const Tab = createBottomTabNavigator();

export default function TabHandler(){

    return(
            <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Leaderboard') {
                    iconName = focused ? 'podium' : 'podium-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                }

                return <Ionicons name={iconName} size={25} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'black',
            })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Leaderboard" component={Leaderboard} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
    );
}