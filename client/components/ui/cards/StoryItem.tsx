import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface StoryItemProps {
  name: string;
  avatar: string;
  isAdd?: boolean;
  onPress?: () => void;
}

export function StoryItem({
  name,
  avatar,
  isAdd = false,
  onPress,
}: StoryItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.avatarContainer,
          {
            backgroundColor: isAdd
              ? colors.tint
              : colorScheme === "dark"
                ? "#1e293b"
                : "#f8fafc",
            borderColor: isAdd
              ? colors.tint
              : colorScheme === "dark"
                ? "#334155"
                : "#e2e8f0",
          },
        ]}
      >
        {isAdd ? (
          <Ionicons name="add" size={24} color="#ffffff" />
        ) : (
          <Text style={styles.avatarText}>{avatar}</Text>
        )}
      </View>
      <ThemedText
        style={[styles.name, { color: colors.text }]}
        numberOfLines={1}
      >
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 16,
    width: 70,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 2,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 4,
  },
  avatarText: {
    fontSize: 24,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
