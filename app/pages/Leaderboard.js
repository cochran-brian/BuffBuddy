import { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, FlatList } from 'react-native';
import LeaderboardComponent from '../components/LeaderboardComponent'

export default function Leaderboard({ route, navigation }) {

  const {name} = route.params

  const rankings = [
    { id: 1, username: 'bcochran', reps: 32 },
    { id: 2, username: 'bschweitzer', reps: 30 },
  ]

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <View>
          <Text style={[styles.header, {marginLeft: 20, maxWidth: 200}]}>{name}s</Text>
          <Text style={[styles.header, {fontFamily: 'Lexend SemiBold', marginTop: -10, marginLeft: 20}]}>ranked.</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>  
          <Image 
            style={{marginRight: 20}} 
            source={require('../assets/logo.png')}></Image>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <FlatList data={rankings} showsVerticalScrollIndicator={false} renderItem={({item}) => {
          return <LeaderboardComponent username={item.username} reps={item.reps} />
        }}/>
      </View>
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
      fontSize: 48,
      fontFamily: 'Lexend Light',
      alignSelf: 'flex-start'
    },
  });
  