import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the arrow icon

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Simulate a delay and navigate to the next screen
    const timer = setTimeout(() => {
      // navigation.replace('Login'); // Uncomment when navigating to Login
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splashimage.jpg')} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.text}>Improve The Quality Of Service For Patient Happiness</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Register')}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.arrowIcon} />
      </TouchableOpacity>

      {/* Bottom Sheet Container */}
      <View style={styles.bottomSheet}>
        <Text style={styles.bottomSheetText}>
          Have an account? 
          <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.loginText}> Login </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window'); // Get device dimensions for responsiveness

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content at the top of the screen
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Improved splash screen background color
    paddingTop: 0, // Adds some spacing at the top if needed
  },
  logo: {
    width: width, // Makes the image take the full width of the screen
    height: height / 1.9, // Image height takes up one-third of the screen height
    resizeMode: 'cover', // Ensures the image is properly contained
  },
  text: {
    fontSize: 28, // Larger font size for the welcome text
    color: '#000', // Bright text for better contrast
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1, // Slight letter spacing for a modern look
    marginHorizontal: 20, // Add some margin for responsiveness
    marginTop: 40, // Space between the image and the text
  },
  button: {
    marginTop: 30, // Adds space between the text and button
    backgroundColor: '#1A73E8', // Background color of the button
    paddingVertical: 12, // Padding inside the button for a bigger clickable area
    paddingHorizontal: 40, // Horizontal padding for better text positioning
    borderRadius: 25, // Rounded corners for the button
    elevation: 5, // Adds a shadow effect for the button
    flexDirection: 'row', // Align text and arrow horizontally
    alignItems: 'center', // Centers the text and icon vertically
  },
  buttonText: {
    color: '#fff', // White text color for contrast
    fontSize: 18, // Font size for the button text
    fontWeight: 'bold', // Bold font weight for emphasis
    textAlign: 'center', // Centers the text in the button
  },
  arrowIcon: {
    marginLeft: 10, // Adds space between the text and the arrow icon
  },
  bottomSheet: {
    position: 'absolute', // Fixes the position to the bottom of the screen
    bottom: 0, // Aligns to the bottom
    left: 0,
    right: 0,
    backgroundColor: '#fff', // Background color for the bottom sheet
    paddingVertical: 20, // Padding inside the bottom sheet
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, // Adds a shadow for a more prominent bottom sheet effect
    borderTopLeftRadius: 20, // Rounded top corners for the bottom sheet
    borderTopRightRadius: 20,
  },
  bottomSheetText: {
    color: '#000', // Dark text color
    fontSize: 16, // Font size for the bottom sheet text
    textAlign: 'center',
  },
  loginText: {
    color: '#1A73E8', // Blue color for the login text
    fontSize: 16, // Font size for the login link
    fontWeight: 'bold', // Bold font for emphasis
  },
});
