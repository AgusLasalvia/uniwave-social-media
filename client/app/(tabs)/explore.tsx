import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  CategoryCard,
  EventCard,
  SearchBar,
  SkeletonCard,
  SkeletonEventCard,
  ThemedText,
} from "@/components";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Mock data for categories
const categories = [
  { id: 1, name: "Eventos", icon: "🎉", color: "#FF6B6B", count: 12 },
  { id: 2, name: "Grupos de Estudio", icon: "📚", color: "#4ECDC4", count: 8 },
  { id: 3, name: "Clubes", icon: "🏆", color: "#45B7D1", count: 15 },
  { id: 4, name: "Tutorías", icon: "👨‍🏫", color: "#96CEB4", count: 6 },
  { id: 5, name: "Hackathons", icon: "💻", color: "#FFEAA7", count: 3 },
  { id: 6, name: "Conferencias", icon: "🎤", color: "#DDA0DD", count: 9 },
];

// Mock data for trending events
const trendingEvents = [
  {
    id: 1,
    title: "Hackathon Universitario 2024",
    description: "48 horas de programación y innovación",
    date: "15-17 Mar",
    time: "9:00 AM",
    location: "Auditorio Principal",
    attendees: 156,
    image: "💻",
    category: "Hackathons",
  },
  {
    id: 2,
    title: "Conferencia de IA y Machine Learning",
    description: "Descubre las últimas tendencias en IA",
    date: "22 Mar",
    time: "2:00 PM",
    location: "Sala de Conferencias",
    attendees: 89,
    image: "🤖",
    category: "Conferencias",
  },
  {
    id: 3,
    title: "Grupo de Estudio: Matemáticas Avanzadas",
    description: "Sesión de repaso para exámenes finales",
    date: "20 Mar",
    time: "6:00 PM",
    location: "Biblioteca Central",
    attendees: 23,
    image: "📊",
    category: "Grupos de Estudio",
  },
  {
    id: 4,
    title: "Club de Emprendimiento",
    description: "Networking y presentación de startups",
    date: "25 Mar",
    time: "7:00 PM",
    location: "Centro de Innovación",
    attendees: 67,
    image: "🚀",
    category: "Clubes",
  },
];

