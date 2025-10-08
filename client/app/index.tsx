import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  // Divider,
  FormInput,
  SolidButton,
  RegisterModal,
  // SocialButton,
  ThemedText,
} from "@/components";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { initialLoginForm, RegisterForm, UserLoginForm } from "@/core/User";
import { useColorScheme } from "@/hooks/useColorScheme";
import { authService } from "@/services/authService";

export default function LoginScreen() {
  //*******************************************	*/
  // State and Hooks
  //*******************************************	*/

  // if not authenticated, render all login screen
  const [form, setForm] = useState<UserLoginForm>(initialLoginForm);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  //*******************************************	*/
  // Handlers for Login and Register actions
  //*******************************************	*/

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      await authService.login(form);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleRegister = async (registerData: RegisterForm) => {
    try {
      const register = await authService.register(registerData);
      if (register) {
        setShowRegisterModal(false);
        Alert.alert("Éxito", "Usuario registrado exitosamente");
      } else {
        Alert.alert(
          "Error",
          "No se pudo registrar el usuario. Por favor, inténtalo de nuevo más tarde.",
        );
      }
    } catch (error: any) {
      throw error;
    }
  };

  //*******************************************	*/
  // Render the Login Screen
  //*******************************************	*/
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#0f172a" : "#ffffff" },
      ]}
    >
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["#0f172a", "#1e293b", "#334155"]
            : ["#ffffff", "#f1f5f9", "#e2e8f0"]
        }
        style={styles.gradient}
      >
        <SafeAreaView
          style={styles.safeArea}
          edges={["bottom", "left", "right"]}
        >
          <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Header Section */}
              <View style={styles.header}>
                <View
                  style={[
                    styles.logoContainer,
                    { backgroundColor: colors.tint },
                  ]}
                >
                  <Ionicons name="school" size={40} color="#ffffff" />
                </View>
                <ThemedText style={styles.title}>UniWave</ThemedText>
                <ThemedText style={styles.subtitle}>
                  Conecta con tu comunidad universitaria
                </ThemedText>
              </View>

              {/* Form Section */}
              <View style={styles.formContainer}>
                {/* Email Input */}
                <FormInput
                  placeholder="Correo universitario"
                  value={form.email}
                  onChangeText={(value) => setForm({ ...form, email: value })}
                  icon="mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.inputWrapper}
                />

                {/* Password Input */}
                <FormInput
                  placeholder="Contraseña"
                  value={form.password}
                  onChangeText={(value) =>
                    setForm({ ...form, password: value })
                  }
                  icon="lock-closed"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  style={styles.inputWrapper}
                />

                {/* Login Button */}
                <SolidButton
                  title="Iniciar Sesión"
                  onPress={handleLogin}
                  style={styles.loginButton}
                />

                {/* ***************************************************** */}
                {/* This components is for google Oauth integration */}
                {/* Divider */}
                {/* <Divider /> */}

                {/* Google Login Button */}
                {/* <SocialButton
									title="Google"
									onPress={handleGoogleLogin}
									icon="logo-google"
									iconColor="#DB4437"
									style={styles.googleButton}
								/> */}
                {/* ***************************************************** */}

                {/* Register Link */}
                <View style={styles.registerLinkContainer}>
                  <ThemedText
                    style={[styles.registerLinkText, { color: colors.icon }]}
                  >
                    ¿No tienes una cuenta?{" "}
                  </ThemedText>
                  <TouchableOpacity onPress={() => setShowRegisterModal(true)}>
                    <ThemedText
                      style={[styles.registerLink, { color: colors.tint }]}
                    >
                      Regístrate
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>

      {/* Register Modal */}
      <RegisterModal
        visible={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 22,
  },
  redirectText: {
    fontSize: 14,
    marginTop: 16,
    fontStyle: "italic",
  },
  formContainer: {
    gap: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  googleButton: {
    marginTop: 0,
  },
  registerLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  registerLinkText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
