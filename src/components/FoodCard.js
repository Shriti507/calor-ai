import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import GlassCard from "./common/GlassCard";
import { COLORS, SIZES, FONTS } from "../constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48;

export default function FoodCard({ food, style }) {
  return (
    <GlassCard style={[styles.card, style]}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {food.image ? (
            <Image
              source={{ uri: food.image }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={[styles.image, styles.placeholder]}>
              <Text style={styles.placeholderEmoji}>🍽️</Text>
            </View>
          )}
        </View>

        <Text style={styles.name}>I love eating {food.name.toLowerCase()}</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.xl,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.15)",
    marginBottom: SIZES.xl,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  placeholderEmoji: {
    fontSize: 48,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: 24,
    ...FONTS.bold,
    textAlign: "center",
    lineHeight: 32,
  },
});
