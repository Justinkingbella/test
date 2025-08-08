import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    bio: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    const { name, email, password, confirmPassword, age, bio } = formData;

    if (!name || !email || !password || !confirmPassword || !age) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (parseInt(age) < 18) {
      Alert.alert('Error', 'You must be at least 18 years old');
      return;
    }

    const result = await register({
      name,
      email,
      password,
      age: parseInt(age),
      bio: bio || 'New to HeartSync!'
    });

    if (!result.success) {
      Alert.alert('Registration Failed', result.error || 'Something went wrong');
    }
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#ec4899', '#0ea5e9']}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 justify-center px-6 py-8">
              <View className="items-center mb-8">
                <View className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm">
                  <Ionicons name="person-add" size={40} color="#ffffff" />
                </View>
                <Text className="text-white text-3xl font-bold mb-2">
                  Join HeartSync
                </Text>
                <Text className="text-white/90 text-base text-center">
                  Create your account to start connecting
                </Text>
              </View>

              <View className="space-y-4">
                <View className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <TextInput
                    className="text-white text-base"
                    placeholder="Full Name"
                    placeholderTextColor="#ffffff80"
                    value={formData.name}
                    onChangeText={(value) => updateFormData('name', value)}
                  />
                </View>

                <View className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <TextInput
                    className="text-white text-base"
                    placeholder="Email"
                    placeholderTextColor="#ffffff80"
                    value={formData.email}
                    onChangeText={(value) => updateFormData('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <TextInput
                    className="text-white text-base"
                    placeholder="Age"
                    placeholderTextColor="#ffffff80"
                    value={formData.age}
                    onChangeText={(value) => updateFormData('age', value)}
                    keyboardType="numeric"
                  />
                </View>

                <View className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm flex-row items-center">
                  <TextInput
                    className="text-white text-base flex-1"
                    placeholder="Password"
                    placeholderTextColor="#ffffff80"
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2"
                  >
                    <Ionicons 
                      name={showPassword ? 'eye-off' : 'eye'} 
                      size={20} 
                      color="#ffffff80" 
                    />
                  </TouchableOpacity>
                </View>

                <View className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm flex-row items-center">
                  <TextInput
                    className="text-white text-base flex-1"
                    placeholder="Confirm Password"
                    placeholderTextColor="#ffffff80"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2"
                  >
                    <Ionicons 
                      name={showConfirmPassword ? 'eye-off' : 'eye'} 
                      size={20} 
                      color="#ffffff80" 
                    />
                  </TouchableOpacity>
                </View>

                <View className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <TextInput
                    className="text-white text-base"
                    placeholder="Bio (Optional)"
                    placeholderTextColor="#ffffff80"
                    value={formData.bio}
                    onChangeText={(value) => updateFormData('bio', value)}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleRegister}
                  disabled={isLoading}
                  className="bg-white rounded-2xl py-4 px-8 shadow-lg mt-6"
                >
                  <Text className="text-primary-500 text-lg font-semibold text-center">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  className="mt-4"
                >
                  <Text className="text-white text-center">
                    Already have an account? 
                    <Text className="font-semibold"> Sign In</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RegisterScreen;