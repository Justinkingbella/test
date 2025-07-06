import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for potential matches
  const mockPotentialMatches = [
    {
      id: '2',
      name: 'Sarah Johnson',
      age: 26,
      bio: 'Adventure seeker, coffee lover, and dog mom. Looking for someone to explore the world with! 🌍',
      photos: [
        'https://images.unsplash.com/photo-1494790108755-2616b332c8b2?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop'
      ],
      interests: ['Travel', 'Photography', 'Yoga', 'Dogs'],
      location: 'Brooklyn, NY',
      distance: 2,
      profession: 'Graphic Designer'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      age: 24,
      bio: 'Foodie, bookworm, and amateur chef. Love trying new recipes and cozy nights in! 📚👩‍🍳',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=300&h=400&fit=crop'
      ],
      interests: ['Cooking', 'Reading', 'Wine', 'Art'],
      location: 'Manhattan, NY',
      distance: 5,
      profession: 'Software Engineer'
    },
    {
      id: '4',
      name: 'Maya Patel',
      age: 29,
      bio: 'Fitness enthusiast and nature lover. Weekend warrior who loves hiking and rock climbing! 🏔️',
      photos: [
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=400&fit=crop'
      ],
      interests: ['Fitness', 'Hiking', 'Rock Climbing', 'Meditation'],
      location: 'Queens, NY',
      distance: 8,
      profession: 'Physical Therapist'
    },
    {
      id: '5',
      name: 'Isabella Garcia',
      age: 27,
      bio: 'Artist and music lover. Spend my days creating and my nights discovering new bands! 🎨🎵',
      photos: [
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=300&h=400&fit=crop'
      ],
      interests: ['Art', 'Music', 'Concerts', 'Painting'],
      location: 'Lower East Side, NY',
      distance: 3,
      profession: 'Art Teacher'
    }
  ];

  useEffect(() => {
    // Load initial data
    loadPotentialMatches();
  }, []);

  const loadPotentialMatches = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filteredMatches = mockPotentialMatches.filter(
          match => !likedUsers.includes(match.id) && !rejectedUsers.includes(match.id)
        );
        setPotentialMatches(filteredMatches);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading potential matches:', error);
      setLoading(false);
    }
  };

  const likeUser = (userId) => {
    setLikedUsers(prev => [...prev, userId]);
    setPotentialMatches(prev => prev.filter(match => match.id !== userId));
    
    // Simulate match logic (50% chance for demo)
    if (Math.random() > 0.5) {
      const matchedUser = mockPotentialMatches.find(user => user.id === userId);
      if (matchedUser) {
        setMatches(prev => [...prev, {
          id: Date.now().toString(),
          user: matchedUser,
          timestamp: new Date().toISOString()
        }]);
        
        // Create initial conversation
        setConversations(prev => [...prev, {
          id: Date.now().toString(),
          userId: userId,
          userName: matchedUser.name,
          userPhoto: matchedUser.photos[0],
          messages: [{
            id: '1',
            text: "Hey! We matched! 😊",
            sender: 'other',
            timestamp: new Date().toISOString()
          }],
          lastMessage: "Hey! We matched! 😊",
          lastMessageTime: new Date().toISOString(),
          unread: true
        }]);
      }
    }
  };

  const rejectUser = (userId) => {
    setRejectedUsers(prev => [...prev, userId]);
    setPotentialMatches(prev => prev.filter(match => match.id !== userId));
  };

  const sendMessage = (conversationId, message) => {
    setConversations(prev => prev.map(conversation => {
      if (conversation.id === conversationId) {
        const newMessage = {
          id: Date.now().toString(),
          text: message,
          sender: 'me',
          timestamp: new Date().toISOString()
        };
        
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastMessage: message,
          lastMessageTime: new Date().toISOString()
        };
      }
      return conversation;
    }));
  };

  const markConversationAsRead = (conversationId) => {
    setConversations(prev => prev.map(conversation => {
      if (conversation.id === conversationId) {
        return { ...conversation, unread: false };
      }
      return conversation;
    }));
  };

  const value = {
    matches,
    conversations,
    potentialMatches,
    likedUsers,
    rejectedUsers,
    loading,
    likeUser,
    rejectUser,
    sendMessage,
    markConversationAsRead,
    loadPotentialMatches
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};