import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface DateInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: any;
  maximumDate?: Date;
  minimumDate?: Date;
  display?: "default" | "spinner" | "calendar" | "clock";
  mode?: "date" | "time" | "datetime";
  locale?: string;
  disabled?: boolean;
  theme?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    borderColor?: string;
    placeholderColor?: string;
  };
}

export function DateInput({
  placeholder = "Seleccionar fecha",
  value,
  onChangeText,
  icon = "calendar",
  style,
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
  display = Platform.OS === "ios" ? "spinner" : "default",
  mode = "date",
  locale = "es-ES",
  disabled = false,
  theme,
}: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const customTheme = {
    backgroundColor:
      theme?.backgroundColor ||
      (colorScheme === "dark" ? "#1e293b" : "#f8fafc"),
    textColor: theme?.textColor || colors.text,
    accentColor: theme?.accentColor || colors.tint,
    borderColor:
      theme?.borderColor || (colorScheme === "dark" ? "#334155" : "#e2e8f0"),
    placeholderColor: theme?.placeholderColor || colors.icon,
  };

  // Convertir string a Date para el picker
  const getDateValue = () => {
    if (!value) return new Date();
    // Crear la fecha en la zona horaria local para evitar problemas de UTC
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day); // month - 1 porque los meses van de 0-11
  };

  // Formatear fecha para mostrar
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    // Crear la fecha en la zona horaria local
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate && event.type !== "dismissed") {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      onChangeText(formattedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.input,
          {
            backgroundColor: customTheme.backgroundColor,
            borderColor: customTheme.borderColor,
          },
        ]}
        onPress={showDatePicker}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color={customTheme.accentColor} />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              {
                color: value
                  ? customTheme.textColor
                  : customTheme.placeholderColor,
              },
            ]}
          >
            {value ? formatDisplayDate(value) : placeholder}
          </Text>
        </View>

        <View style={styles.arrowContainer}>
          <Ionicons
            name="chevron-down"
            size={16}
            color={customTheme.placeholderColor}
          />
        </View>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={getDateValue()}
          mode={mode}
          display={display}
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          locale={locale}
          textColor={customTheme.textColor}
          accentColor={customTheme.accentColor}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
    overflow: "hidden",
    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Elevación para Android
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
    width: 24,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  arrowContainer: {
    marginLeft: 8,
  },
});
