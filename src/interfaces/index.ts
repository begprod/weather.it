export interface IRootState {
  entities: Array<ICityWeather>;
  status: 'init' | 'loading' | 'success' | 'error';
  errorMessage: string;
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
  country: string;
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
