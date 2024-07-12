import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import ScreenHandler from './app/navigation/ScreenHandler';
import 'react-native-reanimated';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Lexend Light': require('./app/assets/fonts/Lexend-Light.ttf'),
    'Lexend SemiBold': require('./app/assets/fonts/Lexend-SemiBold.ttf'),
  });

  if(!fontsLoaded){
    return <Text>Loading...</Text>;
  }

  return (
    <ScreenHandler />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    marginTop: 70
  },
});
