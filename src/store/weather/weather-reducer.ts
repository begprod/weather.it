import { ICityWeather } from '../../interfaces';
import { WeatherActionTypes } from './weather-constants';

interface IAction {
  type: string;
  payload: any;
}
export const weatherListReducer = (state: Array<ICityWeather>, action: IAction) => {
  switch (action.type) {
    case WeatherActionTypes['SAVE_CITY_WEATHER']: {
      const cityWeather = action.payload as ICityWeather;

      console.log('cityWeather reducer action', cityWeather);

      return state;
    }

    default: {
      return state;
    }
  }
}
