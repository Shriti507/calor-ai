import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardStackRef = useRef(null);

  const handleSwipe = useCallback(
    (direction, isGesture = false) => {
      if (!isGesture && isTransitioning) return;

      const food = foods[currentIndex];
      if (!food) return;

      setIsTransitioning(true);

     
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (e) {
        
      }

      const actionMap = {
        right: "SWIPE_RIGHT",
        left: "SWIPE_LEFT",
        up: "SWIPE_UP",
        down: "SWIPE_DOWN",
      };

      dispatch({ type: actionMap[direction], payload: food });

      setTimeout(() => {
        setIsTransitioning(false);
      }, isGesture ? 50 : 350);

      if (currentIndex + 1 >= foods.length) {
        dispatch({ type: "COMPLETE" });
        setTimeout(() => navigation.navigate("Result"), 400);
      }
    },
    [currentIndex, dispatch, navigation, isTransitioning]
  );

  const handleButtonSwipeLeft = useCallback(() => {
    if (isTransitioning) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }
    cardStackRef.current?.swipeLeft();
  }, [isTransitioning]);

  const handleButtonSwipeRight = useCallback(() => {
    if (isTransitioning) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }
    cardStackRef.current?.swipeRight();
  }, [isTransitioning]);

  const handleButtonSwipeUp = useCallback(() => {
    if (isTransitioning) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }
    cardStackRef.current?.swipeUp();
  }, [isTransitioning]);

  const handleButtonSwipeDown = useCallback(() => {
    if (isTransitioning) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }
    cardStackRef.current?.swipeDown();
  }, [isTransitioning]);

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ProgressBar current={currentIndex} total={foods.length} />

        <View style={styles.cardArea}>
          <CardStack
            ref={cardStackRef}
            foods={foods}
            currentIndex={currentIndex}
            onSwipe={handleSwipe}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
          />
        </View>

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