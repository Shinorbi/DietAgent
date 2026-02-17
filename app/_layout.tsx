import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{ headerShown: true }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="log" options={{ title: "Log Meal" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

// -----------------
// Floating Tab Bar
// -----------------
function FloatingTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={styles.blur}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Icon mapping
          const icons: any = {
            index: "home-outline",
            log: "fast-food-outline",
            profile: "person-outline",
          };
          const iconName = icons[route.name];

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.button}
              onPress={() => navigation.navigate(route.name)}
            >
              <Ionicons
                name={iconName}
                size={28}
                color={isFocused ? "#007AFF" : "gray"}
              />
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

// -----------------
// Styles
// -----------------

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  blur: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 60,  // full pill shape
    overflow: "hidden",
    paddingVertical: 10,
    justifyContent: "space-around",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
});
