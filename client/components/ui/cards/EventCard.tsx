import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
  onPress?: () => void;
}

export function EventCard({
  title,
  description,
  date,
  time,
  location,
  attendees,
  image,
  category,
  onPress,
}: EventCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
          borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Text style={styles.imageText}>{image}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText
            style={[styles.title, { color: colors.text }]}
            numberOfLines={2}
          >
            {title}
          </ThemedText>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons name="bookmark-outline" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <ThemedText
          style={[styles.description, { color: colors.icon }]}
          numberOfLines={2}
        >
          {description}
        </ThemedText>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={colors.icon} />
            <ThemedText style={[styles.detailText, { color: colors.icon }]}>
              {date} • {time}
            </ThemedText>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color={colors.icon} />
            <ThemedText
              style={[styles.detailText, { color: colors.icon }]}
              numberOfLines={1}
            >
              {location}
            </ThemedText>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color={colors.icon} />
            <ThemedText style={[styles.detailText, { color: colors.icon }]}>
              {attendees} asistentes
            </ThemedText>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={[styles.category, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.categoryText}>{category}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 16,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    elevation: 2,
  },
  imageContainer: {
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: 48,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  bookmarkButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    gap: 6,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    flex: 1,
  },
  footer: {
    alignItems: "flex-start",
  },
  category: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
});
