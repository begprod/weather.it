export interface ICityWeather {
  id: string;
  name: string;
  country: string;
  weather: {
    current: number;
    feels_like: number;
    main: string;
    description: string;
  };
}

export interface ISearchDataResponse {
  data: {
    features: Array<any>
  }
}

export interface ICitiesSuggestionsItem {
  properties: {
    place_id: string;
    city: string;
    country: string;
    result_type: string;
    category: string;
  }
}

export interface ISearchSuggestItem {
  id: string;
  name: string;
  country: string;
}
