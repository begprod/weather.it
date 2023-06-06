import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { type IWeatherState, type ICityWeather, type ISearchSuggestItem } from '@/types';
import { useCommonStore } from '@/stores';
import { weatherService, imagesService } from '@/services';


export const useWeatherStore = defineStore('weather', {
  state: () => useLocalStorage('weather:storage', {
    ids: [],
    cities: [],
    images: {},
    lastUpdateDate: null
  } as IWeatherState),

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
    async getCityData(city: ISearchSuggestItem) {
      const commonStore = useCommonStore();
      commonStore.setStatus('loading');

      const weatherData = await weatherService(city);
      const imageData = await imagesService(`${city.name} city ${city.country}`);

      // console.log(weatherData);
      // console.log(imageData);
      this.ids.push(weatherData.id);
      this.cities.push(weatherData);
      this.images[weatherData.id] = imageData;

      commonStore.setStatus('success');
    }
  }
});
