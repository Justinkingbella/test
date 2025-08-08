# HeartSync - Dating Mobile App

A modern and beautiful dating mobile app built with React Native, Expo, and NativeWind.

## ✨ Features

- **User Authentication** - Sign up, login, and logout functionality
- **Profile Management** - Create and edit user profiles with photos, bio, and interests
- **Card Swiping** - Tinder-like card interface for discovering potential matches
- **Real-time Matching** - Get notified when you match with someone
- **Chat System** - Send messages to your matches
- **Beautiful UI** - Modern design with gradient backgrounds and smooth animations
- **Responsive Design** - Works on all device sizes

## 🚀 Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tooling
- **NativeWind** - Utility-first CSS framework for React Native
- **React Navigation** - Navigation library for React Native
- **Expo SecureStore** - Secure local storage for user data
- **React Native Gesture Handler** - Gesture handling for swipe interactions

## 📱 Screenshots

The app includes:
- Welcome screen with beautiful gradient background
- Authentication flows (Login/Register)
- Main app with bottom tab navigation
- Swipeable cards for discovering matches
- Match notification modal
- Chat interface with message bubbles
- Profile screens with stats and settings

## 🛠️ Installation

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn
   - Expo CLI (`npm install -g @expo/cli`)

2. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd dating-app
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Run on Device/Simulator**
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or use iOS Simulator / Android Emulator

## 📁 Project Structure

```
dating-app/
├── App.js                 # Main app component
├── src/
│   ├── components/        # Reusable components
│   │   ├── MatchCard.js   # Swipeable user card
│   │   └── MatchModal.js  # Match notification modal
│   ├── context/           # React Context providers
│   │   ├── AuthContext.js # Authentication state
│   │   └── UserContext.js # User data and matches
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/           # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── main/          # Main app screens
│   │   └── common/        # Common screens
│   └── utils/             # Utility functions
├── assets/                # Images, fonts, etc.
├── global.css            # Global styles
├── tailwind.config.js    # Tailwind configuration
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
└── app.json              # Expo configuration
```

## 🎨 Design System

The app uses a consistent design system with:

- **Primary Color**: Pink (#ec4899)
- **Secondary Color**: Blue (#0ea5e9)
- **Gradient Backgrounds**: Pink to blue gradients
- **Typography**: Clean, modern fonts
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle shadows for depth

## 🔧 Configuration

### Tailwind CSS
The app uses NativeWind for styling with custom color palette and components defined in `tailwind.config.js`.

### Navigation
React Navigation is configured with:
- Stack Navigator for auth flow
- Bottom Tab Navigator for main app
- Nested navigation for additional screens

### State Management
- **AuthContext**: Manages user authentication state
- **UserContext**: Manages user data, matches, and conversations
- **SecureStore**: Persists user data securely

## 🧪 Mock Data

The app includes mock data for:
- User profiles with photos from Unsplash
- Potential matches with diverse profiles
- Sample conversations and messages
- User interests and preferences

## 🚀 Development Scripts

```bash
# Start development server
npm start

# Start with cleared cache
npm start -- --clear

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## 🔒 Security Features

- Secure token storage using Expo SecureStore
- Input validation and sanitization
- Protection against common vulnerabilities
- User authentication flow

## 📝 Future Enhancements

- Push notifications for new matches and messages
- Photo upload and verification
- Video chat integration
- Location-based matching
- Advanced filtering options
- Premium features
- Social media integration
- Real-time messaging with WebSocket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please create an issue on the GitHub repository or contact the development team.

---

**HeartSync** - Made with ❤️ for meaningful connections