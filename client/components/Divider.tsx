import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface DividerProps {
  text?: string;
  style?: any;
}

export function Divider({ text = "o continúa con", style }: DividerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, { backgroundColor: colors.icon }]} />
      <ThemedText style={[styles.text, { color: colors.icon }]}>
        {text}
      </ThemedText>
      <View style={[styles.line, { backgroundColor: colors.icon }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    opacity: 0.3,
  },
  text: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
  },
});
