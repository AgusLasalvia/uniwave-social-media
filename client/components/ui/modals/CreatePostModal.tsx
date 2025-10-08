import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SolidButton } from "@/components";
import { Colors } from "@/constants/Colors";
import { UserProfile } from "@/core/User";
import { useColorScheme } from "@/hooks/useColorScheme";
import { userService } from "@/services/userService";

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export function CreatePostModal({
  visible,
  onClose,
  onCreate,
}: CreatePostModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("public"); // public, friends, private
  const [imageUrl, setImageUrl] = useState("");
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await userService.getUserProfile();
        if (profile) {
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [visible]); // Fetch user profile when modal opens or closes

  const handleCreate = async () => {
    if (!content.trim()) {
      Alert.alert("Por favor escribe algo para tu publicación");
      return;
    }

    const formData = new FormData();
    formData.append("content", content.trim());
    formData.append("privacy", privacy);
    formData.append("timestamp", new Date().toISOString());

    if (pickedImage) {
      formData.append("image", {
        uri: pickedImage,
        type: "image/jpeg",
        name: "photo.jpg",
      } as any);
    }

    onCreate(formData); // tu función hará axios/fetch con multipart/form-data
    handleClose();
  };

  const handleClose = () => {
    setContent("");
    setPrivacy("public");
    setImageUrl("");
    setPickedImage(null);
    onClose();
  };

  const pickImage = async () => {
    setPicking(true);
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Se requiere permiso para acceder a la galería.");
        setPicking(false);
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPickedImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Error al seleccionar la imagen.");
    } finally {
      setPicking(false);
    }
  };

  const removeImage = () => {
    setPickedImage(null);
  };

  const PrivacyOption = ({
    value,
    label,
    icon,
  }: {
    value: string;
    label: string;
    icon: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.privacyOption,
        {
          backgroundColor:
            privacy === value
              ? colors.tint
              : colorScheme === "dark"
                ? "#1e293b"
                : "#f8fafc",
          borderColor: privacy === value ? colors.tint : colors.icon,
        },
      ]}
      onPress={() => setPrivacy(value)}
    >
      <Text style={styles.privacyIcon}>{icon}</Text>
      <Text
        style={[
          styles.privacyLabel,
          { color: privacy === value ? "#ffffff" : colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "#0f172a" : "#ffffff" },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Crear Publicación
          </Text>
          <TouchableOpacity onPress={handleCreate} style={styles.createButton}>
            <Text style={[styles.createButtonText, { color: colors.tint }]}>
              Publicar
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#334155" : "#f8fafc",
                },
              ]}
            >
              <Text style={styles.avatarText}>🎨</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {userProfile?.username}
              </Text>
              {/* <Text style={[styles.userUniversity, { color: colors.icon }]}>
								Universidad de Artes y Humanidades
							</Text> */}
            </View>
          </View>

          {/* Content Input */}
          <View style={styles.contentSection}>
            <TextInput
              style={[
                styles.contentInput,
                {
                  color: colors.text,
                  backgroundColor:
                    colorScheme === "dark" ? "#1e293b" : "#f8fafc",
                  borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
                },
              ]}
              placeholder="¿Qué quieres compartir con tu comunidad universitaria?"
              placeholderTextColor={colors.icon}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>

          {/* Image Picker & URL Input */}
          <View style={styles.imageSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Imagen (opcional)
            </Text>
            <View style={styles.imagePickerRow}>
              <TouchableOpacity
                style={[styles.imagePickerButton, { borderColor: colors.tint }]}
                onPress={pickImage}
                disabled={picking}
              >
                <Ionicons name="images-outline" size={20} color={colors.tint} />
                <Text style={[styles.imagePickerText, { color: colors.tint }]}>
                  Elegir de galería
                </Text>
              </TouchableOpacity>
              {pickedImage && (
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={removeImage}
                >
                  <Ionicons name="close-circle" size={20} color={colors.icon} />
                </TouchableOpacity>
              )}
            </View>
            {pickedImage && (
              <View style={styles.imagePreviewContainer}>
                <Image
                  source={{ uri: pickedImage }}
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
              </View>
            )}
            <Text style={[styles.sectionSubtitle, { color: colors.icon }]}>
              o ingresa una URL:
            </Text>
            <View
              style={[
                styles.imageInputContainer,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#1e293b" : "#f8fafc",
                  borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
                },
              ]}
            >
              <Ionicons
                name="image-outline"
                size={20}
                color={colors.icon}
                style={styles.imageIcon}
              />
              <TextInput
                style={[styles.imageInput, { color: colors.text }]}
                placeholder="URL de la imagen..."
                placeholderTextColor={colors.icon}
                value={imageUrl}
                onChangeText={setImageUrl}
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Privacy Settings */}
          <View style={styles.privacySection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Privacidad
            </Text>
            <View style={styles.privacyOptions}>
              <PrivacyOption value="public" label="Público" icon="🌍" />
              <PrivacyOption value="friends" label="Amigos" icon="👥" />
              <PrivacyOption value="private" label="Privado" icon="🔒" />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: colors.icon }]}
              onPress={handleClose}
            >
              <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <SolidButton
              title="Crear Publicación"
              onPress={handleCreate}
              style={styles.createPostButton}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  createButton: {
    padding: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  userUniversity: {
    fontSize: 14,
  },
  contentSection: {
    marginBottom: 24,
  },
  contentInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    fontSize: 16,
    lineHeight: 24,
  },
  imageSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 13,
    marginBottom: 8,
  },
  imagePickerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 4,
  },
  imagePickerText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  removeImageButton: {
    marginLeft: 4,
  },
  imagePreviewContainer: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  imagePreview: {
    width: 180,
    height: 120,
    borderRadius: 12,
    resizeMode: "cover",
  },
  imageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  imageIcon: {
    marginRight: 12,
  },
  imageInput: {
    flex: 1,
    fontSize: 16,
  },
  privacySection: {
    marginBottom: 24,
  },
  privacyOptions: {
    flexDirection: "row",
    gap: 12,
  },
  privacyOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  privacyIcon: {
    fontSize: 16,
  },
  privacyLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  createPostButton: {
    flex: 1,
  },
});
