import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  Edit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
} from 'react-native-feather';

export default function ProfileScreen({ navigation }) {
  // Sample user data - replace with your actual user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    joinedDate: 'Joined January 2024',
    profilePic: require('../assets/men.jpg'),
  };

  const handleNavigate = async()=>{
    try {
      navigation.navigate("EditProfile")
      
    } catch (error) {
      alert("Error occur while navigate")
    }
  }

  const ProfileItem = ({ icon: Icon, title, value }) => (
    <TouchableOpacity style={styles.profileItem} activeOpacity={0.7}>
      <View style={styles.profileItemLeft}>
        <Icon stroke="#666666" width={20} height={20} />
        <View style={styles.profileItemText}>
          <Text style={styles.profileItemTitle}>{title}</Text>
          <Text style={styles.profileItemValue}>{value}</Text>
        </View>
      </View>
      <ChevronRight stroke="#BEBEBE" width={20} height={20} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Edit2 stroke="#007AFF" width={20} height={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={user.profilePic} style={styles.profileImage} />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.joinDate}>{user.joinedDate}</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            <ProfileItem
              icon={Mail}
              title="Email"
              value={user.email}
            />
            <ProfileItem
              icon={Phone}
              title="Phone"
              value={user.phone}
            />
            <ProfileItem
              icon={MapPin}
              title="Location"
              value={user.location}
            />
            <ProfileItem
              icon={Calendar}
              title="Member Since"
              value="January 2024"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleNavigate}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  editButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
  },
  joinDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileItemText: {
    marginLeft: 12,
    flex: 1,
  },
  profileItemTitle: {
    fontSize: 14,
    color: '#666666',
  },
  profileItemValue: {
    fontSize: 16,
    color: '#1A1A1A',
    marginTop: 2,
  },
  quickActions: {
    padding: 20,
    paddingTop: 30,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});