import { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableHighlight, Pressable } from 'react-native';

export default function End({ route, navigation }) {

  const {name, reps} = route.params;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>  
        <Image source={require('../assets/logo.png')}></Image>
      </TouchableWithoutFeedback>
      <Text style={styles.header}>Great{"\n"}work!</Text>
      <View style={{flexDirection: 'row', marginTop: '10%'}}>
        <View style={{alignItems: 'center', marginHorizontal: 10}}>
          <Text style={{fontFamily: "Lexend Light", fontSize: 64}}>{reps}</Text>
          <Text style={{fontFamily: "Lexend Light", fontSize: 16}}>Reps</Text>
        </View>
        <View style={{alignItems: 'center', marginHorizontal: 10}}>
          <Text>
            <Text style={{fontFamily: "Lexend Light", fontSize: 64}}>97</Text>
            <Text style={{fontFamily: "Lexend Light", fontSize: 16}}>%</Text>
          </Text>
          <Text style={{fontFamily: "Lexend Light", fontSize: 16}}>Form</Text>
        </View>
        <View style={{alignItems: 'center', marginHorizontal: 10}}>
          <Text style={{fontFamily: "Lexend Light", fontSize: 64}}>1</Text>
          <Text style={{fontFamily: "Lexend Light", fontSize: 16}}>Ranking</Text>
        </View>
      </View>
      <Pressable style={{marginTop: "10%"}} onPress={() => navigation.navigate("Leaderboard", {name: name})}><Text style={{color: "black", fontFamily: 'Lexend Light', textDecorationLine: 'underline'}}>See leaderboard</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'start',
      paddingTop: 70
    },
    header: {
      fontFamily: 'Lexend Light',
      fontSize: 64,
      textAlign: 'center',
      marginTop: '10%'
    },
  });
  