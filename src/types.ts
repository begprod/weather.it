import { EntityId, EntityState } from '@reduxjs/toolkit';

export interface IRootState {
  ids?: Array<EntityId>;
  entities?: EntityState<ICityWeather>;
  citiesSuggestions: Array<ISearchSuggestItem>;
  images: Record<string, string>;
  lastUpdateDate: string | null;
  status: 'init' | 'loading' | 'updating' | 'success' | 'error';
  errorMessage: string;
}

export interface ICitiesSuggestionsResponse {
  properties: {
    place_id: string;
    address_line1: string;
    address_line2: string;
    result_type: string;
    category: string;
  }
}

export interface ISearchSuggestItem {
  id: string;
  name: string;
  country: string;
}

export interface ICityWeather {
  id: string;
  name: string;
  weather: {
    current: number;
    feels_like: number;
    main: string;
    description: string;
  };
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
