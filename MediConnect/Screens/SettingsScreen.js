import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Bell, Lock, HelpCircle, User, ChevronRight, Settings, LogOut } from 'react-native-feather';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  const SettingsItem = ({ icon: Icon, title, subtitle, isSwitch, value, onValueChange, showArrow }) => (
    <TouchableOpacity 
      style={styles.settingsItem}
      disabled={isSwitch}
      activeOpacity={isSwitch ? 1 : 0.7}
    >
      <View style={styles.settingsItemLeft}>
        <View style={styles.iconContainer}>
          <Icon stroke="#4A4A4A" width={20} height={20} />
        </View>
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#767577', true: '#007AFF' }}
          thumbColor={'#FFFFFF'}
        />
      ) : (
        showArrow && <ChevronRight stroke="#BEBEBE" width={20} height={20} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingsItem
            icon={User}
            title="Personal Information"
            subtitle="Manage your profile details"
            showArrow
          />
          <SettingsItem
            icon={Lock}
            title="Security"
            subtitle="Password, PIN, biometric"
            showArrow
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingsItem
            icon={Bell}
            title="Notifications"
            subtitle="Manage your alerts"
            isSwitch
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingsItem
            icon={Settings}
            title="App Settings"
            subtitle="Language, accessibility"
            showArrow
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingsItem
            icon={HelpCircle}
            title="Help Center"
            subtitle="FAQs and support"
            showArrow
          />
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <SettingsItem
            icon={LogOut}
            title="Log Out"
            subtitle="Sign out of your account"
            showArrow
          />
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  settingsItemText: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  settingsItemSubtitle: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    padding: 24,
  },
  appVersion: {
    fontSize: 13,
    color: '#666666',
  },
});