import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, Button, Touchable, TouchableOpacity } from 'react-native';

export default function FilterCard({ onPress, selected, children }) {

  // const [fontsLoaded] = useFonts({
  //   'Lexend-Light': require('./assets/fonts/Lexend-Light.ttf'),
  //   'Lexend-SemiBold': require('./assets/fonts/Lexend-SemiBold.ttf'),
  // });

 return (
    <TouchableHighlight underlayColor={"#C7CCFF"} style={[styles.container, selected ? {backgroundColor: "#C7CCFF", borderColor: '#AAAFE8'} : {}]} onPressIn={onPress}>
      <Text style={[styles.text, selected ? {color: "#AAAFE8"} : {}]}>{children}</Text>
    </TouchableHighlight>
 );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    width: 130,
    height: 40,
    borderColor: '#D6D6D6',
    borderWidth: 2,
    marginLeft: 3,
  },
  text: {
    color: '#C4CDCC',
    fontFamily: 'Lexend Light',
  }
});
