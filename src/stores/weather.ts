import { defineStore } from 'pinia';
import { type IWeatherState, type ICityWeather, type ISearchSuggestItem } from '@/types';
import { useCommonStore } from '@/stores/common';
import { weatherService, imagesService } from '@/services';


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
    setImage(id: string, image: string) {
      this.images[id] = image;
    },
    async getCityWeather(city: ISearchSuggestItem) {
      const commonStore = useCommonStore();

      await weatherService(city)
        .then((city) => {
          this.setId(city.id);
          this.setCity(city);
        })
        .catch((error) => {
          commonStore.setStatus('error');
          commonStore.setErrorMessage(error.message);
        });
    },
    async getCityImage(id: string, query: string) {
      const commonStore = useCommonStore();

      await imagesService(query)
        .then((image) => {
          this.setImage(id, image);
        })
        .catch((error) => {
          commonStore.setStatus('error');
          commonStore.setErrorMessage(error.message);
        });
    },
  }
});
