export interface IRootState {
  weather: IWeatherState;
}

export interface IWeatherState {
  status: 'init' | 'loading' | 'success' | 'error';
  entities: Array<ICityWeather>;
  errorMessage: string;
}


export interface ISearchItem {
  name: string;
  country: string;
}

export interface ISearchItemList {
  cities: Array<ISearchItem>;
}

export interface ICityWeather {
  name: string;
  weather: {
    current: number;
    feels_like: number;
    main: string;
    description: string;
  };
  image: string;
}

export interface IGetCityImageResponse {
  urls: {
    regular: string;
  }
}
