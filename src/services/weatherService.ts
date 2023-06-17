import { weatherApi } from './apiSettings';
import { type ICityWeather, type ISearchSuggestItem } from '@/types';

export function weatherService(suggestCityData: ISearchSuggestItem): Promise<ICityWeather> {
  const { id, name, country } = suggestCityData;
  const url = `/weather?q=${name}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`;

  return weatherApi.get(url)
    .then((data) => {
      return {
        id,
        country,
        name: data.data.name,
        weather: {
          current: data.data.main.temp.toFixed(0),
          feels_like: data.data.main.feels_like.toFixed(0),
          main: data.data.weather[0].main,
          description: data.data.weather[0].description,
        }
      };
    })
    .catch((error) => {
      throw new Error(error);
    });
}
