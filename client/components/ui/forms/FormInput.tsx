import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  style?: any;
  editable?: boolean;
}

export function FormInput({
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  style,
  editable = true,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const isPassword = secureTextEntry;
  const shouldShowEyeIcon = isPassword;

  return (
    <View style={[styles.inputContainer, style]}>
      <Ionicons
        name={icon}
        size={20}
        color={colors.tint}
        style={styles.inputIcon}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
            borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.icon}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword ? !showPassword : false}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        editable={editable}
      />
      {shouldShowEyeIcon && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={colors.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Elevación para Android
    elevation: 2,
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    top: 16,
    zIndex: 1,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 48,
    fontSize: 16,
    fontWeight: "500",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 1,
    padding: 4,
  },
});
