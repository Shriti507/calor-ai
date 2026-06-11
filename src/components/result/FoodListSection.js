import React from "react";
import { StyleSheet, View, Text } from "react-native";
import GlassCard from "../common/GlassCard";
import { FONTS } from "../../constants/theme";

export default function FoodListSection({
  title,
  subtitle,
  foods,
  emptyMessage,
  icon,
  ListItemComponent,
}) {
  return (
    <GlassCard style={{ padding: 0 }}>
      <View style={styles.listCardInner}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            <Text style={styles.emojiText}>{icon}</Text> {title}
          </Text>
          <Text style={styles.cardSub}>{subtitle}</Text>
        </View>
        {foods.length > 0 ? (
          foods.map((food, idx) => (
            <ListItemComponent
              key={food.id}
              food={food}
              isLast={idx === foods.length - 1}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  listCardInner: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  cardHeader: {
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#3d3d3d",
  },
  cardTitle: {
    fontSize: 15,
    ...FONTS.semiBold,
    color: "#f0f0f0",
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  emojiText: {
    marginRight: 6,
  },
  cardSub: {
    fontSize: 12,
    color: "#888",
  },
  emptyText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 24,
  },
});
