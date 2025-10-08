import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";

interface SkeletonCardProps {
  width?: number;
  height?: number;
  style?: any;
}

export function SkeletonCard({
  width = 120,
  height = 140,
  style,
}: SkeletonCardProps) {
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
          width,
          height,
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
          borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
          opacity: fadeAnim,
        },
        style,
      ]}
    >
      <View style={styles.iconSkeleton} />
      <View style={styles.contentSkeleton}>
        <View style={styles.titleSkeleton} />
        <View style={styles.subtitleSkeleton} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 16,
    padding: 16,
    alignItems: "center",
  },
  iconSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e2e8f0",
    marginBottom: 12,
  },
  contentSkeleton: {
    alignItems: "center",
    width: "100%",
  },
  titleSkeleton: {
    width: "80%",
    height: 12,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
    marginBottom: 8,
  },
  subtitleSkeleton: {
    width: "60%",
    height: 10,
    backgroundColor: "#e2e8f0",
    borderRadius: 5,
  },
});
