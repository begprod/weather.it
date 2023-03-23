import { weatherApi } from './apiSettings';
import { ICityWeather } from '../types';

export async function getCityWeather(id: string, cityName: string, country: string): Promise<ICityWeather> {
  try {
    const { data } = await weatherApi.get(`/weather?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`);

    return {
      id,
      country,
      name: data.name,
      weather: {
        current: data.main.temp.toFixed(0),
        feels_like: data.main.feels_like.toFixed(0),
        main: data.weather[0].main,
        description: data.weather[0].description,
      }
    };
  } catch (error: any) {
    if (error.response.status === 404) {
      throw new Error('Weather data for this city is not found.');
    }

    throw new Error('Something went wrong with getting weather data. Please try again later.');
  }
}
