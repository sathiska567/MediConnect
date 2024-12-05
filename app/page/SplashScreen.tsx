import React from 'react'
import { ActivityIndicator, Text, View , StyleSheet } from 'react-native';

export default function SplashScreen() {
        return (
                <View style={styles.splashContainer}>
                  <Text style={styles.splashText}>Welcome to the App!</Text>
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              );
}

const styles = StyleSheet.create({
        splashContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4CAF50', // Replace with your splash screen background color
        },
        splashText: {
          fontSize: 24,
          color: '#fff',
          marginBottom: 20,
        },
      });