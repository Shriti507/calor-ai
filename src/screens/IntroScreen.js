import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/common/Background";
import GlassCard from "../components/common/GlassCard";
import { useSwipeContext } from "../context/SwipeContext";
import { COLORS, SIZES, FONTS } from "../constants/theme";

const { width, height } = Dimensions.get("window");

export default function DesignFoodPlanScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { dispatch } = useSwipeContext();
  const cardHeight = Math.min(540, Math.max(400, height - 280));

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
        {/* Header */}
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Design Your Food Plan</Text>

        {/* Card */}
        <GlassCard style={[styles.card, { minHeight: cardHeight }]}>
          {/* Emoji */}
          <Text style={styles.emoji}>😋</Text>

          {/* Card Title */}
          <Text style={styles.cardTitle}>Build Your Taste Profile</Text>

          {/* Primary Description */}
          <Text style={styles.cardDescription}>
            Swipe right on foods you love, left on foods you don't.
          </Text>

          {/* Secondary Description */}
          <Text style={styles.cardSubDescription}>
            This helps us recommend meals you'll love eating.
          </Text>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={() => {
              dispatch({ type: "RESET" });
              navigation && navigation.navigate("Swipe");
            }}
          >
            <Text style={styles.ctaText}>Start Swiping</Text>
          </TouchableOpacity>

          {/* Caption */}
          <Text style={styles.caption}>Takes about 2 minutes.</Text>
        </GlassCard>

        <View style={{ height: 100 }} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  backArrow: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "400",
    marginTop: -2,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 30,
    ...FONTS.bold,
    letterSpacing: -0.3,
    textAlign: "center",
    marginBottom: 50,
  },
  card: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 28,
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 28,
    lineHeight: 72,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 26,
    ...FONTS.bold,
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: -0.2,
  },
  cardDescription: {
    color: COLORS.textSecondary,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  cardSubDescription: {
    color: COLORS.textTertiary,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 36,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingVertical: 16,
    paddingHorizontal: 52,
    marginBottom: 18,
  },
  ctaText: {
    color: "#0a1a0f",
    fontSize: 19,
    ...FONTS.bold,
    letterSpacing: 0.2,
  },
  caption: {
    color: COLORS.textTertiary,
    fontSize: 15,
    textAlign: "center",
  },
});
