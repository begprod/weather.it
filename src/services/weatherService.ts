import { weatherApi } from './apiSettings';
import type { ICityWeather, ISearchSuggestItem } from '@/types';
import { getTimeInTimezone } from '@/helpers';

export async function weatherService(
  suggestCityData: ISearchSuggestItem | ICityWeather,
): Promise<ICityWeather> {
  const { id, name, country, country_code, lat, lon } = suggestCityData;
  const countryCode = country_code.toUpperCase();
  const weatherDataUrl = `/weather?q=${name},${countryCode}&appid=${
    // @ts-ignore
    import.meta.env.VITE_WEATHER_API_KEY
  }&units=metric`;
  const airQualityUrl = `/air_pollution?lat=${suggestCityData.lat}&lon=${
    suggestCityData.lon
  }&appid=${
    // @ts-ignore
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
  const getWeather = async () => await weatherApi.get(weatherDataUrl);
  const getAirQuality = async () => await weatherApi.get(airQualityUrl);
  const requests = [getWeather(), getAirQuality()];
  let airQuality: number | null = null;

  return Promise.allSettled(requests).then((results: Array<PromiseSettledResult<any>>) => {
    if (results[0].status === 'rejected') {
      throw new Error('404');
    }

    if (results[1].status === 'fulfilled') {
      airQuality = results[1].value.data.list[0].main.aqi;
    }

    return {
      id,
      country,
      country_code,
      lat,
      lon,
      name: results[0].value.data.name,
      localTime: getTimeInTimezone(results[0].value.data.timezone),
      weather: {
        current: results[0].value.data.main.temp.toFixed(0),
        feels_like: results[0].value.data.main.feels_like.toFixed(0),
        air_quality: airQuality,
        main: results[0].value.data.weather[0].main,
        description: results[0].value.data.weather[0].description,
      },
    } as ICityWeather;
  });
}
