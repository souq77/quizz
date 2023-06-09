import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterSceen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import OptionsScreen from './screens/OptionsScreen';
import QuestionsScreen from './screens/QuestionsScreen';
import ResultScreen from './screens/ResultScreen';
import {  LanguageProvider } from './LanguageContext';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <LanguageProvider>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Options" component={OptionsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Questions" component={QuestionsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Result" component={ResultScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
