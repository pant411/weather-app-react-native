import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { openWeatherService } from '../services/open-weather/open-weather.service'
import { CurrentWeather } from '../services/open-weather/interfaces/response.interface'
import { Weather } from '../models/weather.model'

interface UseFetchProps<T> {
  lat: number
  lon: number
}

interface UseFetchResult<T> {
  data: T | null
  error: AxiosError | null
  loading: boolean
}

const useFetchWeather = ({
  lat,
  lon,
}: UseFetchProps<CurrentWeather>): UseFetchResult<Weather> => {
  const [data, setData] = useState<Weather | null>(null)
  const [error, setError] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentWeather = await openWeatherService.getCurrentWeather(
          lat,
          lon,
        )
        setData({
          city: currentWeather.name,
          temperature: currentWeather.main.temp,
          condition: currentWeather.weather[0].main,
        })
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data: data, error, loading }
}

export default useFetchWeather
