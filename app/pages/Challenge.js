import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CameraCard from '../components/CameraCard';
import VisionWebView from '../components/VisionWebView';

export default function Challenge({ route, navigation }) {

  const {name, time} = route.params

  return (
   <View style={styles.container}>
      <VisionWebView exercise="squat" difficulty="easy" />
      <CameraCard initialTime={time} endChallenge={() => navigation.navigate("End", {name: name, reps: 32})} />
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  });
  