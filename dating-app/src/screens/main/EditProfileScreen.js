import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name || '',
    age: user.age?.toString() || '',
    bio: user.bio || '',
    location: user.location || '',
    interests: user.interests || []
  });
  const [isLoading, setIsLoading] = useState(false);

  const availableInterests = [
    'Travel', 'Music', 'Photography', 'Hiking', 'Cooking', 'Reading', 'Art', 'Sports',
    'Movies', 'Dancing', 'Yoga', 'Fitness', 'Gaming', 'Wine', 'Coffee', 'Dogs',
    'Cats', 'Nature', 'Beach', 'Mountains', 'Technology', 'Fashion', 'Food'
  ];

  const handleSave = async () => {
    if (!formData.name || !formData.age || !formData.bio) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (parseInt(formData.age) < 18) {
      Alert.alert('Error', 'You must be at least 18 years old');
      return;
    }

    setIsLoading(true);
    const result = await updateUser({
      ...formData,
      age: parseInt(formData.age)
    });

    if (result.success) {
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Error', result.error || 'Failed to update profile');
    }
    setIsLoading(false);
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Basic Info */}
          <View className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Basic Information</Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Name *</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  value={formData.name}
                  onChangeText={(value) => updateFormData('name', value)}
                  placeholder="Enter your name"
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Age *</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  value={formData.age}
                  onChangeText={(value) => updateFormData('age', value)}
                  placeholder="Enter your age"
                  keyboardType="numeric"
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Location</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  value={formData.location}
                  onChangeText={(value) => updateFormData('location', value)}
                  placeholder="Enter your location"
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Bio *</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  value={formData.bio}
                  onChangeText={(value) => updateFormData('bio', value)}
                  placeholder="Tell us about yourself..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Interests */}
          <View className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Interests ({formData.interests.length})
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Choose up to 10 interests that represent you
            </Text>
            
            <View className="flex-row flex-wrap">
              {availableInterests.map((interest, index) => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleInterest(interest)}
                    disabled={!isSelected && formData.interests.length >= 10}
                    className={`rounded-full px-4 py-2 m-1 border ${
                      isSelected
                        ? 'bg-primary-500 border-primary-500'
                        : 'bg-gray-50 border-gray-200'
                    } ${
                      !isSelected && formData.interests.length >= 10
                        ? 'opacity-50'
                        : ''
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        isSelected ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={isLoading}
            className="bg-primary-500 rounded-2xl py-4 px-6 shadow-lg"
          >
            <Text className="text-white text-lg font-semibold text-center">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;