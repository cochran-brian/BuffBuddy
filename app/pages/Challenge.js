import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CameraCard from '../components/CameraCard';
import VisionWebView from '../components/VisionWebView';

export default function Challenge({ route, navigation }) {

  const {name, time} = route.params

  const [poseTrackerInfos, setCurrentPoseTrackerInfos] = useState()
  const [repsCounter, setRepsCounter] = useState(0)

    {
      !poseTrackerInfos ? 
      (
        <Text>Loading...</Text>
      ) : 
      (
        <View style={styles.container}>
          <VisionWebView exercise="squat" difficulty="easy" setRepsCounter={setRepsCounter} setCurrentPoseTrackerInfos={setCurrentPoseTrackerInfos} />
          <CameraCard initialTime={time} endChallenge={() => navigation.navigate("End", {name: name, reps: repsCounter})} />
        </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  });
  