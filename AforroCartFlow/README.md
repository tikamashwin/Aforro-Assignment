# AforroCartFlow

AforroCartFlow is a high-performance, aesthetically pleasing React Native e-commerce mobile application designed for a seamless shopping experience. It features a robust architecture, centralized state management, and a premium UI/UX design.

## 🏗️ Project Architecture

The project follows a modular and scalable architecture, ensuring maintainability and ease of development.

### 1. Folder Structure
- **`src/components`**: Reusable UI atoms and molecules (Buttons, Cards, Modals, etc.).
- **`src/screens`**: Main application views (Product Listing, Cart Review, etc.).
- **`src/store`**: Redux Toolkit slices, hooks, and store configuration for global state management.
- **`src/theme`**: Centralized design tokens (colors, typography, spacing).
- **`src/data`**: Mock data and TypeScript interfaces for data models.

### 2. State Management
We use **Redux Toolkit (RTK)** for predictable state transitions.
- **`cartSlice`**: Manages the shopping cart state, including item additions/removals, coupon applications, and checkout status.
- **Hooks**: Custom `useAppDispatch` and `useAppSelector` hooks for type-safe interaction with the store.

### 3. Navigation
Powered by **React Navigation**, utilizing a native stack for smooth transitions and optimal performance on both iOS and Android.

---

## 🎨 Design Philosophy

Our design philosophy focuses on **Visual Excellence**, **User Engagement**, and **Performance**.

### 1. Premium Aesthetics
- **Color Palette**: A curated selection of colors defined in `src/theme/colors.ts`, ensuring consistency across the app. We favor soft surfaces and high-contrast text for readability.
- **Micro-Animations**: Extensive use of `react-native-reanimated` for fluid interactions, such as layout transitions and interactive gestures.
- **Glassmorphism & Modality**: Use of bottom sheets (`@gorhom/bottom-sheet`) for non-blocking secondary interactions like login prompts and address selection.

### 2. Mental Model & UX
- **Contextual Feedback**: Dynamic banners (e.g., "You are saving ₹X") provide immediate gratification and encourage conversion.
- **Seamless Checkout**: Minimizing friction by using overlays for essential steps (address, login) instead of navigating away from the cart.
- **Responsive Layouts**: Designed to look stunning on all screen sizes, from small Android devices to the latest iPhones.

---

## 🛠️ Tech Stack

- **Core**: React Native (0.84.1), TypeScript
- **State**: Redux Toolkit, React Redux
- **Navigation**: React Navigation (Native Stack)
- **UI & Animations**: Lucide Icons, React Native Reanimated, Gorhom Bottom Sheet, React Native SVG
- **Styling**: Standard StyleSheet (Vanilla CSS approach for React Native)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 22.11.0)
- Watchman
- Android Studio / Xcode for emulators

### Installation
1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. (iOS only) Install CocoaPods:
   ```sh
   cd ios && pod install && cd ..
   ```

### Running the App
1. Start Metro:
   ```sh
   npm start
   ```
2. Run on Android:
   ```sh
   npm run android
   ```
3. Run on iOS:
   ```sh
   npm run ios
   ```

---

## 🧪 Testing
We use **Jest** and **React Test Renderer** for unit and component testing.
```sh
npm test
```
