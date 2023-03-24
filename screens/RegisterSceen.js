import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, Image } from 'react-native';
import { auth } from '../firebase';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const navigation = useNavigation()
  useEffect(() => {
    console.log('ok');
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home")
      }
    })
    return unsubscribe
  }, [])


  const handleSignUp = () => {
    if (password == confirmpassword) {        
        auth
          .createUserWithEmailAndPassword(email.trim(), password    )
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered in with: ', user.email);
          })
          .catch(error => alert(error.message))
    } else {
        alert("Mot de passe different")
    }
  }
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View>
        <Image
          //style={}
          source={require('../asset/icon.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        
        <TextInput
          placeholder="Email"
          onChangeText={newtext => setEmail(newtext)}
          value={email}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          onChangeText={newtext => setPassword(newtext)}
          value={password}
          style={styles.input}
          secureTextEntry
        ></TextInput>
        <TextInput
          placeholder="Confirm Password"
          onChangeText={newtext => setConfirmpassword(newtext)}
          value={confirmpassword}
          style={styles.input}
          secureTextEntry
        ></TextInput>

      </View>

      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Creer un compte</Text>

        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  }



})