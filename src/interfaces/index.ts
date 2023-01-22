export interface IFoundCity {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
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


export interface ICitiesList {
  cities: Array<IFoundCity>;
}
