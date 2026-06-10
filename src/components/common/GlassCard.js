import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";

export default function GlassCard({ children, style, intensity = 20 }) {
  if (Platform.OS === "ios") {
    return (
      <View style={[styles.card, styles.defaultPadding, style]}>
        <BlurView
          intensity={intensity}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
        <View style={[StyleSheet.absoluteFill, styles.overlay]} />
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.card, styles.androidFallback, styles.defaultPadding, style]}>
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
  defaultPadding: {
    padding: SIZES.cardPadding,
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  androidFallback: {
    backgroundColor: "rgba(22, 25, 28, 0.92)",
  },
});
