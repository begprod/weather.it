import { EntityId, EntityState } from '@reduxjs/toolkit';

export interface IRootState {
  ids?: EntityId[];
  entities?: EntityState<ICityWeather>;
  images: IImages;
  lastUpdateDate: string | null;
  status: 'init' | 'loading' | 'updating' | 'success' | 'error';
  errorMessage: string;
}

export interface IImages {
  [key: string]: IGetCityImageResponse;
}


export interface ISearchItem {
  id: number;
  name: string;
  country: string;
}

export interface ISearchItemList {
  cities: Array<ISearchItem>;
}

export interface ICityWeather {
  id: number;
  name: string;
  weather: {
    current: number;
    feels_like: number;
    main: string;
    description: string;
  };
}

export interface IGetCityImageResponse {
  urls: {
    regular: string;
  }
}

export enum WeatherType {
  Clear = 'clear',
  Clouds = 'cloud',
  Thunderstorm = 'thunder',
  Tornado = 'thunder',
  Drizzle = 'drizzle',
  Rain = 'rain',
  Snow = 'snow',
  Smoke = 'smoke',
  Haze = 'smoke',
  Squall = 'smoke',
  Mist = 'mist',
  Fog = 'smoke',
  Dust = 'dust',
  Sand = 'dust',
  Ash = 'dust',
}
