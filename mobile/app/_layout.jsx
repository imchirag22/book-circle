import { SplashScreen,Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/Colors";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import {useAuthStore} from "../store/authStore.js"



export default function RootLayout() {
  const router = useRouter()
  const segment = useSegments()
  
  const {checkAuth,token, user} = useAuthStore

  const [fontsLoaded] = useFonts({
    'Geist-Regular': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Regular.ttf'),
    'Geist-Medium': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Medium.ttf'),
    'Geist-SemiBold': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-SemiBold.ttf'),
    'Geist-Bold': require('../assets/fonts/geist_fonts/Geist/ttf/Geist-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);


  useEffect(() => {
    checkAuth()
  },)

  useEffect( () => {
    const inAuthScreen = segment[0] === '/(auth)'
    const isSignedIn = user && token

    if (!isSignedIn && !inAuthScreen) router.replace('/(auth)')
      else if (isSignedIn && inAuthScreen) router.replace('/(tabs)')
  }, [user, token, segment, router])
 

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