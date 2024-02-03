import { CurrentWeather } from './response.interface'

export interface OpenWeatherInterface {
  getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather>
}
