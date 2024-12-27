import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import img from '../assets/medicare.png';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      Alert.alert('Login Submitted', `Email: ${email}, Password: ${password}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleForgetNavigate = async () => {
    try {
      navigation.navigate('Register');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section */}
      <View style={styles.logoContainer}>
        <Image source={img} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to MediConnect</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
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
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgetButton}>
          <Text style={styles.forgetText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>
            Don't have an account?{' '}
            <Text style={styles.signupButton} onPress={handleForgetNavigate}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    width: '80%',
    height: height * 0.2,
    marginTop: height * 0.05,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  headerText: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginTop: height * 0.05,
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
  forgetButton: {
    alignSelf: 'flex-end',
  },
  forgetText: {
    color: '#3498db',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupButton: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});
