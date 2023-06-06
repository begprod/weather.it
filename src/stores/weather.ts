import { defineStore } from 'pinia';
import { useLocalStorage, type RemovableRef } from '@vueuse/core';
import { type IWeatherState, type ICityWeather, type ISearchSuggestItem } from '@/types';
import { useCommonStore } from '@/stores';
import { weatherService, imagesService } from '@/services';


export const useWeatherStore = defineStore('weather', {
  // TODO: do type for this
  state: () => ({
    ids: useLocalStorage('weather:ids', [] as IWeatherState['ids']),
    cities: useLocalStorage('weather:cities', [] as IWeatherState['cities']),
    images: useLocalStorage('weather:images', {} as IWeatherState['images']),
    lastUpdateDate: useLocalStorage('weather:last_updated_date', null as IWeatherState['lastUpdateDate'])
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
    async getCityData(city: ISearchSuggestItem) {
      const commonStore = useCommonStore();
      commonStore.setStatus('loading');

      const weatherData = await weatherService(city);
      const imageData = await imagesService(`${city.name} city ${city.country}`);

      this.ids.push(weatherData.id);
      this.cities.push(weatherData);
      this.images[weatherData.id] = imageData;

      commonStore.setStatus('success');
    },
    removeCity(id: string) {
      this.ids = this.ids.filter(cityId => cityId !== id);
      this.cities = this.cities.filter(city => city.id !== id);
      delete this.images[id];

      if (this.cities.length === 0) {
        this.lastUpdateDate = null;
      }
    }
  }
});
