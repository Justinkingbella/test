import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      Alert.alert('Login Failed', result.error || 'Invalid credentials');
    }
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
          <View className="flex-1 justify-center px-6">
            <View className="items-center mb-12">
              <View className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm">
                <Ionicons name="heart" size={40} color="#ffffff" />
              </View>
              <Text className="text-white text-3xl font-bold mb-2">
                Welcome Back
              </Text>
              <Text className="text-white/90 text-base text-center">
                Sign in to continue your journey
              </Text>
            </View>

            <View className="space-y-4">
              <View className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <TextInput
                  className="text-white text-base"
                  placeholder="Email"
                  placeholderTextColor="#ffffff80"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm flex-row items-center">
                <TextInput
                  className="text-white text-base flex-1"
                  placeholder="Password"
                  placeholderTextColor="#ffffff80"
                  value={password}
                  onChangeText={setPassword}
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

              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className="bg-white rounded-2xl py-4 px-8 shadow-lg"
              >
                <Text className="text-primary-500 text-lg font-semibold text-center">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                className="mt-4"
              >
                <Text className="text-white text-center">
                  Don't have an account? 
                  <Text className="font-semibold"> Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen;