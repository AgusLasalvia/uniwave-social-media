import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";

export function SkeletonEventCard() {
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
          borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.imageSkeleton} />
      <View style={styles.content}>
        <View style={styles.titleSkeleton} />
        <View style={styles.descriptionSkeleton} />
        <View style={styles.detailsRow}>
          <View style={styles.detailSkeleton} />
          <View style={styles.detailSkeleton} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 16,
    overflow: "hidden",
  },
  imageSkeleton: {
    width: "100%",
    height: 120,
    backgroundColor: "#e2e8f0",
  },
  content: {
    padding: 16,
  },
  titleSkeleton: {
    width: "80%",
    height: 16,
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
    marginBottom: 8,
  },
  descriptionSkeleton: {
    width: "100%",
    height: 12,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailSkeleton: {
    width: "40%",
    height: 10,
    backgroundColor: "#e2e8f0",
    borderRadius: 5,
  },
});
