import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';
import MatchCard from '../../components/MatchCard';
import MatchModal from '../../components/MatchModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen = () => {
  const { potentialMatches, likeUser, rejectUser, matches, loading } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [newMatch, setNewMatch] = useState(null);
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
      rotate.setValue(gesture.dx / screenWidth);
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        handleSwipeRight();
      } else if (gesture.dx < -120) {
        handleSwipeLeft();
      } else {
        // Snap back to center
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        Animated.spring(rotate, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleSwipeRight = () => {
    if (currentIndex < potentialMatches.length) {
      const currentUser = potentialMatches[currentIndex];
      
      // Animate card out
      Animated.timing(position, {
        toValue: { x: screenWidth + 100, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        // Check if it's a match (simulate 30% chance)
        if (Math.random() > 0.7) {
          setNewMatch(currentUser);
          setShowMatchModal(true);
        }
        
        likeUser(currentUser.id);
        nextCard();
      });
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex < potentialMatches.length) {
      const currentUser = potentialMatches[currentIndex];
      
      // Animate card out
      Animated.timing(position, {
        toValue: { x: -screenWidth - 100, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        rejectUser(currentUser.id);
        nextCard();
      });
    }
  };

  const nextCard = () => {
    setCurrentIndex(prev => prev + 1);
    position.setValue({ x: 0, y: 0 });
    rotate.setValue(0);
  };

  const handleLikePress = () => {
    handleSwipeRight();
  };

  const handleRejectPress = () => {
    handleSwipeLeft();
  };

  const rotateCard = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">Loading matches...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (currentIndex >= potentialMatches.length) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="heart-outline" size={80} color="#ec4899" />
          <Text className="text-2xl font-bold text-gray-800 mt-4 text-center">
            No more matches
          </Text>
          <Text className="text-gray-600 mt-2 text-center">
            Check back later for new people in your area
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentMatch = potentialMatches[currentIndex];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-800">Discover</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="options-outline" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Card Stack */}
        <View className="flex-1 relative">
          {/* Next card (behind) */}
          {currentIndex + 1 < potentialMatches.length && (
            <View className="absolute inset-0 mt-4">
              <MatchCard user={potentialMatches[currentIndex + 1]} />
            </View>
          )}

          {/* Current card */}
          <Animated.View
            className="absolute inset-0"
            style={{
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate: rotateCard },
              ],
            }}
            {...panResponder.panHandlers}
          >
            <MatchCard user={currentMatch} />
          </Animated.View>

          {/* Swipe indicators */}
          <Animated.View
            className="absolute top-16 right-8 bg-red-500 px-4 py-2 rounded-full"
            style={{
              opacity: position.x.interpolate({
                inputRange: [-150, -50, 0],
                outputRange: [1, 0.5, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Text className="text-white font-bold">NOPE</Text>
          </Animated.View>

          <Animated.View
            className="absolute top-16 left-8 bg-green-500 px-4 py-2 rounded-full"
            style={{
              opacity: position.x.interpolate({
                inputRange: [0, 50, 150],
                outputRange: [0, 0.5, 1],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Text className="text-white font-bold">LIKE</Text>
          </Animated.View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-center items-center space-x-8 pb-8">
          <TouchableOpacity
            onPress={handleRejectPress}
            className="bg-white rounded-full p-4 shadow-lg"
          >
            <Ionicons name="close" size={32} color="#ef4444" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLikePress}
            className="bg-primary-500 rounded-full p-6 shadow-lg"
          >
            <Ionicons name="heart" size={32} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Match Modal */}
      <MatchModal
        visible={showMatchModal}
        user={newMatch}
        onClose={() => setShowMatchModal(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;