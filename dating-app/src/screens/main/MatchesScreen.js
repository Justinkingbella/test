import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';

const MatchesScreen = ({ navigation }) => {
  const { matches } = useUser();

  const renderMatch = ({ item }) => (
    <TouchableOpacity className="bg-white rounded-2xl shadow-lg m-2 overflow-hidden">
      <View className="relative">
        <Image
          source={{ uri: item.user.photos[0] }}
          className="w-full h-48"
          resizeMode="cover"
        />
        
        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          className="absolute bottom-0 left-0 right-0 h-20"
        />
        
        {/* User info */}
        <View className="absolute bottom-3 left-3 right-3">
          <Text className="text-white text-lg font-bold">
            {item.user.name}, {item.user.age}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={14} color="#ffffff" />
            <Text className="text-white text-sm ml-1">
              {item.user.distance} miles away
            </Text>
          </View>
        </View>
      </View>
      
      {/* Match info */}
      <View className="p-4">
        <Text className="text-gray-600 text-sm">
          Matched {new Date(item.timestamp).toLocaleDateString()}
        </Text>
        <Text className="text-gray-800 text-sm mt-1">
          {item.user.bio.substring(0, 80)}...
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center px-6">
      <View className="bg-primary-50 rounded-full p-8 mb-6">
        <Ionicons name="heart-outline" size={60} color="#ec4899" />
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
        No Matches Yet
      </Text>
      <Text className="text-gray-600 text-center leading-6">
        Keep swiping to find your perfect match! Your connections will appear here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-white px-4 py-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-gray-800">
              Matches ({matches.length})
            </Text>
            <TouchableOpacity className="p-2">
              <Ionicons name="filter-outline" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Matches List */}
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ 
            padding: 16,
            paddingBottom: 100,
            flexGrow: 1
          }}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default MatchesScreen;