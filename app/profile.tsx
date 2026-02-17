// app/profile.tsx
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Profile",
          headerLeft: () => (
               <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headerLogoutButton} onPress={() => console.log('Logout pressed')}>
              <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
          )
        }} 
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <ThemedView style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/120x120/007AFF/FFFFFF?text=U" }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="camera" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={styles.name}>John Doe</ThemedText>
            <ThemedText style={styles.status}>Available</ThemedText>
          </View>
        </ThemedView>

        {/* Profile Details Section */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle-outline" size={24} color="#007AFF" />
            <ThemedText style={styles.sectionTitle}>Profile Information</ThemedText>
          </View>
          
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="person-outline" size={24} color="#666" />
              <View>
                <ThemedText style={styles.listItemTitle}>Name</ThemedText>
                <ThemedText style={styles.listItemSubtitle}>John Doe</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="call-outline" size={24} color="#666" />
              <View>
                <ThemedText style={styles.listItemTitle}>Phone</ThemedText>
                <ThemedText style={styles.listItemSubtitle}>+1 (555) 123-4567</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="mail-outline" size={24} color="#666" />
              <View>
                <ThemedText style={styles.listItemTitle}>Email</ThemedText>
                <ThemedText style={styles.listItemSubtitle}>john.doe@example.com</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="calendar-outline" size={24} color="#666" />
              <View>
                <ThemedText style={styles.listItemTitle}>Birthday</ThemedText>
                <ThemedText style={styles.listItemSubtitle}>January 1, 1990</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </ThemedView>

        {/* Settings Section */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-outline" size={24} color="#007AFF" />
            <ThemedText style={styles.sectionTitle}>Settings</ThemedText>
          </View>
          
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="notifications-outline" size={24} color="#666" />
              <View>
                <ThemedText style={styles.listItemTitle}>Notifications</ThemedText>
                <ThemedText style={styles.listItemSubtitle}>Manage notification settings</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="help-circle-outline" size={24} color="#666" />
              <View>
                <ThemedText style={styles.listItemTitle}>Help & Support</ThemedText>
                <ThemedText style={styles.listItemSubtitle}>Get help and support</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="information-circle-outline" size={24} color="#666" />
              <View>
                <ThemedText style={styles.listItemTitle}>About</ThemedText>
                <ThemedText style={styles.listItemSubtitle}>App version and information</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </ThemedView>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingBottom: 50, // Increased padding to account for floating tab bar
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  editButton: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileInfo: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: "#007AFF",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginLeft: 15,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  logoutText: {
    fontSize: 18,
    color: "#FF3B30",
    fontWeight: "600",
    marginLeft: 10,
  },
  headerLogoutButton: {
    marginRight: 15,
  },
  headerBackButton:{
    marginLeft:15,
  },
  scrollContent: {
    paddingBottom: 80, // Extra padding to ensure About section is visible above floating tab bar
  },
});
