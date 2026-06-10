
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../../constants/theme";

const buttons = [
  { key: "dislike", icon: "✕", label: "Swipe Left", color: COLORS.dislike },
  { key: "notSure", icon: "?", label: "Not Sure", color: COLORS.notSure },
  { key: "superLike", icon: "★", label: "Super Like", color: COLORS.superLike },
  { key: "like", icon: "♥", label: "Swipe Right", color: COLORS.like },
];

export default function SwipeButtons({ onSwipeLeft, onSwipeDown, onSwipeUp, onSwipeRight }) {
  const handlers = {
    dislike: onSwipeLeft,
    notSure: onSwipeDown,
    superLike: onSwipeUp,
    like: onSwipeRight,
  };

  return (
    <View style={styles.container}>
      {buttons.map((btn) => (
        <TouchableOpacity
          key={btn.key}
          style={[styles.button, { backgroundColor: btn.color }]}
          onPress={handlers[btn.key]}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>{btn.icon}</Text>
          <Text style={styles.label}>{btn.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.md,
  },
  button: {
    width: SIZES.actionButtonSize,
    height: SIZES.actionButtonSize,
    borderRadius: SIZES.actionButtonRadius,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.button,
  },
  icon: {
    color: "#FFFFFF",
    fontSize: 24,
    ...FONTS.bold,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 10,
    ...FONTS.medium,
    marginTop: 4,
    position: "absolute",
    bottom: -20,
    width: 80,
    textAlign: "center",
  },
});
