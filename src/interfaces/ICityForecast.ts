export interface ICityForecast {
  name: string;
  weather: {
    current: number;
    feels_like: number;
    main: string;
    description: string;
  };
  image: string;
}
