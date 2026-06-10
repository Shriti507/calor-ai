
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { COLORS, SIZES, FONTS, SHADOWS } from "../../constants/theme";

const tabs = [
  { key: "Start", icon: "🏠", label: "Start" },
  { key: "FAQ", icon: "❓", label: "FAQ" },
  { key: "TasteProfile", icon: "🥕", label: "Taste Profile" },
  { key: "Search", icon: "🔍", label: "" },
];

function BarContent({ activeTab, onTabPress }) {
  return (
    <View style={styles.tabsRow}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            {tab.label ? (
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
              >
                {tab.label}
              </Text>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomBar({ activeTab = "Start", onTabPress }) {
  if (Platform.OS === "ios") {
    return (
      <BlurView intensity={40} tint="dark" style={styles.container}>
        <BarContent activeTab={activeTab} onTabPress={onTabPress} />
      </BlurView>
    );
  }

  // Android fallback
  return (
    <View style={[styles.container, styles.androidFallback]}>
      <BarContent activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
    ...SHADOWS.button,
  },
  androidFallback: {
    backgroundColor: "rgba(14, 14, 16, 0.95)",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    paddingHorizontal: SIZES.md,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusMd,
    minWidth: 60,
  },
  tabActive: {
    backgroundColor: "rgba(74, 222, 128, 0.1)",
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    color: COLORS.tabInactive,
    fontSize: 10,
    ...FONTS.medium,
  },
  tabLabelActive: {
    color: COLORS.tabActive,
  },
});
