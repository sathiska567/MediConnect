import React, { useState, useEffect } from 'react';
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
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import img from '../assets/medicare.png';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const roles = [
    { label: 'Healthcare Provider', value: 'doctor', icon: '👨‍⚕️' },
    { label: 'Patient', value: 'patient', icon: '👤' },
    { label: 'Administrator', value: 'admin', icon: '⚙️' },
  ];

  // Validation functions
  const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters long';
    if (!/^[a-zA-Z\s]*$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    return '';
  };

  const updatePasswordStrength = (password) => {
    const strength = {
      score: 0,
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    strength.score = Object.values(strength).filter(Boolean).length - 1;
    setPasswordStrength(strength);
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    const fieldSetters = {
      name: setName,
      email: setEmail,
      password: setPassword,
      role: setRole,
    };

    fieldSetters[field](value);
    setTouched(prev => ({ ...prev, [field]: true }));

    if (field === 'password') {
      updatePasswordStrength(value);
    }

    validateForm({ ...touched, [field]: true }, { ...{ name, email, password, role }, [field]: value });
  };

  const validateForm = (touchedFields, values) => {
    const newErrors = {};
    
    if (touchedFields.name) {
      newErrors.name = validateName(values.name);
    }

    if (touchedFields.email) {
      newErrors.email = validateEmail(values.email);
    }
    
    if (touchedFields.password) {
      newErrors.password = validatePassword(values.password);
    }
    
    if (touchedFields.role && !values.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    setIsValid(Object.values(newErrors).every(error => !error));
  };

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, password: true, role: true });
    validateForm(
      { name: true, email: true, password: true, role: true }, 
      { name, email, password, role }
    );

    if (!isValid) {
      shakeError();
      return;
    }

    try {
      Alert.alert('Registration Successful', `Welcome to MediConnect, ${name}!`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const getStrengthColor = () => {
    const colors = ['#ff4d4d', '#ffa64d', '#ffff4d', '#4dff4d'];
    return colors[passwordStrength.score] || '#ff4d4d';
  };

  const PasswordStrengthIndicator = () => (
    <View style={styles.strengthContainer}>
      <View style={styles.strengthBars}>
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.strengthBar,
              { backgroundColor: index <= passwordStrength.score ? getStrengthColor() : '#e2e8f0' }
            ]}
          />
        ))}
      </View>
      <Text style={styles.strengthText}>
        {password && [
          'Very Weak',
          'Weak',
          'Good',
          'Strong',
          'Very Strong'
        ][passwordStrength.score]}
      </Text>
    </View>
  );

  const CustomDropdown = () => (
    <TouchableOpacity
      style={[
        styles.dropdownButton,
        touched.role && errors.role && styles.inputError
      ]}
      onPress={() => setIsDropdownOpen(true)}
      activeOpacity={0.7}
    >
      <Text style={styles.dropdownButtonText}>
        {role ? `${roles.find(r => r.value === role)?.icon} ${roles.find(r => r.value === role)?.label}` : 'Select your role'}
      </Text>
      <Text style={styles.dropdownIcon}>▼</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image source={img} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Join MediConnect</Text>
            <Text style={styles.subHeaderText}>Creating better healthcare connections</Text>
          </View>

          <Animated.View 
            style={[
              styles.formContainer,
              { transform: [{ translateX: shakeAnimation }] }
            ]}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    touched.name && errors.name && styles.inputError
                  ]}
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholderTextColor="#99a5b5"
                  autoCapitalize="words"
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError
                  ]}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  placeholderTextColor="#99a5b5"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    { paddingRight: 50 },
                    touched.password && errors.password && styles.inputError
                  ]}
                  placeholder="Create a strong password"
                  value={password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor="#99a5b5"
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                {password && <PasswordStrengthIndicator />}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Role</Text>
              <CustomDropdown />
              {touched.role && errors.role && (
                <Text style={styles.errorText}>{errors.role}</Text>
              )}
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                  Sign In
                </Text>
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Select Your Role</Text>
              <Text style={styles.modalSubText}>Choose the role that best describes you</Text>
            </View>
            {roles.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.modalItem,
                  role === item.value && styles.selectedModalItem
                ]}
                onPress={() => {
                  handleInputChange('role', item.value);
                  setIsDropdownOpen(false);
                }}
              >
                <Text style={styles.modalItemIcon}>{item.icon}</Text>
                <View style={styles.modalItemContent}>
                  <Text style={[
                    styles.modalItemText,
                    role === item.value && styles.selectedModalItemText
                  ]}>
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: width * 0.8,
    height: height * 0.12,
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
    alignItems: 'center',
  },
  headerText: {
    fontSize: width > 375 ? 28 : 24,
    fontWeight: 'bold',
    color: '#1a365d',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#4a5568',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#1a365d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    height: 50,
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2d3748',
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  dropdownButton: {
    height: 50,
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#4a5568',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#4a5568',
  },
  submitButton: {
    backgroundColor: '#4299e1',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4299e1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#718096',
    fontWeight: '500',
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#4a5568',
  },
  loginButton: {
    color: '#4299e1',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3748',
  },
  modalSubText: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc',
  },
  selectedModalItem: {
    backgroundColor: '#ebf8ff',
  },
  modalItemIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  modalItemContent: {
    flex: 1,
  },
  modalItemText: {
    fontSize: 16,
    color: '#2d3748',
  },
  selectedModalItemText: {
    color: '#4299e1',
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#ff4d4d',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  strengthContainer: {
    marginTop: 8,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    color: '#718096',
  },
  submitButtonDisabled: {
    backgroundColor: '#a0aec0',
    opacity: 0.7,
  },
});