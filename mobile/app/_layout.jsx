import { Stack } from "expo-router";
import SafeAreaScreen from "../components/SafeAreaScreen"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <SafeAreaScreen>
  <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="index" />
    <Stack.Screen name="(auth)" />
  </Stack>
  </SafeAreaScreen>
  <StatusBar style="dark" />
  </SafeAreaProvider>
  )
}
