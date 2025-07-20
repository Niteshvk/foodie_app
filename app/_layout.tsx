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
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

