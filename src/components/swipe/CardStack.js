import React, { useImperativeHandle, forwardRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { runOnJS, withSpring } from "react-native-reanimated";
import FoodCard from "../FoodCard";
import { COLORS, FONTS } from "../../constants/theme";
import {
  useCardAnimation,
  SPRING_CONFIG,
  SWIPE_THRESHOLD_X,
  SWIPE_THRESHOLD_Y,
} from "../../hooks/useCardAnimation";

const CardStack = forwardRef(
  ({ foods, currentIndex, onSwipe, isTransitioning, setIsTransitioning }, ref) => {
    const {
      translateX,
      translateY,
      reset,
      triggerSwipe,
      topCardStyle,
      nextCardStyle,
      leftBadgeStyle,
      rightBadgeStyle,
      upBadgeStyle,
      downBadgeStyle,
    } = useCardAnimation({
      onSwipeComplete: (direction) => {
        onSwipe(direction, true);
      },
      isTransitioning,
      setIsTransitioning,
    });

    useImperativeHandle(ref, () => ({
      swipeLeft: () => triggerSwipe("left", false),
      swipeRight: () => triggerSwipe("right", false),
      swipeUp: () => triggerSwipe("up", false),
      swipeDown: () => triggerSwipe("down", false),
    }));

    const gesture = Gesture.Pan()
      .enabled(!isTransitioning)
      .onUpdate((e) => {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      })
      .onEnd((e) => {
        const absX = Math.abs(translateX.value);
        const absY = Math.abs(translateY.value);

        if (absX > SWIPE_THRESHOLD_X && absX > absY) {
          const direction = translateX.value > 0 ? "right" : "left";
          runOnJS(triggerSwipe)(direction, true);
        } else if (absY > SWIPE_THRESHOLD_Y && absY > absX) {
          const direction = translateY.value < 0 ? "up" : "down";
          runOnJS(triggerSwipe)(direction, true);
        } else {
          translateX.value = withSpring(0, SPRING_CONFIG);
          translateY.value = withSpring(0, SPRING_CONFIG);
        }
      });

    if (currentIndex >= foods.length) {
      return null;
    }

    const currentFood = foods[currentIndex];
    const nextFood = currentIndex + 1 < foods.length ? foods[currentIndex + 1] : null;

    return (
      <View style={styles.container}>
        {nextFood && (
          <Animated.View style={[styles.cardContainer, styles.nextCard, nextCardStyle]}>
            <FoodCard food={nextFood} />
          </Animated.View>
        )}

        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.cardContainer, topCardStyle]}>
            <Animated.View style={[styles.badge, styles.badgeLeft, leftBadgeStyle]}>
              <Text style={[styles.badgeText, { backgroundColor: COLORS.dislike }]}>No</Text>
            </Animated.View>
            <Animated.View style={[styles.badge, styles.badgeRight, rightBadgeStyle]}>
              <Text style={[styles.badgeText, { backgroundColor: COLORS.like }]}>Yes</Text>
            </Animated.View>
            <Animated.View style={[styles.badge, styles.badgeTop, upBadgeStyle]}>
              <Text style={[styles.badgeText, { backgroundColor: COLORS.superLike }]}>
                Superlike ⭐
              </Text>
            </Animated.View>
            <Animated.View style={[styles.badge, styles.badgeBottom, downBadgeStyle]}>
              <Text style={[styles.badgeText, { backgroundColor: COLORS.notSure }]}>Unsure</Text>
            </Animated.View>

            <FoodCard food={currentFood} />
          </Animated.View>
        </GestureDetector>
      </View>
    );
  }
);

export default CardStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    position: "absolute",
  },
  nextCard: {
    zIndex: -1,
  },
  badge: {
    position: "absolute",
    zIndex: 10,
  },
  badgeLeft: {
    top: 20,
    left: 20,
  },
  badgeRight: {
    top: 20,
    right: 20,
  },
  badgeTop: {
    top: 20,
    alignSelf: "center",
    left: "50%",
    marginLeft: -50,
  },
  badgeBottom: {
    bottom: 20,
    alignSelf: "center",
    left: "50%",
    marginLeft: -30,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 16,
    ...FONTS.bold,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
});
