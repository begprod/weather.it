import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { type IWeatherState, type ICityWeather, type ISearchSuggestItem } from '@/types';
import { useCommonStore } from '@/stores';
import { weatherService, imagesService } from '@/services';
import { getDate } from '@/helpers';


export const useWeatherStore = defineStore('weather', {
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
    async updateCityData() {
      const commonStore = useCommonStore();
      const updateDate = getDate();
      const promises = this.cities.map(async (city: ISearchSuggestItem) => await weatherService(city));

      if (promises.length === 0) {
        return;
      }

      for (const promise of promises) {
        try {
          commonStore.setStatus('updating');

          const weatherData = await promise;

          this.lastUpdateDate = updateDate;

          this.cities = this.cities.map((city: ICityWeather) => {
            if (city.id === weatherData.id) {
              commonStore.setStatus('success');

              return weatherData;
            }

            return city;
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
          commonStore.setStatus('error');
        }
      }
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
