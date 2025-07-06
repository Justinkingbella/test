import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';

const ChatScreen = ({ navigation }) => {
  const { conversations, markConversationAsRead } = useUser();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handleConversationPress = (conversation) => {
    markConversationAsRead(conversation.id);
    navigation.navigate('Conversation', {
      conversationId: conversation.id,
      userId: conversation.userId,
      userName: conversation.userName,
      userPhoto: conversation.userPhoto
    });
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleConversationPress(item)}
      className="flex-row items-center p-4 bg-white border-b border-gray-100"
    >
      {/* User Photo */}
      <View className="relative">
        <Image
          source={{ uri: item.userPhoto }}
          className="w-16 h-16 rounded-full"
          resizeMode="cover"
        />
        {/* Online indicator */}
        <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      </View>

      {/* Conversation Info */}
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-800">
            {item.userName}
          </Text>
          <Text className="text-sm text-gray-500">
            {formatTime(item.lastMessageTime)}
          </Text>
        </View>
        
        <View className="flex-row items-center mt-1">
          <Text
            className={`flex-1 text-sm ${
              item.unread ? 'text-gray-800 font-medium' : 'text-gray-500'
            }`}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread && (
            <View className="w-3 h-3 bg-primary-500 rounded-full ml-2" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center px-6">
      <View className="bg-primary-50 rounded-full p-8 mb-6">
        <Ionicons name="chatbubbles-outline" size={60} color="#ec4899" />
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
        No Conversations Yet
      </Text>
      <Text className="text-gray-600 text-center leading-6">
        Start matching with people to begin conversations! Your chats will appear here.
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
              Messages ({conversations.length})
            </Text>
            <TouchableOpacity className="p-2">
              <Ionicons name="search-outline" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Conversations List */}
        <FlatList
          data={conversations.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;