import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface SolidButtonProps {
  title: string;
  onPress: () => void;
  colors?: string[]; // Ahora será simplemente el primer color
  style?: any;
  textStyle?: any;
  activeOpacity?: number;
}

export function SolidButton({
  title,
  onPress,
  colors,
  style,
  textStyle,
  activeOpacity = 0.8,
}: SolidButtonProps) {
  const colorScheme = useColorScheme();
  const colorsTheme = Colors[colorScheme ?? "light"];

  // Usamos solo el primer color como color de fondo
  const defaultColor = colors?.[0] || colorsTheme.tint;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: defaultColor }, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <ThemedText style={[styles.buttonText, textStyle]}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    // Quitar `boxShadow` que no es válido en React Native
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
