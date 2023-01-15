export interface ICityWeather {
  name: string;
  weather: {
    current: number;
    feels_like: number;
    description: string;
  }
}
