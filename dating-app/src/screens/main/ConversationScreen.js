import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';

const ConversationScreen = ({ route }) => {
  const { conversationId, userId, userName, userPhoto } = route.params;
  const { conversations, sendMessage } = useUser();
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef(null);

  const conversation = conversations.find(c => c.id === conversationId);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (conversation && conversation.messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversation?.messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(conversationId, messageText.trim());
      setMessageText('');
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }) => {
    const isMyMessage = item.sender === 'me';
    
    return (
      <View className={`mb-4 ${isMyMessage ? 'items-end' : 'items-start'}`}>
        <View
          className={`max-w-xs px-4 py-3 rounded-2xl ${
            isMyMessage
              ? 'bg-primary-500 rounded-br-sm'
              : 'bg-gray-200 rounded-bl-sm'
          }`}
        >
          <Text className={`text-base ${isMyMessage ? 'text-white' : 'text-gray-800'}`}>
            {item.text}
          </Text>
        </View>
        <Text className="text-xs text-gray-500 mt-1 px-2">
          {formatMessageTime(item.timestamp)}
        </Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center px-6">
      <View className="bg-primary-50 rounded-full p-6 mb-4">
        <Ionicons name="chatbubble-outline" size={40} color="#ec4899" />
      </View>
      <Text className="text-lg font-semibold text-gray-800 mb-2 text-center">
        Start the conversation
      </Text>
      <Text className="text-gray-600 text-center">
        Say hello to {userName} and break the ice!
      </Text>
    </View>
  );

  if (!conversation) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">Conversation not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1">
          {/* Messages List */}
          <FlatList
            ref={flatListRef}
            data={conversation.messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ 
              padding: 16,
              paddingBottom: 20,
              flexGrow: 1
            }}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
          />

          {/* Message Input */}
          <View className="flex-row items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
            <TextInput
              className="flex-1 bg-white rounded-full px-4 py-3 mr-3 border border-gray-200"
              placeholder={`Message ${userName}...`}
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!messageText.trim()}
              className={`p-3 rounded-full ${
                messageText.trim() ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={messageText.trim() ? '#ffffff' : '#9ca3af'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConversationScreen;