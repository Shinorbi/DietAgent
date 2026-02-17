import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <>
    <Stack.Screen options={{ title: "Home" }} />
    <View style={styles.container}>
      <Text style={styles.title}>Diet Agent App 🍎</Text>
      <Text>Welcome to your AI Diet Assistant</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
