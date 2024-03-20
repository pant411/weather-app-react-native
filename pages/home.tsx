import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import useFetchWeather from '../hooks/useFetchWeather'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
// Import Lottie animation files
import sunnyAnimation from '../assets/lottie/sunny.json';
import thunderAnimation from '../assets/lottie/thunder.json';
import rainAnimation from '../assets/lottie/rain.json';
import cloudAnimation from '../assets/lottie/cloud.json';


export default function Home() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Error getting location');
      }
    })();
  }, []);

  const { data, loading } = useFetchWeather({ lat: location?.coords?.latitude, lon: location?.coords?.longitude });

  if (!location || loading || !data) {
    return (
      <View style={styles.container}>
        <Text>loading</Text>
      </View>
    )
  }

  // Map weather conditions to Lottie animation files
  const weatherAnimations: { [key: string]: any } = {
    'Thunderstorm': thunderAnimation,
    'Drizzle': thunderAnimation,
    'Rain': rainAnimation,
    'Clear': sunnyAnimation,
    'Clouds': cloudAnimation
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.cityText}>{data.city}</Text>
        {data?.main && <LottieView
          source={weatherAnimations[data.main]}
          style={{ width: '60%', height: '60%' }}
          autoPlay
          loop
        />}
        <Text style={styles.temperatureText}>
          {`${data.temperature.toFixed(0)}°C`}
        </Text>
        <Text style={styles.conditionText}>{data.condition}</Text>

        <StatusBar style="auto" />        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  cityText: {
    fontSize: 36,
    fontWeight: '600',
  },
  temperatureText: {
    fontSize: 36,
    fontWeight: '600',
  },
  conditionText: {
    fontSize: 24,
    fontWeight: '400',
  },
})
