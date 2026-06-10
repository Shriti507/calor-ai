import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants/theme";

export default function SwipeButtons({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}) {
  return (
    <View style={styles.container}>
      {/* Swipe Left Button */}
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonLarge, styles.dislikeButton]}
            onPress={onSwipeLeft}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Swipe Left</Text>
      </View>

      {/* Not Sure Button */}
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSmall, styles.notSureButton]}
            onPress={onSwipeDown}
            activeOpacity={0.8}
          >
            <Text style={styles.faqText}>?</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Not Sure</Text>
      </View>

      {/* Super Like Button */}
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSmall, styles.superLikeButton]}
            onPress={onSwipeUp}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#A855F7", "#06B6D4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFillObject, { borderRadius: 28 }]}
            />
            <Ionicons name="star" size={22} color="#E0F2FE" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Super Like</Text>
      </View>

      {/* Swipe Right Button */}
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonLarge, styles.likeButton]}
            onPress={onSwipeRight}
            activeOpacity={0.8}
          >
            <Ionicons name="heart" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Swipe Right</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  buttonWrapper: {
    alignItems: "center",
  },
  buttonContainer: {
    height: 76,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLarge: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  buttonSmall: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  dislikeButton: {
    backgroundColor: "#EF4444",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 8,
  },
  likeButton: {
    backgroundColor: "#22C55E",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 8,
  },
  notSureButton: {
    backgroundColor: "#737373",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  superLikeButton: {
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 6,
  },
  faqText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
  label: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 11,
    ...FONTS.medium,
    marginTop: 8,
    textAlign: "center",
  },
});
