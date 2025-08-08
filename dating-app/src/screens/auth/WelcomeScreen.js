import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#ec4899', '#0ea5e9']}
        style={{ flex: 1 }}
        className="justify-center items-center px-6"
      >
        <View className="items-center mb-16">
          <View className="bg-white/20 p-6 rounded-full mb-6 backdrop-blur-sm">
            <Ionicons name="heart" size={60} color="#ffffff" />
          </View>
          <Text className="text-white text-4xl font-bold mb-4 text-center">
            HeartSync
          </Text>
          <Text className="text-white/90 text-lg text-center leading-6">
            Find your perfect match and start meaningful connections
          </Text>
        </View>

        <View className="w-full space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className="bg-white rounded-full py-4 px-8 mx-4 shadow-lg"
          >
            <Text className="text-primary-500 text-lg font-semibold text-center">
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="bg-white/20 rounded-full py-4 px-8 mx-4 backdrop-blur-sm"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-8 left-0 right-0">
          <Text className="text-white/70 text-sm text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default WelcomeScreen;