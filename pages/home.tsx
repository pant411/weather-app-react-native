import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import useFetchWeather from '../hooks/useFetchWeather'

export default function Home() {
  const { data } = useFetchWeather({ lat: 14.33, lon: 100.61 })

  return (
    <View style={styles.container}>
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
