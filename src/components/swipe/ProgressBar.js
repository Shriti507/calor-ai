// ProgressBar.js — Green progress bar at top of swipe screen
import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default function ProgressBar({ current, total }) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
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
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});
