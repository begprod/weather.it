import { defineStore } from 'pinia';
import { type IWeatherState } from '@/types';

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
