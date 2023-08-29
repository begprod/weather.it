import type { RemovableRef } from '@vueuse/core';

export interface ICommonState {
  status: 'init' | 'loading' | 'updating' | 'success' | 'error';
  message: string;
  toastVisibility: boolean;
}

export interface IWeatherState {
  ids: RemovableRef<Array<string>>;
  cities: RemovableRef<Array<ICityWeather>>;
  images: RemovableRef<Record<string, string>>;
  lastUpdateDate: RemovableRef<string | null>;
}

export interface ICityWeather {
  id: string;
  name: string;
  country: string;
  country_code: string;
  lon: number;
  lat: number;
  weather: {
    current: number;
    feels_like: number;
    air_quality: number | null;
    main: string;
    description: string;
  };
}

export interface ISearchDataResponse {
  data: {
    features: Array<any>;
  };
}

export interface ICitiesSuggestionsItem {
  properties: {
    place_id: string;
    city: string;
    country: string;
    country_code: string;
    result_type: string;
    category: string;
    lon: number;
    lat: number;
  };
}

export interface ISearchSuggestItem {
  id: string;
  name: string;
  country: string;
  country_code: string;
  lon: number;
  lat: number;
}

/* eslint-disable */
export enum WeatherType {
  Clear = 'clear',
  Clouds = 'clouds',
  Thunderstorm = 'thunder',
  Tornado = 'thunder',
  Drizzle = 'drizzle',
  Rain = 'rain',
  Snow = 'snow',
  Smoke = 'smoke',
  Squall = 'smoke',
  Fog = 'smoke',
  Haze = 'haze',
  Mist = 'mist',
  Dust = 'dust',
  Sand = 'dust',
  Ash = 'dust',
}
/* eslint-enable */
