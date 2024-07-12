import React, { useEffect, useRef, useState} from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, TouchableWithoutFeedback, Pressable, ActivityIndicator } from 'react-native'
import { MaterialIndicator, BallIndicator, DotIndicator, BarIndicator } from 'react-native-indicators';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';


export default function PersonalRecordComponent({ exercise, reps, timestamp }) {

    const date = new Date(timestamp)
    const month = date.getMonth() + 1 < 10 ? "0" + date.getMonth() : date.getMonth();
    const day = date.getDay() + 1 < 10 ? "0" + date.getDay() : date.getDay();
    const year = date.getFullYear()

 return (
  <View style={styles.container}>
    <View style={{flexDirection: 'column'}}>
        <Text style={{marginLeft: 20, fontFamily: 'Lexend Light', fontSize: 32}}>{exercise}</Text>
        <Text style={{marginLeft: 20, fontFamily: 'Lexend Light', fontSize: 14}}>{`${month}/${day}/${year}`}</Text>
    </View>
        <Text style={{marginRight: 20, fontFamily: 'Lexend Light', fontSize: 48}}>{reps}</Text>
  </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    height: 80,
    marginTop: 10,
    borderColor: '#00000033',
    borderWidth: 3,
  },
});
