import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function BorderCard({ children, style, innerStyle, intensity = 20 }) {
  return (
    <LinearGradient
      colors={["#555", "transparent", "#555", "transparent", "#555"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientBorder, style]}
    >
      <View style={[styles.innerCard, innerStyle]}>
        {Platform.OS === "ios" && (
          <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
        )}
        <View style={[StyleSheet.absoluteFill, styles.overlay]} />
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 18,
    padding: 1.5,
  },
  innerCard: {
    backgroundColor: Platform.OS === "ios" ? "rgba(255, 255, 255, 0.02)" : "rgba(22, 25, 28, 0.7)",
    borderRadius: 17,
    overflow: "hidden",
    padding: 24,
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
});
