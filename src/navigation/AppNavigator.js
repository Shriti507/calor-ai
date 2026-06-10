
import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IntroScreen from "../screens/IntroScreen";
import SwipeScreen from "../screens/SwipeScreen";
import ResultScreen from "../screens/ResultScreen";
import BottomBar from "../components/navigation/BottomBar";
import { SwipeProvider } from "../context/SwipeContext";


const Stack = createNativeStackNavigator();

function ScreenWithBottomBar({ children, activeTab, navigation }) {
  const handleTabPress = useCallback(
    (tab) => {
      if (tab === "Start") {
        navigation.navigate("Intro");
      } else if (tab === "TasteProfile") {
        navigation.navigate("Result");
      }
    },
    [navigation]
  );

  return (
    <View style={styles.screen}>
      {children}
      <BottomBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

function IntroWithBar(props) {
  return (
    <ScreenWithBottomBar activeTab="Start" navigation={props.navigation}>
      <IntroScreen {...props} />
    </ScreenWithBottomBar>
  );
}

function ResultWithBar(props) {
  return (
    <ScreenWithBottomBar activeTab="TasteProfile" navigation={props.navigation}>
      <ResultScreen {...props} />
    </ScreenWithBottomBar>
  );
}

export default function AppNavigator() {
  return (
    <SwipeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={IntroWithBar} />
          <Stack.Screen
            name="Swipe"
            component={SwipeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Result" component={ResultWithBar} />
        </Stack.Navigator>
      </NavigationContainer>
    </SwipeProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});