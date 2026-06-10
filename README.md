# CalorAI Taste Profile 

A beautiful, swipeable food preference interface built with React Native (Expo). Users swipe through food cards to build their taste profile, which is then summarized in a detailed results screen.



## Features

### Core
- **Intro Screen** — Welcome/onboarding with glassmorphism card and CTA button
- **Swipe Screen** — Stack of food cards with 4-direction swipe gestures:
  - Swipe **right** → Like (Yes)
  - Swipe **left** → Dislike (No)
  - Swipe **up** → Super Like ⭐
  - Swipe **down** → Not Sure
- **Result Screen** — Taste profile summary with:
  - Key Highlights (top food categories)
  - Lifestyle & Goals checklist
  - Horizontally-paged: Foods You Love / Foods You Hate / Favorite Cuisines
- **Glass/blur bottom navigation** bar (Start, FAQ, Taste Profile, Search)
- **Progress bar** that updates as the user swipes

### Design
- Dark theme with gradient backgrounds
- Frosted-glass (glassmorphism) cards using `expo-blur`
- Green accent color (#4ADE80) throughout
- Smooth 60fps animations with `react-native-reanimated`
- Card rotation during swipe with spring physics

### Cross-Platform
- **iOS**: Native `BlurView` for glass effects
- **Android**: Semi-transparent dark fallback for glass cards, ensuring the UI never looks broken

## Tech Stack

| Library | Purpose |
|---------|---------|
| React Native (Expo SDK 54) | Framework |
| `react-native-gesture-handler` | Swipe gesture handling |
| `react-native-reanimated` | Smooth 60fps animations |
| `expo-blur` | iOS frosted-glass effects |
| `expo-linear-gradient` | Gradient backgrounds |
| `@react-navigation/native` | Screen navigation |
| `@react-navigation/native-stack` | Stack navigator |
| `react-native-safe-area-context` | Safe area handling |

## Setup & Run

### Prerequisites
- Node.js 18+
- Expo Go app installed on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
# Clone the repo
git clone https://github.com/Shriti507/calor-ai.git
cd calor-ai

# Install dependencies
npm install

# Start the dev server
npx expo start --clear
```

### Running on Device
1. Open Expo Go on your phone
2. Scan the QR code shown in the terminal
3. The app will load on your device

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Background.js      # Gradient background with ambient glow
│   │   ├── GlassCard.js       # Frosted-glass card (blur + Android fallback)
│   │   └── GlassButton.js     # Pill-shaped button (primary/glass variants)
│   ├── navigation/
│   │   └── BottomBar.js        # Glass-blur bottom tab bar
│   ├── swipe/
│   │   ├── CardStack.js        # Gesture-driven swipeable card stack
│   │   ├── ProgressBar.js      # Green progress indicator
│   │   └── SwipeButtons.js     # 4 action buttons (like/dislike/super/unsure)
│   └── FoodCard.js             # Individual food card (emoji + text)
├── constants/
│   └── theme.js                # Design tokens (colors, fonts, spacing, shadows)
├── context/
│   └── SwipeContext.js         # Global state for swipe tracking (useReducer)
├── data/
│   └── foods.json              # 20 food preference cards
├── navigation/
│   └── AppNavigator.js         # Stack navigator + SwipeProvider
└── screens/
    ├── IntroScreen.js          # Welcome/onboarding screen
    ├── SwipeScreen.js          # Main swiping interface
    └── ResultScreen.js         # Taste profile results
```

