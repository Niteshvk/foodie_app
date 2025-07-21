/**
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect} from "react";
import './globals.css'

export default function RootLayout() {
  const [fontsloaded, error] = useFonts(map:{
    "QuickSand-Bold": require(id:'../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require(id:'../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require(id:'../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require(id:'../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require(id:'../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(effect:() => {
   if(error) throw error;
   if(fontsloaded) SplashScreen.hideAsync();
  }, deps: [fontsloaded,error]);

  return <Stack screenOptions={{headerShown: false }} />;
}
**/
/**
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import './globals.css';

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
 **/
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://c9e4d42b1d4d1ddbbac523b14553e752@o4509705515892736.ingest.us.sentry.io/4509705616097280',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticated }= useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticated()
  }, []);

  if(!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
});