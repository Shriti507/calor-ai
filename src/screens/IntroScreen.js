//Welcome/onboarding screen 
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/common/Background";
import GlassCard from "../components/common/GlassCard";
import GlassButton from "../components/common/GlassButton";
import { COLORS, SIZES, FONTS } from "../constants/theme";

export default function IntroScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Design Your Food Plan</Text>

        {/* Main Glass Card */}
        <View style={styles.cardWrapper}>
          <GlassCard style={styles.mainCard}>
            {/* Emoji */}
            <Text style={styles.emoji}>😋</Text>

            {/* Card Title */}
            <Text style={styles.cardTitle}>Build Your Taste Profile</Text>

            {/* Description */}
            <Text style={styles.description}>
              Swipe right on foods you love, left on foods you don't.
            </Text>

            <Text style={styles.subDescription}>
              This helps us recommend meals you'll love eating.
            </Text>

            {/* CTA Button */}
            <GlassButton
              title="Start Swiping"
              onPress={() => navigation.navigate("Swipe")}
              variant="primary"
              style={styles.ctaButton}
            />

            {/* Time hint */}
            <Text style={styles.timeHint}>Takes about 2 minutes.</Text>
          </GlassCard>
        </View>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.md,
  },
  backArrow: {
    color: COLORS.textPrimary,
    fontSize: 28,
    lineHeight: 32,
    marginTop: -2,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.h1,
    ...FONTS.bold,
    marginBottom: SIZES.xl,
  },
  cardWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  mainCard: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: SIZES.lg,
  },
  emoji: {
    fontSize: 56,
    marginBottom: SIZES.lg,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: SIZES.h2,
    ...FONTS.bold,
    marginBottom: SIZES.lg,
    textAlign: "center",
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: SIZES.md,
    paddingHorizontal: SIZES.md,
  },
  subDescription: {
    color: COLORS.textTertiary,
    fontSize: SIZES.caption,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: SIZES.xl,
  },
  ctaButton: {
    minWidth: 200,
    marginBottom: SIZES.md,
  },
  timeHint: {
    color: COLORS.textTertiary,
    fontSize: SIZES.small,
    textAlign: "center",
  },
});