import { SplashScreen,Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/Colors";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import {useAuthStore} from "../store/authStore.js"



export default function RootLayout() {
  const router = useRouter()
  const segment = useSegments()
  const [isAuthReady, setIsAuthReady] = useState(false)
  
  const {checkAuth,token, user} = useAuthStore()

  const [fontsLoaded] = useFonts({
    'Geist-Regular': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Regular.ttf'),
    'Geist-Medium': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Medium.ttf'),
    'Geist-SemiBold': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-SemiBold.ttf'),
    'Geist-Bold': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);


  // Check authentication status on mount
  useEffect(() => {
    async function loadAuthState() {
      await checkAuth()
      setIsAuthReady(true)
    }
    loadAuthState()
  }, [checkAuth])

  // Handle navigation after auth is ready
  useEffect(() => {
    if (!isAuthReady) return;
    
    const inAuthGroup = segment[0] === '(auth)'
    const isSignedIn = user && token

    if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)')
    } else if (isSignedIn && inAuthGroup) {
      router.replace('/(tabs)')
    }
  }, [isAuthReady, user, token, segment, router])

  // Don't render anything until fonts and auth check are complete
  if (!fontsLoaded || !isAuthReady) {
    return null;
  }
 

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}