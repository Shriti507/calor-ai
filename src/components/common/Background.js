import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Background({ children, style }) {
  return (
    <View style={[styles.container, style]}>

      <View style={[StyleSheet.absoluteFill, styles.baseBg]} />

      <LinearGradient
        colors={["rgba(8, 12, 12, 0.70)", "transparent"]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1.0, y: 1.0 }}
        style={StyleSheet.absoluteFillObject}
      />

     
      <LinearGradient
        colors={["rgba(10, 58, 74, 0.60)", "transparent"]}
        start={{ x: 0.0, y: 0.15 }}
        end={{ x: 0.55, y: 0.60 }}
        style={StyleSheet.absoluteFillObject}
      />

      <LinearGradient
        colors={["rgba(13, 61, 42, 0.56)", "transparent"]}
        start={{ x: 1.0, y: 0.50 }}
        end={{ x: 0.72, y: 0.50 }}
        style={StyleSheet.absoluteFillObject}
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080c0c",
    overflow: "hidden",
  },
  baseBg: {
    backgroundColor: "#080c0c",
  },
});
