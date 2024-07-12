import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight } from 'react-native';
import CameraCard from '../components/CameraCard';
import VisionWebView from '../components/VisionWebView';

export default function Challenge({ route, navigation }) {

  const {name, exercise, time} = route.params

  const [isReady, setIsReady] = useState(false)
  const [startWorkout, setStartWorkout] = useState(false)
  const [repsCounter, setRepsCounter] = useState(0)
  const [poseTrackerInfos, setCurrentPoseTrackerInfos] = useState()

  useEffect(() => {
    console.log(poseTrackerInfos)
    if(poseTrackerInfos?.ready) {
      setIsReady(true)
    }
  }, [poseTrackerInfos])

  // useEffect(() => {
  //   if(isReady){
  //     if(countdown == 0) {
  //       setInitialText("Start")
  //     } else {
  //       setInitialText(countdown.toString())
  //     }
  //   } else {
  //     if(poseTrackerInfos?.type == "initialization" || poseTrackerInfos == undefined) {
  //       setInitialText("Loading...")
  //     } else {
  //       setInitialText(poseTrackerInfos.placementMessage.substring(0,11) + poseTrackerInfos.placementMessage.substring(12))
  //     }
  //   }
  // }, [isReady, countdown, poseTrackerInfos])

  const [countdown, setCountdown] = useState(3)
  const timeRef = useRef(countdown)

  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
        timeRef.current -= 1;
        if (timeRef.current < 0) {
            clearInterval(countdownInterval);
            setStartWorkout(true);
        } else {
            setCountdown(timeRef.current);
        }
    }, 1000)
  }

  useEffect(() => {
    if(isReady) {
      startCountdown();
      console.log("Ready!")
    }
  }, [isReady])

  return (
    <View style={styles.container}>
      {!startWorkout ? <TouchableHighlight style={{alignSelf: 'flex-start', marginTop: 70, marginLeft: 30, position: 'absolute', zIndex: 1 }} onPress={() => navigation.navigate("Home")}><Text>Back</Text></TouchableHighlight> : null}
      <VisionWebView exercise={exercise} difficulty="normal" setIsReady={setIsReady} setRepsCounter={setRepsCounter} setCurrentPoseTrackerInfos={setCurrentPoseTrackerInfos} />
      <CameraCard initialTime={time} reps={repsCounter} startStopwatch={startWorkout} isReady={isReady} poseTrackerInfos={poseTrackerInfos} countdown={countdown} endChallenge={() => navigation.navigate("End", {name: name, exercise: exercise, reps: repsCounter})} /> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
  });
  