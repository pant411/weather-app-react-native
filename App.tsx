import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import LottieView from 'lottie-react-native'
import useFetchWeather from './hooks/useFetchWeather'
import { useEffect, useRef, useState } from 'react'
import Home from './pages/home'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
