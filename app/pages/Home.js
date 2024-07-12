import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient';
import FilterCard from '../components/FilterCard';
import ChallengeCard from '../components/ChallengeCard'
import { db, auth } from '../firebase/config';
import { getDocs, collection, query, orderBy, limit, updateDoc, doc, getDoc } from 'firebase/firestore';


export default function Home({ navigation }) {

  const [picture, setPicture] = useState(null)

const challenges = [
    { id: 1, name: 'Pushup', exercise: "pushup", time: 0.5, timeMeasure: 'mins', type: "Upper Body", associatedColor: "#D6CDC0" },
    { id: 2, name: 'Plank', exercise: "face_plank", time: '∞', timeMeasure: 'secs', type: "Core", associatedColor: "#E7FBBC" },
    { id: 3, name: 'Lunge', exercise: "lunge", time: 1, timeMeasure: 'mins', type: "Lower Body", associatedColor: "#F0C7FF" },
    { id: 4, name: 'Squat', exercise: "squat", time: 1, timeMeasure: 'mins', type: "Lower Body", associatedColor: "#F0C7FF" },
    { id: 5, name: 'Left Leg Balance', exercise: "balance_leg_left", time: '∞', timeMeasure: 'secs', type: "Balance", associatedColor: "#C0C2D6" },
    { id: 6, name: 'Right Leg Balance', exercise: "balance_leg_right", time: '∞', timeMeasure: 'secs', type: "Balance", associatedColor: "#C0C2D6" },
  ]

  const [filteredChallenges, setFilteredChallenges] = useState(challenges);

  const [filters, setFilters] = useState([
    { id: 1, name: 'Upper Body', selected: false, associatedColor: "#D6CDC0" },
    { id: 2, name: 'Lower Body', selected: false, associatedColor: "#F0C7FF" },
    { id: 3, name: 'Core', selected: false, associatedColor: "#E7FBBC" },
    { id: 4, name: 'Balance', selected: false, associatedColor: "#C0C2D6" },
  ])

  useEffect(() => {
    const handleData = async () => {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const userQuerySnapshot = await getDoc(userDoc);
      const userData = userQuerySnapshot.data();
      setPicture(userData.profileImage)
    }

    handleData();
  }, [])

  const onFilterClick = (item) => {
    let updatedState = filters.map((filterItem) => {
      if(filterItem.id == item.id) {
        if(filterItem.selected) {
          setFilteredChallenges(challenges);
          return {
            ...filterItem, 
            selected: false
          }
        } else {
          setFilteredChallenges(challenges.filter((item) => {
            return filterItem.name == item.type;
          }))
          return {
            ...filterItem, 
            selected: true
          }
        }
      } else {
        return {
          ...filterItem, 
          selected: false
        }
      }
    })
    setFilters(updatedState)
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <View>
          <Text style={[styles.header, {marginLeft: 20}]}>Challenge</Text>
          <Text style={[styles.header, {fontFamily: 'Lexend SemiBold', marginTop: -10, marginLeft: 20}]}>yourself.</Text>
        </View>
        <View style={{width: 'auto', height: 'auto', marginRight: 20, alignItems: 'center', justifyContent: 'center'}}>
          {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>  
            <View style={{backgroundColor: '#D6D6D6', width: 75, height: 75, borderRadius: '100%'}}></View>
          </TouchableWithoutFeedback> */}

          {picture ? 
                <Image source={{ uri: picture }} cachePolicy='memory-disk' style={{width: 80, height: 80, borderRadius: 40}} />
                : <View style={{backgroundColor: '#D6D6D6', width: 80, height: 80, borderRadius: 40}}></View>
            }
        </View>
      </View>
      <View style={{height: 40, marginTop: 5, marginBottom: 5}}>
        <FlatList 
          contentContainerStyle={{paddingLeft: 17, paddingRight: 17}} 
          data={filters} 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          renderItem={({item}) => {
            return <FilterCard 
                      onPress={() => onFilterClick(item)} 
                      selected={item.selected} 
                      key={item.id}>
                        {item.name}
                    </FilterCard>
        }}/>
      </View>
      <View>
        <FlatList contentContainerStyle={{paddingBottom: 200}} data={filteredChallenges} showsVerticalScrollIndicator={false} renderItem={({item}) => {
          return <ChallengeCard 
                    name={item.name + " Challenge"} 
                    exercise={item.exercise}
                    time={item.time} 
                    backgroundColor={item.associatedColor} 
                    navHome={() => navigation.navigate('Start', {
                      name: item.name,
                      exercise: item.exercise, 
                      time: item.time
                    })}
                    navLeaderboard={() => navigation.navigate("Leaderboard", {
                      name: item.name,
                      exercise: item.exercise
                    })}/>
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
      paddingTop: 60
    },
    scrollView: {
      marginTop: 10,
      backgroundColor: 'red',
    }, 
    header: {
      fontSize: 46,
      fontFamily: 'Lexend Light',
      alignSelf: 'flex-start'
    },
  });
  