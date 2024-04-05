import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import FilterCard from '../components/FilterCard';
import ChallengeCard from '../components/ChallengeCard'


export default function Home({ navigation }) {

const challenges = [
    { id: 1, name: 'Pushup', time: 1, type: "Upper Body", associatedColor: "#D6CDC0" },
    { id: 2, name: 'Situp', time: 3, type: "Core", associatedColor: "#E7FBBC" },
    { id: 3, name: 'Plank', time: '∞', type: "Core", associatedColor: "#E7FBBC" },
    { id: 4, name: 'Squat', time: 2, type: "Lower Body", associatedColor: "#F0C7FF" },
    { id: 5, name: 'Jumping Jack', time: 2, type: "Cardio", associatedColor: "#C0C2D6" },
  ]

  const [filteredChallenges, setFilteredChallenges] = useState(challenges);

  const [filters, setFilters] = useState([
    { id: 1, name: 'Upper Body', selected: false, associatedColor: "#D6CDC0" },
    { id: 2, name: 'Lower Body', selected: false, associatedColor: "#F0C7FF" },
    { id: 3, name: 'Core', selected: false, associatedColor: "#E7FBBC" },
    { id: 4, name: 'Cardio', selected: false, associatedColor: "#C0C2D6" },
  ])

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
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>  
          <Image 
            style={{marginRight: 20}} 
            source={{uri: 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg'}}></Image> 
        </TouchableWithoutFeedback>
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
                    name={item.name + " challenge"} 
                    time={item.time} 
                    backgroundColor={item.associatedColor} 
                    navHome={() => navigation.navigate('Start', {
                      name: item.name, 
                      time: item.time
                    })}
                    navLeaderboard={() => navigation.navigate("Leaderboard", {
                      name: item.name
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
      paddingTop: 70
    },
    scrollView: {
      marginTop: 10,
      backgroundColor: 'red',
    }, 
    header: {
      fontSize: 48,
      fontFamily: 'Lexend Light',
      alignSelf: 'flex-start'
    },
  });
  