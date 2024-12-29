import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Example services data
const healthServices = [
  {
    id: '1',
    title: 'General Checkup',
    image: require('../assets/splash.png'),
    description: 'Regular health examination',
  },
  {
    id: '2',
    title: 'Dental Care',
    image: require('../assets/splash.png'),
    description: 'Complete dental services',
  },
  {
    id: '3',
    title: 'Eye Care',
    image: require('../assets/splash.png'),
    description: 'Vision care services',
  },
  {
    id: '4',
    title: 'Mental Health',
    image: require('../assets/splash.png'),
    description: 'Professional counseling',
  },
];

export default function HomeScreen({ navigation }) {
  const [hospitals, setHospitals] = useState([]);
  const [totalReacts, setTotalReacts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [name , setName] = useState('')

  const getUserDetails = async()=>{
    try {
      const email = localStorage.getItem('email')
      const data = await axios.post("http://localhost:8080/api/v1/auth/oneUser" , {email})

      // console.log(data.data.data.user.name);
      setName(data.data.data.user.name)
      
    } catch (error) {
      alert("Data Fetch have an error")
    }
  }

  useEffect(()=>{
    getUserDetails()
  },[])

  const user = {
    name: name,
    profilePic: require('../assets/men.jpg'),
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/get/hospitals")
        console.log(response);
        setHospitals(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleSingleCard = async (service) => {
    try {
      // console.log(service);
      navigation.navigate('SingleCard', { service: service })
    } catch (error) {
      alert("Have an error while navigate to single card")
    }
  }

  const ServiceCard = ({ title, image, description, service }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <Image source={image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <TouchableOpacity onPress={() => handleSingleCard(service)} >
          <View style={styles.cardButton}>
            <Text style={styles.buttonText}>Learn More</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header with user profile */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <Image source={user.profilePic} style={styles.profilePic} />
      </View>

      {/* Services Section */}
      <View style={styles.mainContent}>
        <Text style={styles.sectionTitle}>Health Services</Text>
        <Text style={styles.sectionSubtitle}>Select a service to get started</Text>
        <ScrollView
          style={styles.servicesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.servicesGrid}>
            {hospitals.map((service) => (
              <ServiceCard
                key={service.hospital_id}
                title={service.name}
                image={service.image}
                description={service.street_address}
                service={service}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  mainContent: {
    flex: 1,
    paddingTop: 34,
    paddingBottom: 20
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 24,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 24,
    marginTop: 4,
    marginBottom: 46,
  },
  servicesContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: (windowWidth - 48) / 2,
    marginHorizontal: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 130,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    lineHeight: 18,
  },
  cardButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4a4a4a',
  },
});
