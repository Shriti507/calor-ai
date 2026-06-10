
import React, { useCallback } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import FoodCard from "../FoodCard";
import { COLORS, FONTS } from "../../constants/theme";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD_X = width * 0.3;
const SWIPE_THRESHOLD_Y = height * 0.15;

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
};

export default function CardStack({ foods, currentIndex, onSwipe }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleSwipe = useCallback(
    (direction) => {
      onSwipe(direction);
      // Reset position for next card
      translateX.value = 0;
      translateY.value = 0;
    },
    [onSwipe]
  );

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {

      const absX = Math.abs(translateX.value);
      const absY = Math.abs(translateY.value);

      if (absX > SWIPE_THRESHOLD_X && absX > absY) {
 
        const direction = translateX.value > 0 ? "right" : "left";
        const flyTo = translateX.value > 0 ? width * 1.5 : -width * 1.5;
        translateX.value = withTiming(flyTo, { duration: 300 }, () => {
          runOnJS(handleSwipe)(direction);
        });
      } else if (absY > SWIPE_THRESHOLD_Y && absY > absX) {
        
        const direction = translateY.value < 0 ? "up" : "down";
        const flyTo = translateY.value < 0 ? -height : height;
        translateY.value = withTiming(flyTo, { duration: 300 }, () => {
          runOnJS(handleSwipe)(direction);
        });
      } else {

        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });


  const topCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-15, 0, 15],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const badgeStyle = useAnimatedStyle(() => {
    const absX = Math.abs(translateX.value);
    const absY = Math.abs(translateY.value);
    const opacity = interpolate(
      Math.max(absX, absY),
      [0, 60, 120],
      [0, 0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const getBadge = (direction) => {
    const badges = {
      left: { text: "No", color: COLORS.dislike, emoji: "" },
      right: { text: "Yes", color: COLORS.like, emoji: "" },
      up: { text: "Superlike ⭐", color: COLORS.superLike, emoji: "" },
      down: { text: "Unsure", color: COLORS.notSure, emoji: "" },
    };
    return badges[direction];
  };

  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.max(Math.abs(translateX.value), Math.abs(translateY.value)),
      [0, SWIPE_THRESHOLD_X],
      [0.92, 1],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      Math.max(Math.abs(translateX.value), Math.abs(translateY.value)),
      [0, SWIPE_THRESHOLD_X],
      [0.6, 1],
      Extrapolation.CLAMP
    );
    return { transform: [{ scale }], opacity };
  });

  const leftBadgeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, -60, -120],
      [0, 0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const rightBadgeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, 60, 120],
      [0, 0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const upBadgeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, -40, -100],
      [0, 0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const downBadgeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, 40, 100],
      [0, 0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
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
