import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useStore } from '../State/store';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

export default function SingleCardScreen({ route }) {
  const { service } = route.params;
  const clickCount = useStore((state) => state.clickCount);
  const incrementCount = useStore((state) => state.incrementCount);
  const decrementCount = useStore((state) => state.decrementCount); // Assuming you have decrementCount in your store
  const [isBooked, setIsBooked] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));

  // const handleItemPress = () => {
  //   incrementCount();
  // };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const checkBookingStatus = async () => {
      const storedId = await AsyncStorage.getItem("id");
      if (storedId == service.hospital_id) {
        setIsBooked(true);
      }
    };
    checkBookingStatus();
  }, []);
  
  const handleBookBed = async () => {
    if (isBooked) {
      decrementCount();
      setIsBooked(false);
      await AsyncStorage.removeItem("id");
    } else {
      incrementCount();
      setIsBooked(true);
      await AsyncStorage.setItem("id", service.hospital_id); // Replace with the actual ID or data you want to store
    }
    animateButton();
  };

  const cardData = {
    image: '/api/placeholder/600/400',
    title: 'Card Title',
    descriptions: [
      {
        id: 1,
        label: 'Street Address',
        value: service.street_address,
        icon: <MaterialIcons name="location-on" size={24} color="#2196F3" />
      },
      {
        id: 2,
        label: 'County',
        value: service.county,
        icon: <MaterialIcons name="apartment" size={24} color="#2196F3" />
      },
      {
        id: 3,
        label: 'Hospital Bed Count',
        value: service.hospital_bed_count,
        icon: <FontAwesome5 name="bed" size={20} color="#2196F3" />
      },
      {
        id: 4,
        label: 'Medicare Provider Number',
        value: service.medicare_provider_number,
        icon: <MaterialIcons name="badge" size={24} color="#2196F3" />
      },
      {
        id: 5,
        label: 'Zip Code',
        value: service.zip_code,
        icon: <MaterialIcons name="local-post-office" size={24} color="#2196F3" />
      },
    ]
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={styles.mainContainer}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: service.image }}
                style={styles.image}
              />
              <View style={styles.imageOverlay} />
              <Text style={styles.overlayTitle}>{service.name}</Text>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.descriptionList}>
                {cardData.descriptions.map((item, index) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={[styles.descriptionItem, index === cardData.descriptions.length - 1 && styles.lastItem]}
                    // onPress={handleItemPress}
                    activeOpacity={0.7}
                  >
                    <View style={styles.labelContainer}>
                      <View style={styles.iconContainer}>
                        {item.icon}
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.descriptionLabel}>{item.label}</Text>
                        <Text style={styles.descriptionValue}>
                          {item.value || 'Not Available'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity 
                  style={[
                    styles.bookButton,
                    isBooked ? styles.bookedButton : styles.availableButton
                  ]}
                  onPress={handleBookBed}
                  activeOpacity={0.8}
                >
                  <FontAwesome5 
                    name={isBooked ? "times" : "procedures"} 
                    size={20} 
                    color="white" 
                    style={styles.buttonIcon} 
                  />
                  <Text style={styles.buttonText}>
                    {isBooked ? 'Cancel Booking' : 'Book Bed'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity 
          style={styles.floatingButton}
          activeOpacity={0.9}
        >
          <MaterialIcons name="touch-app" size={24} color="white" />
          <Text style={styles.counterText}>{clickCount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Styles remain unchanged...
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    backgroundColor: '#FF4081',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  counterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mainContainer: {
    padding: 16,
  },
  card: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  overlayTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardContent: {
    padding: 20,
  },
  descriptionList: {
    marginTop: 8,
    marginBottom: 20,
  },
  descriptionItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  lastItem: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#EBF5FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  descriptionValue: {
    fontSize: 15,
    color: '#4a4a4a',
    lineHeight: 22,
  },
  bookButton: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  availableButton: {
    backgroundColor: '#2196F3',
  },
  bookedButton: {
    backgroundColor: '#FF5252',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});