import React, { useEffect, useRef, useState} from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, TouchableWithoutFeedback, Pressable } from 'react-native';

export default function LeaderboardComponent({ username, reps }) {

 return (
  <View style={styles.container}>
    <Text style={{marginLeft: 20, fontFamily: 'Lexend Light', fontSize: 24}}>@{username}</Text>
    <Text style={{marginRight: 20, fontFamily: 'Lexend Light', fontSize: 48}}>{reps}</Text>
  </View>
 );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: 350,
    height: 80,
    borderColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
});
