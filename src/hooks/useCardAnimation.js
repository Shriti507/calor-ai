import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS, interpolate, Extrapolation } from "react-native-reanimated";
import { useCallback } from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
};

export const SWIPE_THRESHOLD_X = width * 0.3;
export const SWIPE_THRESHOLD_Y = height * 0.15;

export function useCardAnimation({ onSwipeComplete, isTransitioning, setIsTransitioning }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const reset = useCallback(() => {
    translateX.value = 0;
    translateY.value = 0;
  }, [translateX, translateY]);

  const triggerSwipe = useCallback((direction, isGesture = false) => {
    if (!isGesture && isTransitioning) return;
    
    setIsTransitioning(true);

    if (direction === "left" || direction === "right") {
      const flyTo = direction === "right" ? width * 1.5 : -width * 1.5;
      translateX.value = withTiming(flyTo, { duration: 300 }, (finished) => {
        if (finished) {
          translateX.value = 0;
          translateY.value = 0;
          runOnJS(onSwipeComplete)(direction);
        }
      });
    } else if (direction === "up" || direction === "down") {
      const flyTo = direction === "up" ? -height : height;
      translateY.value = withTiming(flyTo, { duration: 300 }, (finished) => {
        if (finished) {
          translateX.value = 0;
          translateY.value = 0;
          runOnJS(onSwipeComplete)(direction);
        }
      });
    }
  }, [isTransitioning, setIsTransitioning, onSwipeComplete, reset, translateX, translateY]);

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

  return {
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
  };
}
