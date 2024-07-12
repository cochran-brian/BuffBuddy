import { useState } from 'react';
import { StyleSheet, Text, Dimensions, View, TextInput, KeyboardAvoidingView, Pressable, TouchableHighlight, Keyboard } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config'
 
export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
    {/* <KeyboardAvoidingView> */}
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.pressableContainer}>
      <View style={styles.contentContainer}>

        <Text style={styles.header}>Buff Buddy</Text>
        <Text style={[styles.lightText, {marginBottom: 16}]}>Login to continue</Text>

        

        <View style={{alignItems: 'center'}}>
          <TextInput 
            style={{width: 300, height: 50, borderRadius: 20, borderColor: 'black', borderWidth: 1.5, padding: 15, fontSize: 16, fontFamily: "Lexend Light"}}
            placeholder={"Email"}
            autoCapitalize='none'
            keyboardType={'email-address'}
            onChangeText={(input) => setEmail(input)} 
            value={email} />

          <TextInput 
            style={{width: 300, height: 50, borderRadius: 20, borderColor: 'black', borderWidth: 1.5, padding: 15, fontSize: 16, fontFamily: "Lexend Light", marginTop: 10}}
            placeholder={"Password"}
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(input) => setPassword(input)} 
            value={password} />
          
          {/* <TextInput 
            mode='outlined'
            placeholder={"Email"}
            // contentStyle={{fontFamily: 'Lexend Light'}}
            // outlineStyle={{borderRadius: 15, borderWidth: 1}}
            // activeOutlineColor={'#000000'}
            onChangeText={(input) => setEmail(input)} 
            label={<Text style={{ fontFamily: 'Lexend Light', color: '#000000'}}>Email</Text>}
            outlineColor='black'
            secureTextEntry={false}
            autoCapitalize='none' 
            keyboardType={'email-address'}
            style={[styles.box, {backgroundColor: 'white'}]} /> */}
        </View>

        <TouchableHighlight 
          style= {styles.bottomButton} 
          onPress={() => handleLogin()} 
          underlayColor={'black'}>
          <Text style={styles.bottomButtonText}>Login</Text>
        </TouchableHighlight>

      <View style={styles.bottomPromptContainer}>
       <Text style={[styles.lightText, {fontSize: 16}]}>Don't have an account? </Text>
       <Text style={styles.pressableText} onPress={() => navigation.navigate('Register')}>Sign up here</Text>
      </View>
       

      </View>

      

        
      
      </Pressable>
    {/* </KeyboardAvoidingView> */}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pressableContainer:{
    height: Dimensions.get('screen').height,
    backgroundColor: 'white',
  },
  contentContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('screen').height * 0.125
  },
  header:{
    color: 'black',
    // fontFamily: 'Lexend SemiBold',
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  lightText:{
    color: 'black',
    fontFamily: 'Lexend Light',
    fontSize: 20
  },  
  bottomButton:{
    width: 300,
    height: 50,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomButtonText: {
    color: 'white', 
    fontFamily: 'Lexend Light', 
    fontSize: 24
  },
  bottomPromptContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  },
  pressableText:{
    fontFamily: 'Lexend Light',
    fontSize: 16,
    color: "blue"
  },
  box:{
    width: Dimensions.get('screen').width * 0.7,
    marginTop: 16,
  }
  });
  