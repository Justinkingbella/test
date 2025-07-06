import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#ec4899', '#0ea5e9']}
        style={{ flex: 1 }}
        className="justify-center items-center"
      >
        <View className="items-center">
          <View className="bg-white/20 p-8 rounded-3xl backdrop-blur-sm">
            <ActivityIndicator size="large" color="#ffffff" />
            <Text className="text-white text-xl font-bold mt-4 text-center">
              HeartSync
            </Text>
            <Text className="text-white/80 text-base mt-2 text-center">
              Finding your perfect match...
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoadingScreen;