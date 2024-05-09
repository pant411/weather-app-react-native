import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Import Lottie animation files
import cloudAnimation from '../assets/lottie/cloud.json';
import rainAnimation from '../assets/lottie/rain.json';
import sunnyAnimation from '../assets/lottie/sunny.json';
import thunderAnimation from '../assets/lottie/thunder.json';
import useFetchWeather from '../hooks/useFetchWeather';

export default function Home() {
  const [location, setLocation] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    })();
  }, []);

  const { data, loading } = useFetchWeather({
    lat: location?.coords?.latitude,
    lon: location?.coords?.longitude,
  });

  if (!location || loading || !data) {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>loading</Text>
        </View>
      </View>
    );
  }

  // Map weather conditions to Lottie animation files
  const weatherAnimations: { [key: string]: any } = {
    Thunderstorm: thunderAnimation,
    Drizzle: thunderAnimation,
    Rain: rainAnimation,
    Clear: sunnyAnimation,
    Clouds: cloudAnimation,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.cityText}>{data.city}</Text>
        {data?.main && (
          <LottieView
            source={weatherAnimations[data.main]}
            style={{ width: '60%', height: '60%' }}
            autoPlay
            loop
          />
        )}
        <Text style={styles.temperatureText}>{`${data.temperature.toFixed(0)}°C`}</Text>
        <Text style={styles.conditionText}>{data.condition}</Text>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
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
});
