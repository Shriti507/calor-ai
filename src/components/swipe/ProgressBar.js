import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { COLORS, SIZES } from "../../constants/theme";

export default function ProgressBar({ current, total }) {
  const widthVal = useSharedValue(0);

  useEffect(() => {
    const progress = total > 0 ? (current / total) * 100 : 0;
    widthVal.value = withSpring(progress, { damping: 15, stiffness: 100 });
  }, [current, total]);

  const fillStyle = useAnimatedStyle(() => {
    return {
      width: `${widthVal.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
  },
  track: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
});
