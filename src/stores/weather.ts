import { defineStore } from 'pinia';
import { type ICityWeather } from '@/types';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    cities: [],
    images: {},
    lastUpdateDate: null
  }),

  getters: {
    getCities(): Array<ICityWeather> {
      return this.cities;
    },
    getImages(): Record<string, string> {
      return this.images;
    },
    getLastUpdateDate(): string | null {
      return this.lastUpdateDate;
    }
  },

  actions: {}
});
