// GlassCard.js — Frosted-glass card with expo-blur + Android fallback
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";

export default function GlassCard({ children, style, intensity = 20 }) {
  if (Platform.OS === "ios") {
    return (
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[styles.card, style]}
      >
        <View style={styles.innerOverlay}>{children}</View>
      </BlurView>
    );
  }

  // Android fallback — semi-transparent dark layer (no blur support)
  return (
    <View style={[styles.card, styles.androidFallback, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    ...SHADOWS.card,
  },
  innerOverlay: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: SIZES.cardPadding,
  },
  androidFallback: {
    backgroundColor: "rgba(22, 25, 28, 0.92)",
    padding: SIZES.cardPadding,
  },
});
