import React, { useEffect, useRef, useState} from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, TouchableWithoutFeedback, Pressable, ActivityIndicator } from 'react-native'
import { MaterialIndicator, BallIndicator, DotIndicator, BarIndicator } from 'react-native-indicators';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';


export default function ChallengeCard({ name, exercise, time, backgroundColor, navHome, navLeaderboard }) {

  const [record, setRecord] = useState(null);

  useEffect(() => {
    const handleData = async () => {
      const leaderboardRef = collection(db, 'challenges', exercise, 'leaderboard');
      const q = query(leaderboardRef, orderBy("reps", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      var rankings = [];
      querySnapshot.forEach((doc) => {
        rankings.push(doc.data())
      })
      if(rankings.length > 0) {
        console.log(rankings)
        setRecord(rankings[0].reps)
       } else {
        setRecord("0");
       } 
    }

    handleData();
  }, [])

 return (
  <TouchableWithoutFeedback onPress={navHome}>
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={styles.leftContainer}>
          <Text style={styles.text} numberOfLines={2}>{name}</Text>
          <Text style={{color: "#00000066", fontFamily: 'Lexend Light', fontWeight: 'thin'}}>{time > 1 || time == "∞" ? time + " mins" : time + " min"}</Text>
      </View>
      <View style={styles.rightContainer}>
          <View style={{alignItems: 'center', width: '60%'}}>
              {record ? <Text style={{fontFamily: "Lexend Light", fontSize: 48, maxHeight: 65}}>{record}</Text> : <View style={{maxHeight: 65}}><MaterialIndicator color='black' /></View>}
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
    fontSize: 30,
    fontFamily: 'Lexend Light',
    width: 165,
  }
});
