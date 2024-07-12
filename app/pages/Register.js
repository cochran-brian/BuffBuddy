import { useState } from 'react';
import { StyleSheet, Text, Dimensions, View, TextInput, KeyboardAvoidingView, Pressable, TouchableHighlight, Keyboard } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config'
 
export default function Register({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("")

  const handleRegister = async () => {
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user.uid)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: username,
        uid: userCredential.user.uid,
        profileImage: null,
        completedChallenges: 0
      })
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
        <Text style={[styles.lightText, {marginBottom: 16}]}>Sign up to continue</Text>

        

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

          <TextInput 
            style={{width: 300, height: 50, borderRadius: 20, borderColor: 'black', borderWidth: 1.5, padding: 15, fontSize: 16, fontFamily: "Lexend Light", marginTop: 10}}
            placeholder={"First name"}
            secureTextEntry={false}
            onChangeText={(input) => setFirstName(input)} 
            value={firstName} />

          <TextInput 
            style={{width: 300, height: 50, borderRadius: 20, borderColor: 'black', borderWidth: 1.5, padding: 15, fontSize: 16, fontFamily: "Lexend Light", marginTop: 10}}
            placeholder={"Last name"}
            secureTextEntry={false}
            onChangeText={(input) => setLastName(input)} 
            value={lastName} />

          <TextInput 
            style={{width: 300, height: 50, borderRadius: 20, borderColor: 'black', borderWidth: 1.5, padding: 15, fontSize: 16, fontFamily: "Lexend Light", marginTop: 10}}
            placeholder={"Username"}
            autoCapitalize='none'
            secureTextEntry={false}
            onChangeText={(input) => setUsername(input)} 
            value={username} />
          
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
          onPress={() => handleRegister()} 
          underlayColor={'black'}>
          <Text style={styles.bottomButtonText}>Sign up</Text>
        </TouchableHighlight>

      <View style={styles.bottomPromptContainer}>
       <Text style={[styles.lightText, {fontSize: 16}]}>Don't have an account? </Text>
       <Text style={styles.pressableText} onPress={() => navigation.navigate('Login')}>Login here</Text>
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
    fontFamily: 'Lexend SemiBold',
    fontSize: 50,
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
  