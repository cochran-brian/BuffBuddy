import { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableHighlight } from 'react-native';

export default function Start({ route, navigation }) {

  const {name, time} = route.params;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>  
        <Image source={require('../assets/logo.png')}></Image>
      </TouchableWithoutFeedback>
      <Text style={styles.header}>{name} challenge</Text>
      <Text style={styles.time}>{time > 1 || time == "∞" ? time + " mins" : time + " min"}</Text>
      <TouchableHighlight style={styles.button} onPress={() => navigation.navigate("Challenge", {name, time})}><Text style={{fontSize: 18, fontFamily: 'Lexend Light'}}>Begin</Text></TouchableHighlight>
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
    time: {
      fontFamily: 'Lexend Light',
      fontSize: 48,
      marginTop: '10%'
    },
    button: {
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 45,
      width: 120,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10%'
    }
  });
  