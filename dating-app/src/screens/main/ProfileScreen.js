import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const menuItems = [
    { icon: 'person-outline', title: 'Edit Profile', onPress: handleEditProfile },
    { icon: 'settings-outline', title: 'Settings', onPress: () => {} },
    { icon: 'help-circle-outline', title: 'Help & Support', onPress: () => {} },
    { icon: 'information-circle-outline', title: 'About', onPress: () => {} },
    { icon: 'log-out-outline', title: 'Logout', onPress: handleLogout, color: 'text-red-500' }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#ec4899', '#0ea5e9']}
          className="px-6 pt-6 pb-8"
        >
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <TouchableOpacity onPress={handleEditProfile}>
              <Ionicons name="pencil" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View className="items-center">
            <View className="relative mb-4">
              <Image
                source={{ uri: user.photos?.[0] || 'https://via.placeholder.com/150' }}
                className="w-32 h-32 rounded-full border-4 border-white/20"
                resizeMode="cover"
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-white rounded-full p-2"
                onPress={handleEditProfile}
              >
                <Ionicons name="camera" size={16} color="#ec4899" />
              </TouchableOpacity>
            </View>

            <Text className="text-white text-2xl font-bold mb-1">
              {user.name}, {user.age}
            </Text>
            <Text className="text-white/90 text-base mb-2">
              {user.location}
            </Text>
            <Text className="text-white/80 text-sm text-center px-4">
              {user.bio}
            </Text>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View className="bg-white mx-4 -mt-6 rounded-2xl shadow-lg p-6 mb-6">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">12</Text>
              <Text className="text-gray-600 text-sm">Matches</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">8</Text>
              <Text className="text-gray-600 text-sm">Chats</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">24</Text>
              <Text className="text-gray-600 text-sm">Likes</Text>
            </View>
          </View>
        </View>

        {/* Interests */}
        <View className="bg-white mx-4 rounded-2xl shadow-lg p-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Interests</Text>
          <View className="flex-row flex-wrap">
            {user.interests?.map((interest, index) => (
              <View
                key={index}
                className="bg-primary-100 rounded-full px-4 py-2 mr-2 mb-2"
              >
                <Text className="text-primary-600 font-medium">{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mx-4 rounded-2xl shadow-lg mb-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className={`flex-row items-center p-4 ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <Ionicons 
                name={item.icon} 
                size={24} 
                color={item.color === 'text-red-500' ? '#ef4444' : '#6b7280'} 
              />
              <Text className={`ml-3 text-base ${item.color || 'text-gray-800'}`}>
                {item.title}
              </Text>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color="#d1d5db" 
                className="ml-auto"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View className="items-center pb-8">
          <Text className="text-gray-500 text-sm mb-2">HeartSync v1.0.0</Text>
          <Text className="text-gray-400 text-xs">
            Made with ❤️ for meaningful connections
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;