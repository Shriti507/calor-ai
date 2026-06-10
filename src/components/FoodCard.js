import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import GlassCard from "./common/GlassCard";
import { COLORS, SIZES, FONTS } from "../constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48;

export default function FoodCard({ food, style }) {
  return (
    <GlassCard style={[styles.card, style]}>
      <View style={styles.imageContainer}>
        {food.image ? (
          <Image
            source={{ uri: food.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderEmoji}>🍽️</Text>
          </View>
        )}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{food.category}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{food.name}</Text>
        
        {food.tags && food.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {food.tags.map((tag, idx) => (
              <View key={idx} style={styles.tagBadge}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    minHeight: 400,
  },
  imageContainer: {
    width: "100%",
    height: 220,
    borderRadius: SIZES.radiusLg,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
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
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(10, 10, 10, 0.75)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    ...FONTS.bold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  details: {
    marginTop: SIZES.md,
    alignItems: "center",
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: SIZES.h2,
    ...FONTS.bold,
    textAlign: "center",
    marginBottom: SIZES.sm,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginTop: SIZES.xs,
  },
  tagBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  tagText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
    ...FONTS.medium,
  },
});
