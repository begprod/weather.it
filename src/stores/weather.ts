import { defineStore } from 'pinia';
import { type IWeatherState, type ICityWeather } from '@/types';

export const useWeatherStore = defineStore('weather', {
  state: (): IWeatherState => ({
    ids: [],
    cities: [],
    images: {},
    lastUpdateDate: null
  }),

  getters: {
    getIds(): Array<string> {
      return this.ids;
    },
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

  actions: {
    setId(id: string) {
      this.ids.push(id);
    },
    setCity(city: ICityWeather) {
      this.cities.push(city);
    },
  }
});
