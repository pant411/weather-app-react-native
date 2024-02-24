import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import useFetchWeather from '../hooks/useFetchWeather'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

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

  return (
    <View style={styles.container}>
      {
        (!location || loading) ? <Text>loading</Text> : (
          <>
            <Text style={styles.cityText}>{data?.city || ''}</Text>
            <LottieView
              source={require('../assets/lottie/sunny.json')}
              style={{ width: '60%', height: '60%' }}
              autoPlay
              loop
            />
            <Text style={styles.temperatureText}>
              {`${data?.temperature.toFixed(0)}°C` || ''}
            </Text>
            <Text style={styles.conditionText}>{data?.condition || ''}</Text>
          </>
        )
      }

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
