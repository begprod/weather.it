import { WeatherActionTypes } from './weather-constants';
import { ICityWeather } from '../../interfaces';

export const saveCityWeather = (cityWeather: ICityWeather) => {
  return {
    type: WeatherActionTypes['SAVE_CITY_WEATHER'],
    payload: cityWeather
  };
}
