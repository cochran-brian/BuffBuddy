import React, { useEffect, useRef, useState} from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CameraCard({initialTime, reps, startStopwatch, isReady, poseTrackerInfos, countdown, endChallenge}) {

    // initial time should be in minutes
    const [time, setTime] = useState(initialTime == "∞" ? null : initialTime * 60)
    const timeRef = useRef(time)

    useEffect(() => {
      console.log(poseTrackerInfos)

      if(startStopwatch && time) {
        const stopwatchInterval = setInterval(() => {
          timeRef.current -= 1;
          if (timeRef.current < 0) {
              clearInterval(stopwatchInterval);
              endChallenge();
          } else {
              setTime(timeRef.current);
          }
        }, 1000)
        return () => {
            clearInterval(stopwatchInterval);
        };
      }
    }, [startStopwatch])

    useEffect(() => {
      console.log(reps)
    }, [reps])

 return (
  <View style={styles.container}>
    {!startStopwatch ?
      <View style={styles.waiting}>{isReady ? <Text style={{fontSize: 50, fontFamily: 'Lexend SemiBold'}}>{countdown == 0 ? "Start!" : countdown}</Text> : <Text style={styles.loadingText}>{poseTrackerInfos?.type == "initialization" || poseTrackerInfos == undefined ? "Loading..." : poseTrackerInfos.message}</Text>}</View>
      :
      <>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.leftContainer}>
                <View style={{alignItems: 'center', width: 200, marginLeft: -10}}>
                  {/* <Text style={{fontFamily: 'Lexend Light', fontSize: 64, marginBottom: -10}}>{Math.floor(reps / 60) < 10 ? "0" + Math.floor(reps / 60) : Math.floor(reps / 60)}:{reps % 60 < 10 ? "0" + reps % 60 : reps % 60}</Text> : */}
                  {/* {time ? <Text>0</Text> :
                  <> */}
                    <Text style={{fontFamily: 'Lexend Light', fontSize: 64, marginBottom: -10}}>{Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60)}:{time % 60 < 10 ? "0" + time % 60 : time % 60}</Text>
                    <Text style={{fontFamily: 'Lexend Light', fontSize: 16}}>Time Remaining</Text>
                  {/* </>} */}
                </View>
                {/* <Text style={{fontFamily: 'Lexend Light', fontSize: 30}}>A little lower</Text>  */}
            </View>
            <View style={styles.rightContainer}>
          
                <View style={{alignItems: 'center'}}>
                  {/* {initialTime = "∞" ? 
                      null
                    :
                    <>   */}
                      <Text style={{fontFamily: 'Lexend Light', fontSize: 64, marginBottom: -10}}>{reps}</Text>
                      <Text style={{fontFamily: 'Lexend Light', fontSize: 16}}>Reps</Text>
                    {/* </>
                  }  */}
                </View>
                <TouchableHighlight style={styles.button} onPress={endChallenge}><Text style={{fontSize: 24, fontFamily: 'Lexend Light', color: 'white'}}>End</Text></TouchableHighlight>
            </View>
        </View>
        <View style={{position: 'absolute', alignSelf: 'center', marginTop: 140}}>
        {/* {time ? <Text>0</Text> :  */}
        <Progress.Bar borderWidth={0} animated={true} progress={((initialTime * 60) - time) / (initialTime * 60)} width={315} unfilledColor={'#DDDDDD'} />
         {/* } */}
        </View>
      </>
    }
  </View>
 );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: "#BBBBBB",
    shadowOpacity: 0.8,
    width: '100%',
    height: '30%',
  },
  leftContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    height: '100%',
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 30,
  },
  rightContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end',
    height: '100%',
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 30
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45
  },
  waiting: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
    height: "100%"
  },
  loadingText: {
    fontFamily: "Lexend Light",
    fontSize: 32
  }
});
