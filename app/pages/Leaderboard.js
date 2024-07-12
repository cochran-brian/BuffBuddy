import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, FlatList, Pressable } from 'react-native';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import LeaderboardComponent from '../components/LeaderboardComponent'
import { Svg, Path } from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Leaderboard({ route, navigation }) {



  const [rankings, setRankings] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('pushup');
  const [items, setItems] = useState([
    {label: 'Pushup', value: "pushup"},
    {label: 'Plank', value: "face_plank"},
    {label: 'Lunge', value: "lunge" },
    {label: 'Squat', value: "squat" },
    {label: 'Left Leg Balance', value: "balance_leg_left"},
    {label: 'Right Leg Balance', value: "balance_leg_right"},
  ]);

  useEffect(() => {
    if(route.params !== undefined) {
      setValue(route.params.exercise)
    } 
  }, [route.params])

  //   useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     var { name, exercise } = route.params
  //     console.log(route.params)
  //     setValue(exercise)
  //   })

  //   return unsubscribe;
  // }, [navigation])

  // // useEffect(() => {
  //   if(route.params !== undefined) {
  //     const { name, exercise } = route.params
  //     setValue(exercise)
  //   } else {
  //     setValue('pushup')
  //   }
  // // }, [])

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log("we focused")
  //     console.log(route.params)
  //     if(route.params !== undefined) {
  //           console.log(route.params)
  //           const { name, exercise } = route.params
  //           setValue(exercise)
  //         } else {
  //           setValue('pushup')
  //         }
  //   })

  //   return unsubscribe;
  // }, [navigation])
 

  useEffect(() => {
    
    const handleData = async () => {
      const leaderboardRef = collection(db, 'challenges', value, 'leaderboard');
      const q = query(leaderboardRef, orderBy("reps", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      var rankings = [];
      querySnapshot.forEach((doc) => {
        rankings.push(doc.data())
      })
      setRankings(rankings)
    }

    handleData();
  }, [value])

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', zIndex: 999}}>
        {/* <View> */}
          {/* <Text style={[styles.header, {marginLeft: 20, maxWidth: 220}]}>{name}s</Text> */}
          {/* <Text style={[styles.header, {fontFamily: 'Lexend SemiBold', marginTop: -10, marginLeft: 20}]}>ranked.</Text> */}
          <DropDownPicker
            style={{borderColor: '#00000033'}}
            containerStyle={{width: 150, marginLeft: 30}}
            textStyle={{fontSize: 18}}
            dropDownContainerStyle={{backgroundColor: 'white', zIndex: 999, borderColor: '#00000033'}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        {/* </View> */}
        <Pressable style={{marginRight: 30, marginTop: 0}} onPress={() => navigation.navigate("Home")}>
            <Svg width={40} height={40} viewBox="0 0 62 80" fill="none">
                <Path d="M10.559 75.3161C13.227 78.3473 17.0863 80.0583 21.121 79.9997H40.871C44.8905 80.0622 48.7421 78.3669 51.406 75.3552C61.992 64.9062 63.844 52.8002 56.906 39.3752C56.3318 38.2814 56.2771 36.9846 56.7576 35.844C58.3045 31.8362 59.2576 27.6213 59.5896 23.336C59.8747 20.7852 59.6872 18.2032 59.0427 15.7188C56.2029 5.82426 47.0427 0.683756 30.9527 -0.000244141C14.9447 0.683346 5.78069 5.82396 2.95269 15.7188C2.30816 18.2032 2.12066 20.7852 2.40581 23.336C2.73393 27.6212 3.68701 31.8321 5.23781 35.836C5.71437 36.9805 5.65969 38.2774 5.08937 39.379C-1.84423 52.801 0.0112705 64.906 10.5582 75.317L10.559 75.3161ZM17.9652 14.0271C20.7855 12.2615 24.9418 11.4529 31.0002 11.4919H31.0119C37.0783 11.4528 41.2109 12.2614 44.0349 14.0271H44.031C46.6091 15.7459 48.0896 18.7029 47.9138 21.8005C47.7576 25.5193 46.7615 28.3943 44.9685 30.3357C44.6638 30.6716 44.1873 30.7849 43.7654 30.6208C39.7068 28.988 35.3982 28.0739 31.0274 27.9216C31.0157 27.9216 31.0079 27.9333 30.9962 27.9333C30.9845 27.9333 30.9884 27.9216 30.9766 27.9216C26.6055 28.074 22.293 28.988 18.2346 30.6208C17.8167 30.7849 17.3362 30.6716 17.0354 30.3357C15.2385 28.3943 14.2463 25.5154 14.0901 21.8005C13.9144 18.7067 15.387 15.7497 17.9612 14.0271H17.9652Z"
                fill="black" />
                <Path d="M15.0575 64V45.8H23.0915C24.3395 45.8 25.3969 45.982 26.2635 46.346C27.1302 46.6927 27.7802 47.204 28.2135 47.88C28.6642 48.5387 28.8895 49.336 28.8895 50.272C28.8895 51.312 28.6295 52.1873 28.1095 52.898C27.6069 53.6087 26.8702 54.0853 25.8995 54.328L25.8475 53.834C26.6622 54.0073 27.3642 54.3107 27.9535 54.744C28.5602 55.1773 29.0282 55.7147 29.3575 56.356C29.6869 56.98 29.8515 57.6907 29.8515 58.488C29.8515 59.4067 29.6955 60.2127 29.3835 60.906C29.0715 61.582 28.6209 62.154 28.0315 62.622C27.4422 63.09 26.7489 63.4367 25.9515 63.662C25.1715 63.8873 24.3049 64 23.3515 64H15.0575ZM19.2175 60.308H23.1955C23.6809 60.308 24.0882 60.23 24.4175 60.074C24.7642 59.918 25.0329 59.6927 25.2235 59.398C25.4142 59.086 25.5095 58.7133 25.5095 58.28C25.5095 57.8813 25.4055 57.5433 25.1975 57.266C25.0069 56.9887 24.7295 56.7807 24.3655 56.642C24.0015 56.486 23.5682 56.408 23.0655 56.408H19.2175V60.308ZM19.2175 53.106H22.4675C22.9182 53.106 23.2995 53.0367 23.6115 52.898C23.9409 52.742 24.1835 52.534 24.3395 52.274C24.5129 51.9967 24.5995 51.6673 24.5995 51.286C24.5995 50.7313 24.4089 50.298 24.0275 49.986C23.6462 49.6567 23.0742 49.492 22.3115 49.492H19.2175V53.106Z"
                fill="white" />
                <Path d="M33.288 64V45.8H41.322C42.57 45.8 43.6273 45.982 44.494 46.346C45.3607 46.6927 46.0107 47.204 46.444 47.88C46.8947 48.5387 47.12 49.336 47.12 50.272C47.12 51.312 46.86 52.1873 46.34 52.898C45.8373 53.6087 45.1007 54.0853 44.13 54.328L44.078 53.834C44.8927 54.0073 45.5947 54.3107 46.184 54.744C46.7907 55.1773 47.2587 55.7147 47.588 56.356C47.9173 56.98 48.082 57.6907 48.082 58.488C48.082 59.4067 47.926 60.2127 47.614 60.906C47.302 61.582 46.8513 62.154 46.262 62.622C45.6727 63.09 44.9793 63.4367 44.182 63.662C43.402 63.8873 42.5353 64 41.582 64H33.288ZM37.448 60.308H41.426C41.9113 60.308 42.3187 60.23 42.648 60.074C42.9947 59.918 43.2633 59.6927 43.454 59.398C43.6447 59.086 43.74 58.7133 43.74 58.28C43.74 57.8813 43.636 57.5433 43.428 57.266C43.2373 56.9887 42.96 56.7807 42.596 56.642C42.232 56.486 41.7987 56.408 41.296 56.408H37.448V60.308ZM37.448 53.106H40.698C41.1487 53.106 41.53 53.0367 41.842 52.898C42.1713 52.742 42.414 52.534 42.57 52.274C42.7433 51.9967 42.83 51.6673 42.83 51.286C42.83 50.7313 42.6393 50.298 42.258 49.986C41.8767 49.6567 41.3047 49.492 40.542 49.492H37.448V53.106Z"
                fill="white" />
            </Svg>
        </Pressable>
      </View>
      <View>
        {rankings.length > 0 ?
           <FlatList data={rankings} showsVerticalScrollIndicator={false} style={{zIndex: -1}} renderItem={({item}) => {
            return <LeaderboardComponent username={item.userName} reps={item.reps} />
          }}/>
          : <Text style={{marginTop: 30}}>No challenges completed.</Text>
        }
       
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
      fontSize: 32,
      fontFamily: 'Lexend Light',
      alignSelf: 'flex-start'
    },
  });
  