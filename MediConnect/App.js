import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
       <NavigationContainer>
           <Stack.Navigator initialRouteName="Login">
               <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
               <Stack.Screen name="Register" component={RegisterScreen} />
               <Stack.Screen name="Home" component={HomeScreen} />
           </Stack.Navigator>
       </NavigationContainer>
  );
}
