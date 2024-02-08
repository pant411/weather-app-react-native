import * as Location from 'expo-location';

// Ask for permission to access location
export const locationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return;
  }
};
