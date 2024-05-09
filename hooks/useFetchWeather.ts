import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

import { Weather } from '../models/weather.model';
import { openWeatherService } from '../services/open-weather/open-weather.service';

interface UseFetchProps {
  lat: number;
  lon: number;
}

interface UseFetchResult<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
}

const useFetchWeather = ({ lat, lon }: UseFetchProps): UseFetchResult<Weather> => {
  const [data, setData] = useState<Weather | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentWeather = await openWeatherService.getCurrentWeather(lat, lon);
        // console.log(currentWeather);
        setData({
          main: currentWeather.weather[0].main,
          city: currentWeather.name,
          temperature: currentWeather.main.temp,
          condition: currentWeather.weather[0].main,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon]);

  return { data, error, loading };
};

export default useFetchWeather;
