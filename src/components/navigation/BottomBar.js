import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "../../constants/theme";

const leftTabs = [
  { key: "Start", label: "Start" },
  { key: "FAQ", label: "FAQ" },
  { key: "TasteProfile", label: "Taste Profile" },
];

function renderTabIcon(tab, isActive) {
  const color = isActive ? COLORS.primary : COLORS.tabInactive;
  const size = 24;

  if (tab.key === "FAQ") {
    return (
      <Text style={[styles.faqText, { color }]}>?</Text>
    );
  }

  if (tab.key === "Start") {
    return (
      <Ionicons
        name={isActive ? "home" : "home-outline"}
        size={size}
        color={color}
      />
    );
  }

  if (tab.key === "TasteProfile") {
    return (
      <MaterialCommunityIcons
        name="carrot"
        size={size}
        color={color}
        style={{ transform: [{ rotate: "-45deg" }] }}
      />
    );
  }

  return null;
}

export default function BottomBar({ activeTab = "Start", onTabPress }) {
  return (
    <View style={styles.outerContainer}>
      {/* Left Capsule Menu */}
      <View style={styles.capsuleContainer}>
        {Platform.OS === "ios" && (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        )}
        <View style={[StyleSheet.absoluteFill, styles.overlay]} />
        
        <View style={styles.tabsRow}>
          {leftTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => onTabPress(tab.key)}
                activeOpacity={0.7}
              >
                {renderTabIcon(tab, isActive)}
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Right Search Button */}
      <TouchableOpacity
        style={styles.searchCircle}
        onPress={() => onTabPress("Search")}
        activeOpacity={0.7}
      >
        {Platform.OS === "ios" && (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        )}
        <View style={[StyleSheet.absoluteFill, styles.overlay]} />
        <Ionicons name="search" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 34 : 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  capsuleContainer: {
    flex: 1,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    marginRight: 12,
    justifyContent: "center",
    backgroundColor: Platform.OS === "android" ? "rgba(22, 25, 28, 0.92)" : "transparent",
  },
  searchCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "android" ? "rgba(22, 25, 28, 0.92)" : "transparent",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    height: "100%",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    height: 52,
    borderRadius: 26,
    minWidth: 75,
  },
  tabActive: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  faqText: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 24,
  },
  tabLabel: {
    color: COLORS.tabInactive,
    fontSize: 11,
    ...FONTS.medium,
    marginTop: 2,
  },
  tabLabelActive: {
    color: COLORS.tabActive,
  },
});
