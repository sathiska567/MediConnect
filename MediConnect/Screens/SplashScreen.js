import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the arrow icon

export default function SplashScreen({ navigation }) {
  const rotation = useRef(new Animated.Value(0)).current; // Initialize animated value

  useEffect(() => {
    // Start rotation animation
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 3000, // 3 seconds for a full rotation
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();

    // Simulate a delay and navigate to the next screen
    const timer = setTimeout(() => {
      // navigation.replace('Login'); // Uncomment when navigating to Login
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation, rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Horizontal rotation
  });

  const rotatingStyle = {
    transform: [{ rotateY: rotateInterpolate }], // Rotate around the Y-axis
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/splash.png')} // Replace with your logo path
          style={[styles.logo, rotatingStyle]} // Apply rotating style
        />
        <Text style={styles.text}>
          Improve The Quality Of Service For Patient Happiness
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Register')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.arrowIcon} />
        </TouchableOpacity>

        {/* Bottom Sheet Container */}
        <View style={styles.bottomSheet}>
          <Text style={styles.bottomSheetText}>
            Have an account? 
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.loginText}> Login </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window'); // Get device dimensions for responsiveness

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content at the top of the screen
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Improved splash screen background color
    paddingHorizontal: '5%', // Ensure some padding on the sides
  },
  logo: {
    width: '80%', // Makes the image take 80% of the screen width
    height: height * 0.4, // Makes the image height proportional to the screen height
    resizeMode: 'contain', // Ensures the image is properly contained
    marginTop: height * 0.1, // Add some margin from the top
  },
  text: {
    fontSize: width * 0.07, // Font size proportional to screen width
    color: '#000', // Bright text for better contrast
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1, // Slight letter spacing for a modern look
    marginHorizontal: '5%', // Add some margin for responsiveness
    marginTop: height * 0.05, // Space between the image and the text
  },
  button: {
    marginTop: height * 0.03, // Adds space between the text and button
    backgroundColor: '#1A73E8', // Background color of the button
    paddingVertical: height * 0.015, // Padding inside the button for a bigger clickable area
    paddingHorizontal: width * 0.1, // Horizontal padding for better text positioning
    borderRadius: 25, // Rounded corners for the button
    elevation: 5, // Adds a shadow effect for the button
    flexDirection: 'row', // Align text and arrow horizontally
    alignItems: 'center', // Centers the text and icon vertically
  },
  buttonText: {
    color: '#fff', // White text color for contrast
    fontSize: width * 0.045, // Font size proportional to screen width
    fontWeight: 'bold', // Bold font weight for emphasis
    textAlign: 'center', // Centers the text in the button
  },
  arrowIcon: {
    marginLeft: width * 0.02, // Adds space between the text and the arrow icon
  },
  bottomSheet: {
    position: 'absolute', // Fixes the position to the bottom of the screen
    bottom: 0, // Aligns to the bottom
    left: 0,
    right: 0,
    backgroundColor: '#fff', // Background color for the bottom sheet
    paddingVertical: height * 0.02, // Padding inside the bottom sheet
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, // Adds a shadow for a more prominent bottom sheet effect
    borderTopLeftRadius: 20, // Rounded top corners for the bottom sheet
    borderTopRightRadius: 20,
  },
  bottomSheetText: {
    color: '#000', // Dark text color
    fontSize: width * 0.04, // Font size proportional to screen width
    textAlign: 'center',
  },
  loginText: {
    color: '#1A73E8', // Blue color for the login text
    fontSize: width * 0.04, // Font size proportional to screen width
    fontWeight: 'bold', // Bold font for emphasis
  },
});
