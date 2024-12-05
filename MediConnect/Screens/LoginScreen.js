import React from 'react'
import { View } from 'react-native'


export default function LoginScreen({ navigation }) {
  
const handleNavigate = async()=>{
   navigation.navigate("Home")
}

  return (
    <View>
        <button onClick={handleNavigate}>Click</button>
    </View>
  )
}
