import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const MatchModal = ({ visible, user, onClose }) => {
  if (!user) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <LinearGradient
          colors={['#ec4899', '#0ea5e9']}
          className="w-11/12 max-w-sm rounded-3xl p-6 items-center"
        >
          {/* Close button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 z-10 bg-white/20 rounded-full p-2"
          >
            <Ionicons name="close" size={20} color="#ffffff" />
          </TouchableOpacity>

          {/* Hearts animation */}
          <View className="flex-row justify-center mb-6 mt-4">
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="heart" size={40} color="#ffffff" />
            </View>
          </View>

          {/* Match text */}
          <Text className="text-white text-3xl font-bold mb-2 text-center">
            It's a Match!
          </Text>
          <Text className="text-white/90 text-base mb-6 text-center">
            You and {user.name} have liked each other
          </Text>

          {/* User photo */}
          <View className="mb-6">
            <Image
              source={{ uri: user.photos[0] }}
              className="w-32 h-32 rounded-full"
              resizeMode="cover"
            />
          </View>

          {/* User info */}
          <Text className="text-white text-xl font-bold mb-2 text-center">
            {user.name}, {user.age}
          </Text>
          <Text className="text-white/80 text-sm mb-6 text-center">
            {user.profession}
          </Text>

          {/* Action buttons */}
          <View className="w-full space-y-3">
            <TouchableOpacity className="bg-white rounded-full py-4 px-6">
              <Text className="text-primary-500 text-lg font-semibold text-center">
                Send Message
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onClose}
              className="bg-white/20 rounded-full py-4 px-6"
            >
              <Text className="text-white text-lg font-semibold text-center">
                Keep Playing
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default MatchModal;