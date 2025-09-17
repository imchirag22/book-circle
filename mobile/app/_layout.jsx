import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/Colors";
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Geist-Regular': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Regular.ttf'),
    'Geist-Medium': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Medium.ttf'),
    'Geist-SemiBold': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-SemiBold.ttf'),
    'Geist-Bold': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // This will show nothing until fonts are loaded
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}