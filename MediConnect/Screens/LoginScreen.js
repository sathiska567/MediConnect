import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import img from '../assets/medicare.png'

export default function LoginScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async() => {
     try {
      
     } catch (error) {
       alert(error)
     }
    
  };

  const handleForgetNavigate = async()=>{
    
  }

  return (
    <View style={styles.content}>
      {/* Top Section */}
      

      <View style={styles.logo_container}>
        <Image source={img} style={styles.logo} />
      </View>

      <View style={styles.header_container}>
        <Text style={styles.header_text}>Welcome to the MediConnect</Text> 
      </View>

      {/* Form Section */}
      <View style={styles.form_container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />       
        
         <TouchableOpacity style={styles.forget_button} onPress={handleForgetNavigate}>
         <Text style={styles.Forget_pw}>Forget Password ? </Text>
        </TouchableOpacity>
        {/* Custom Submit Button */}
        <TouchableOpacity style={styles.submit_button} onPress={handleSubmit}>
          <Text style={styles.submit_button_text}>Submit</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',      
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  header_container: {
    marginBottom: 0,
    marginTop:50,
    alignItems: 'center',
  },

  header_text: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  header_subText: {
    color: '#666',
    fontSize: 16,
  },

  logo_container: {
    marginTop: 50,
    width:350,
    // backgroundColor:"red"
  },

  logo: {
   width:350,
   height:120 
  },

  form_container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 30,
  },

  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },

  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },

  submit_button: {
    backgroundColor: '#3498db',  // Blue background for the button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  submit_button_text: {
    color: '#fff',              // White text
    fontSize: 16,
    fontWeight: 'bold',
  },

  Forget_pw:{
    color: '#000',  // Blue text
    fontSize: 12,
    textAlign: 'right',
  }


});
