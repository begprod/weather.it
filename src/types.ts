export interface ICommonState {
  status: 'init' | 'loading' | 'updating' | 'success' | 'error';
  message: string;
  toastVisibility: boolean;
}

export interface IWeatherState {
  ids: Array<string>;
  cities: Array<ICityWeather>;
  images: Record<string, string>;
  lastUpdateDate: string | null;
}

export interface ICityWeather {
  id: string;
  name: string;
  country: string;
  country_code: string;
  weather: {
    current: number;
    feels_like: number;
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
  };
}

export interface ISearchSuggestItem {
  id: string;
  name: string;
  country: string;
  country_code: string;
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
  Haze = 'smoke',
  Squall = 'smoke',
  Fog = 'smoke',
  Mist = 'mist',
  Dust = 'dust',
  Sand = 'dust',
  Ash = 'dust',
}
/* eslint-enable */
