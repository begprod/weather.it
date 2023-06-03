import { defineStore } from 'pinia';

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

interface IWeatherState {
  cities: Array<ICityWeather>;
  images: Record<string, string>;
  lastUpdateDate: string | null;
}

export const useWeatherStore = defineStore<string, IWeatherState>('weather', {
  state: () => ({
    cities: [],
    images: {},
    lastUpdateDate: null
  }),

  getters: {
    getCities() {
      return this.cities;
    },
    getImages() {
      return this.images;
    },
    getLastUpdateDate() {
      return this.lastUpdateDate;
    }
  },

  actions: {}
});
