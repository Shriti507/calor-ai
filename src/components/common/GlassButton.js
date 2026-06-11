
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../../constants/theme";

export default function GlassButton({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
}) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.glass,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isPrimary ? styles.primaryText : styles.glassText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: SIZES.radiusFull,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.button,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  glass: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  text: {
    fontSize: SIZES.body,
    ...FONTS.semiBold,
  },
  primaryText: {
    color: "#0A0A0A",
  },
  glassText: {
    color: COLORS.textPrimary,
  },
});
