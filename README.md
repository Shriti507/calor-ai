# CalorAI Taste Profile (Expo app)

A premium, highly interactive food preference swipe interface built using React Native and Expo. Users build a personalized taste profile by swiping food cards in 4 directions, which is then compiled into a high-fidelity glassmorphism results dashboard.

---

## Project Overview

CalorAI allows users to visually configure their dining and macro tastes through intuitive swipe gestures. The layout is optimized to match high-fidelity forest-green glassmorphism mockup design properties:

* **Intro/Onboarding Screen**: High-end glass welcome card detailing instructions with custom CTA navigations.
* **Swipe Deck Screen**: Smooth 60 FPS gesture-driven card deck supporting 4-direction swiping, contextual swipe badge overlays, interactive tactile button controls, and a spring-animated progress bar.
* **Taste Profile Dashboard**: A responsive, horizontally-paged results system summarizing liked counts, disliked counts, key highlight cards, personalized lifestyle goals, and dynamic content-driven food lists.

---

## Folder Structure

```text
calor-ai/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Background.js
│   │   │   ├── GlassButton.js
│   │   │   └── GlassCard.js
│   │   ├── navigation/
│   │   │   └── BottomBar.js
│   │   ├── result/
│   │   │   └── FoodListSection.js
│   │   └── swipe/
│   │       ├── CardStack.js
│   │       ├── ProgressBar.js
│   │       └── SwipeButtons.js
│   ├── constants/
│   │   └── theme.js
│   ├── context/
│   │   └── SwipeContext.js
│   ├── data/
│   │   └── foods.json
│   ├── hooks/
│   │   └── useCardAnimation.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   └── screens/
│       ├── IntroScreen.js
│       ├── ResultScreen.js
│       └── SwipeScreen.js
```

---

## Setup & Installation (Expo Go)

### Prerequisites
* **Node.js**: Version 18 or higher.
* **Expo Go App**: Pre-installed on your mobile device ([iOS App Store](https://apps.apple.com/app/expo-go/id982107779) / [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)).

### Run the App Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Shriti507/calor-ai.git
   cd calor-ai
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Expo Development Server**:
   ```bash
   npx expo start 
   ```

4. **Launch on Expo Go**:
   * **Android**: Scan the terminal QR code using the scanner in the Expo Go app.
   * **iOS**: Scan the QR code using your phone's default Camera app, then tap the prompt to open in Expo Go.

---

## Libraries Used & Rationale

| Library | Purpose & Why |
| :--- | :--- |
| **`react-native-reanimated`** | Drives high-performance animations (card drag offsets, rotations, and spring-loaded progress bar scales) completely on the UI thread at 60 FPS. |
| **`react-native-gesture-handler`** | Captures fluid gesture parameters (drag translations and velocity vectors) using the modern declarative Gesture API. |
| **`expo-blur`** | Renders high-end frosted-glass surfaces on iOS devices using native blurs. |
| **`expo-linear-gradient`** | Generates dynamic 135deg diagonal borders on cards and backdrop aurora radial glows. |
| **`expo-image`** | Replaces default image loaders in `FoodCard.js` to enable progressive disk and memory caching, placeholder fades, and zero image flashes. |
| **`expo-haptics`** | Triggers subtle tactile micro-vibrations on swipe completions and button taps. |
| **`react-native-safe-area-context`** | Resolves platform notch constraints across notch-laden iOS screens and Android status bars. |

---

## Design Decisions & Trade-offs

1. **Card Layout Separation**:
   * *Decision*: Destructured margins, heights, and positions away from padding styles when flattening elements in `GlassCard.js`.
   * *Trade-off*: Adds minimal style parser overhead during component initialization, but prevents the 1px linear gradient border wrapper from overlapping content and fixes child layout centering.
2. **Conditional flexGrow Sizing**:
   * *Decision*: Designed `GlassCard.js` to dynamically evaluate size constraint properties (`height`, `minHeight`, `flex`, `flexGrow`). It only stretches cards via `flexGrow: 1` if a fixed size constraint exists.
   * *Trade-off*: Requires checking properties, but ensures the card dynamically shrinks when empty (e.g. empty Result lists) instead of stretching into blank, tall layouts.
3. **State Architecture**:
   * *Decision*: Implemented `useReducer` combined with `Context` (`SwipeContext.js`) instead of external state libraries like Redux or Zustand.
   * *Trade-off*: Limits absolute middleware customizability, but keeps the swipe deck state logic local, fast, and extremely easy to scale for Expo Go compatibility.

---

## Cross-Platform Adaptation

### iOS (Rich Visuals)
* Native background glass blurs are handled using `<BlurView>` (tint dark, intensity `20` to `40`).
* Drop-shadows are rendered using CoreGraphics shadow coordinates (`shadowOpacity: 0.4`, `shadowRadius: 20`, `shadowOffset: { width: 0, height: 8 }`).

### Android (Performance Fallbacks)
* Since native blur can cause performance degradation on low-end Android hardware, blurs fall back to semi-transparent surfaces (`rgba(22, 25, 28, 0.92)` on bar, `#0e1a16` on cards) overlaid with thin borders.
* Shadow rendering drops back to high elevation scales (`elevation: 8` to `10`) to approximate depth mapping natively.

---

## Tech Stack Summary

* **Core Framework**: React Native (Expo SDK 54)
* **Navigation**: React Navigation (Native Stack)
* **Gestures & Animations**: React Native Gesture Handler & React Native Reanimated (60 FPS UI-thread animations)
* **Visual Effects**: Expo Blur (iOS native frosted-glass) & Expo Linear Gradient (dynamic card borders & aurora flows)
* **Media & Performance**: Expo Image (progressive disk caching and fade transitions)
* **Haptics**: Expo Haptics (tactile impact vibrations)

---

## Development Time Breakdown (8 Hours Total)

* **Phase 1: Setup & Project Scaffold (1.5 Hours)**: Project initialization, configuring navigation, mapping JSON data, and setting up theme constants.
* **Phase 2: Gesture & Reanimated Integration (2 Hours)**: Writing custom card physics hooks, Pan tracking, rotation animations, and gesture locks.
* **Phase 3: Visual Polish & Layout Tuning (2.5 Hours)**: Designing diagonal shiny card borders, solving layout alignments, and fixing scroll snapping boundaries.
* **Phase 4: Integrations (1.5 Hours)**: Integrating Expo Image caching, connecting tactile haptic feedback mechanisms, and cleanups.
* **Phase 5: Documentation & Wrap-Up (0.5 Hours)**: Code comments cleanup and writing README.md instructions.

---

## AI Development Methodology

This project was developed with the assistance of **ChatGPT** and **Antigravity** (for layout refinements, modular refactoring, gesture lock setups, and design system alignment audits).
