import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES } from "../../constants/theme";

export default function GlassCard({
  children,
  style,
  intensity = 20,
  borderRadius = 20,
}) {
  const flatStyle = StyleSheet.flatten(style) || {};
  const {
    padding,
    paddingVertical,
    paddingHorizontal,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    borderRadius: styleBorderRadius,
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    flexWrap,
    borderWidth,
    borderColor,
    borderStyle,
    ...wrapperStyle
  } = flatStyle;

  const activeBorderRadius = styleBorderRadius !== undefined ? styleBorderRadius : borderRadius;
  const innerRadius = Math.max(0, activeBorderRadius - 1);

  const cardPaddingStyle = {};
  if (padding !== undefined) cardPaddingStyle.padding = padding;
  if (paddingVertical !== undefined) cardPaddingStyle.paddingVertical = paddingVertical;
  if (paddingHorizontal !== undefined) cardPaddingStyle.paddingHorizontal = paddingHorizontal;
  if (paddingTop !== undefined) cardPaddingStyle.paddingTop = paddingTop;
  if (paddingBottom !== undefined) cardPaddingStyle.paddingBottom = paddingBottom;
  if (paddingLeft !== undefined) cardPaddingStyle.paddingLeft = paddingLeft;
  if (paddingRight !== undefined) cardPaddingStyle.paddingRight = paddingRight;

  const cardLayoutStyle = {};
  if (flexDirection !== undefined) cardLayoutStyle.flexDirection = flexDirection;
  if (justifyContent !== undefined) cardLayoutStyle.justifyContent = justifyContent;
  if (alignItems !== undefined) cardLayoutStyle.alignItems = alignItems;
  if (alignContent !== undefined) cardLayoutStyle.alignContent = alignContent;
  if (flexWrap !== undefined) cardLayoutStyle.flexWrap = flexWrap;

  const hasHeightConstraint =
    wrapperStyle.height !== undefined ||
    wrapperStyle.minHeight !== undefined ||
    wrapperStyle.flex !== undefined ||
    wrapperStyle.flexGrow !== undefined;

  return (
    <LinearGradient
      colors={[
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.12)",
        "rgba(255, 255, 255, 0.04)",
        "rgba(255, 255, 255, 0.01)",
      ]}
      locations={[0, 0.3, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.wrapper, { borderRadius: activeBorderRadius }, wrapperStyle]}
    >
      <View
        style={[
          styles.card,
          { borderRadius: innerRadius },
          hasHeightConstraint && styles.flexGrow,
          cardPaddingStyle,
          cardLayoutStyle,
        ]}
      >
        {Platform.OS === "ios" && (
          <BlurView
            intensity={intensity}
            tint="dark"
            style={[StyleSheet.absoluteFill, { borderRadius: innerRadius }]}
          />
        )}
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 1,
    alignItems: "stretch",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  card: {
    backgroundColor: "#0e1a16",
    overflow: "hidden",
    padding: SIZES.cardPadding,
    width: "100%",
  },
  flexGrow: {
    flexGrow: 1,
  },
});
