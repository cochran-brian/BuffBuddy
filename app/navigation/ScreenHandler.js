import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home.js'
import Challenge from '../pages/Challenge.js'
import End from '../pages/End.js'
import leaderboard from '../pages/Leaderboard.js'
import Login from '../pages/Login.js'
import Register from '../pages/Register.js'
import Start from '../pages/Start.js'
import Profile from '../pages/Profile.js'
import HomeTabs from '../navigation/HomeTabs.js'
import { auth } from '../firebase/config.js'
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function ScreenHandler() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    onAuthStateChanged(auth, async (user) => {
        console.log(auth.currentUser)
        setIsAuthenticated(!!user);
    });

    return(
    <NavigationContainer>
     <Stack.Navigator>
        {auth.currentUser ? <>
            <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{headerShown: false}}
            /> 
            <Stack.Screen
                name="Challenge"
                component={Challenge}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="End"
                component={End}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Start"
                component={Start}
                options={{headerShown: false}}
            />
        </> : <>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
            />
        </>}
     </Stack.Navigator>
    </NavigationContainer>
    )
};