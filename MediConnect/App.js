import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SplashScreen from './Screens/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
       <NavigationContainer>
           <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
               <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
               <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
               <Stack.Screen name="Home" component={HomeScreen} />
           </Stack.Navigator>
       </NavigationContainer>
  );
}
