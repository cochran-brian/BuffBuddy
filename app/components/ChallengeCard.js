import React, { useEffect, useRef, useState} from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, TouchableWithoutFeedback, Pressable } from 'react-native';

export default function FilterCard({ name, time, backgroundColor, navHome, navLeaderboard }) {

    // 0 is temporarily hard-coded

 return (
  <TouchableWithoutFeedback onPress={navHome}>
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={styles.leftContainer}>
          <Text style={styles.text} numberOfLines={2}>{name}</Text>
          <Text style={{color: "#00000066", fontFamily: 'Lexend Light', fontWeight: 'thin'}}>{time > 1 || time == "∞" ? time + " mins" : time + " min"}</Text>
      </View>
      <View style={styles.rightContainer}>
          <View style={{alignItems: 'center', width: '60%'}}>
              <Text style={{fontSize: 48, fontFamily: 'Lexend Light'}}>0</Text> 
              <Text style={{fontSize: 11, fontFamily: 'Lexend Light', color: "#00000066"}}>Record</Text>
          </View>
          <Pressable onPress={navLeaderboard}><Text style={{color: "#00000066", fontFamily: 'Lexend Light', textDecorationLine: 'underline'}}>See leaderboard</Text></Pressable>
      </View>
    </View>
  </TouchableWithoutFeedback>
 );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 30,
    width: 355,
    height: 175,
    marginTop: 5,
    borderColor: '#00000033',
    borderWidth: 3,
  },
  leftContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    height: '100%',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  rightContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end',
    height: '100%',
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  text: {
    fontSize: 36,
    fontFamily: 'Lexend Light',
    width: 165,
  }
});
