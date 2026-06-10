//Main swipe screen with card stack, progress, and action buttons
import React, { useCallback } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/common/Background";
import ProgressBar from "../components/swipe/ProgressBar";
import CardStack from "../components/swipe/CardStack";
import SwipeButtons from "../components/swipe/SwipeButtons";
import { useSwipeContext } from "../context/SwipeContext";
import foodData from "../data/foods.json";
const foods = foodData.foods;

export default function SwipeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useSwipeContext();
  const { currentIndex } = state;

  const handleSwipe = useCallback(
    (direction) => {
      const food = foods[currentIndex];
      if (!food) return;

      const actionMap = {
        right: "SWIPE_RIGHT",
        left: "SWIPE_LEFT",
        up: "SWIPE_UP",
        down: "SWIPE_DOWN",
      };

      dispatch({ type: actionMap[direction], payload: food });

      // Navigate to results when all cards are swiped
      if (currentIndex + 1 >= foods.length) {
        dispatch({ type: "COMPLETE" });
        setTimeout(() => navigation.navigate("Result"), 400);
      }
    },
    [currentIndex, dispatch, navigation]
  );

  // Button press handlers — trigger programmatic swipe
  const handleButtonSwipeLeft = useCallback(() => handleSwipe("left"), [handleSwipe]);
  const handleButtonSwipeRight = useCallback(() => handleSwipe("right"), [handleSwipe]);
  const handleButtonSwipeUp = useCallback(() => handleSwipe("up"), [handleSwipe]);
  const handleButtonSwipeDown = useCallback(() => handleSwipe("down"), [handleSwipe]);

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Progress bar */}
        <ProgressBar current={currentIndex} total={foods.length} />

        {/* Card stack */}
        <View style={styles.cardArea}>
          <CardStack
            foods={foods}
            currentIndex={currentIndex}
            onSwipe={handleSwipe}
          />
        </View>

        {/* Action buttons */}
        <View style={[styles.buttonsArea, { paddingBottom: insets.bottom + 20 }]}>
          <SwipeButtons
            onSwipeLeft={handleButtonSwipeLeft}
            onSwipeRight={handleButtonSwipeRight}
            onSwipeUp={handleButtonSwipeUp}
            onSwipeDown={handleButtonSwipeDown}
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsArea: {
    paddingBottom: 20,
  },
});