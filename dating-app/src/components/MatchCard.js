import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const MatchCard = ({ user }) => {
  if (!user) return null;

  return (
    <View className="bg-white rounded-3xl shadow-xl overflow-hidden mx-2 flex-1">
      {/* Main Photo */}
      <View className="relative h-3/5">
        <Image
          source={{ uri: user.photos[0] }}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          className="absolute bottom-0 left-0 right-0 h-32"
        />
        
        {/* User info overlay */}
        <View className="absolute bottom-4 left-4 right-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold">
                {user.name}, {user.age}
              </Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="location-outline" size={16} color="#ffffff" />
                <Text className="text-white ml-1">{user.distance} miles away</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
              <Ionicons name="information-circle" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Profession */}
        <View className="mb-4">
          <Text className="text-primary-500 font-semibold text-base">
            {user.profession}
          </Text>
        </View>

        {/* Bio */}
        <View className="mb-4">
          <Text className="text-gray-700 text-base leading-6">
            {user.bio}
          </Text>
        </View>

        {/* Interests */}
        <View className="mb-4">
          <Text className="text-gray-900 font-semibold text-base mb-2">
            Interests
          </Text>
          <View className="flex-row flex-wrap">
            {user.interests.map((interest, index) => (
              <View
                key={index}
                className="bg-primary-100 rounded-full px-3 py-1 mr-2 mb-2"
              >
                <Text className="text-primary-600 text-sm font-medium">
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Photo indicators */}
        {user.photos.length > 1 && (
          <View className="flex-row justify-center mb-4">
            {user.photos.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === 0 ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MatchCard;