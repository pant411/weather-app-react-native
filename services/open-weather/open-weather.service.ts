import { OpenWeatherInterface } from './interfaces/open-weather.interface';
import { CurrentWeather } from './interfaces/response.interface';
import AxiosService from '../../libs/axios/axios';

export class OpenWeatherService implements OpenWeatherInterface {
  private readonly axiosInstance: AxiosService;
  private readonly apiKey: string;

  constructor() {
    this.axiosInstance = new AxiosService('https://api.openweathermap.org/data/2.5');
    this.apiKey = '08e228465039ae677a2adc823f899bf9';
  }

  public async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
    const response = await this.axiosInstance.get<CurrentWeather>(
      `weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
    );
    return response;
  }
}

export const openWeatherService = new OpenWeatherService();