// Mock data for study groups
const studyGroups = [
  {
    id: 1,
    name: "Programación React",
    members: 12,
    subject: "Desarrollo Web",
    nextSession: "Mañana 3:00 PM",
    avatar: "⚛️",
  },
  {
    id: 2,
    name: "Cálculo Diferencial",
    members: 8,
    subject: "Matemáticas",
    nextSession: "Hoy 5:00 PM",
    avatar: "📐",
  },
  {
    id: 3,
    name: "Física Cuántica",
    members: 15,
    subject: "Física",
    nextSession: "Viernes 2:00 PM",
    avatar: "⚛️",
  },
  {
    id: 4,
    name: "Historia del Arte",
    members: 6,
    subject: "Arte",
    nextSession: "Lunes 4:00 PM",
    avatar: "🎨",
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    Users: any[];
    Events: any[];
    Groups: any[];
  }>({
    Users: [],
    Events: [],
    Groups: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // useEffect que se ejecuta cada vez que cambia searchQuery
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Si no hay búsqueda, limpiar resultados
      setSearchResults({
        Users: [],
        Events: [],
        Groups: [],
      });
      setIsSearching(false);
      setIsLoading(false);
    } else {
      // Aquí puedes implementar tu lógica de búsqueda
      console.log("Buscando:", searchQuery);
      setIsSearching(true);
      setIsLoading(true);

      // Simular delay de carga (reemplaza esto con tu API call)
      setTimeout(() => {
        const query = searchQuery.toLowerCase();

        // Simular respuesta del backend
        const mockResults = {
          Users: [], // Aquí irían los usuarios que coincidan
          Events: trendingEvents.filter(
            (event) =>
              event.title.toLowerCase().includes(query) ||
              event.description.toLowerCase().includes(query) ||
              event.category.toLowerCase().includes(query),
          ),
          Groups: studyGroups.filter(
            (group) =>
              group.name.toLowerCase().includes(query) ||
              group.subject.toLowerCase().includes(query),
          ),
        };

        setSearchResults(mockResults);
        setIsLoading(false);
      }, 1500); // Simular 1.5 segundos de carga
    }
  }, [searchQuery]);

  const handleCategoryPress = (category: any) => {
    console.log("Category pressed:", category.name);
  };

  const handleEventPress = (event: any) => {
    console.log("Event pressed:", event.title);
  };

  const handleStudyGroupPress = (group: any) => {
    console.log("Study group pressed:", group.name);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#0f172a" : "#f8fafc" },
      ]}
    >
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["#0f172a", "#1e293b"]
            : ["#f8fafc", "#ffffff"]
        }
        style={styles.gradient}
      >
        <SafeAreaView
          style={styles.safeArea}
          edges={["bottom", "left", "right"]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <ThemedText style={[styles.headerTitle, { color: colors.text }]}>
                Explorar
              </ThemedText>
              <ThemedText
                style={[styles.headerSubtitle, { color: colors.icon }]}
              >
                Descubre actividades y grupos
              </ThemedText>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={colors.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="filter-outline" size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Search Bar */}
            <View style={styles.searchSection}>
              <SearchBar
                placeholder="Buscar eventos, grupos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onClear={handleSearchClear}
                style={styles.searchBar}
              />
            </View>

            {/* Categories Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ThemedText
                  style={[styles.sectionTitle, { color: colors.text }]}
                >
                  Categorías
                </ThemedText>
              </View>
              {isLoading ? (
                <FlatList
                  data={[1, 2, 3, 4, 5, 6]}
                  renderItem={() => <SkeletonCard />}
                  keyExtractor={(item) => item.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriesList}
                />
              ) : (
                <FlatList
                  data={categories}
                  renderItem={({ item }) => (
                    <CategoryCard
                      name={item.name}
                      icon={item.icon}
                      color={item.color}
                      count={item.count}
                      onPress={() => handleCategoryPress(item)}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriesList}
                />
              )}
            </View>

            {/* Trending Events Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ThemedText
                  style={[styles.sectionTitle, { color: colors.text }]}
                >
                  Eventos Destacados
                </ThemedText>
                <TouchableOpacity>
                  <ThemedText
                    style={[styles.seeAllText, { color: colors.tint }]}
                  >
                    Ver todos
                  </ThemedText>
                </TouchableOpacity>
              </View>
              {isLoading ? (
                <FlatList
                  data={[1, 2, 3, 4]}
                  renderItem={() => <SkeletonEventCard />}
                  keyExtractor={(item) => item.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.eventsList}
                />
              ) : (
                <FlatList
                  data={isSearching ? searchResults.Events : trendingEvents}
                  renderItem={({ item }) => (
                    <EventCard
                      title={item.title}
                      description={item.description}
                      date={item.date}
                      time={item.time}
                      location={item.location}
                      attendees={item.attendees}
                      image={item.image}
                      category={item.category}
                      onPress={() => handleEventPress(item)}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.eventsList}
                />
              )}
            </View>

            {/* Study Groups Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ThemedText
                  style={[styles.sectionTitle, { color: colors.text }]}
                >
                  Grupos de Estudio
                </ThemedText>
                <TouchableOpacity>
                  <ThemedText
                    style={[styles.seeAllText, { color: colors.tint }]}
                  >
                    Ver todos
                  </ThemedText>
                </TouchableOpacity>
              </View>
              {isLoading ? (
                <FlatList
                  data={[1, 2, 3, 4]}
                  renderItem={() => <SkeletonCard width={240} height={120} />}
                  keyExtractor={(item) => item.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.studyGroupsList}
                />
              ) : (
                <FlatList
                  data={isSearching ? searchResults.Groups : studyGroups}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.studyGroupCard,
                        {
                          backgroundColor:
                            colorScheme === "dark" ? "#1e293b" : "#ffffff",
                          borderColor:
                            colorScheme === "dark" ? "#334155" : "#e2e8f0",
                        },
                      ]}
                      onPress={() => handleStudyGroupPress(item)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.studyGroupHeader}>
                        <Text style={styles.studyGroupAvatar}>
                          {item.avatar}
                        </Text>
                        <View style={styles.studyGroupInfo}>
                          <ThemedText
                            style={[
                              styles.studyGroupName,
                              { color: colors.text },
                            ]}
                          >
                            {item.name}
                          </ThemedText>
                          <ThemedText
                            style={[
                              styles.studyGroupSubject,
                              { color: colors.icon },
                            ]}
                          >
                            {item.subject}
                          </ThemedText>
                        </View>
                        <TouchableOpacity style={styles.bookmarkButton}>
                          <Ionicons
                            name="bookmark-outline"
                            size={20}
                            color={colors.icon}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.studyGroupDetails}>
                        <View style={styles.studyGroupDetail}>
                          <Ionicons
                            name="people-outline"
                            size={16}
                            color={colors.icon}
                          />
                          <ThemedText
                            style={[
                              styles.studyGroupDetailText,
                              { color: colors.icon },
                            ]}
                          >
                            {item.members} miembros
                          </ThemedText>
                        </View>
                        <View style={styles.studyGroupDetail}>
                          <Ionicons
                            name="time-outline"
                            size={16}
                            color={colors.icon}
                          />
                          <ThemedText
                            style={[
                              styles.studyGroupDetailText,
                              { color: colors.icon },
                            ]}
                          >
                            {item.nextSession}
                          </ThemedText>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.studyGroupsList}
                />
              )}
            </View>

            {/* Bottom padding for floating tab bar */}
            <View style={styles.bottomPadding} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 50,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    marginBottom: 0,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  eventsList: {
    paddingHorizontal: 20,
  },
  studyGroupsList: {
    paddingHorizontal: 20,
  },
  studyGroupCard: {
    width: 240,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginRight: 16,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    elevation: 2,
  },
  studyGroupHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  studyGroupAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  studyGroupInfo: {
    flex: 1,
  },
  studyGroupName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  studyGroupSubject: {
    fontSize: 14,
  },
  bookmarkButton: {
    padding: 4,
  },
  studyGroupDetails: {
    gap: 8,
  },
  studyGroupDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  studyGroupDetailText: {
    fontSize: 12,
  },
  bottomPadding: {
    height: 120,
  },
});
