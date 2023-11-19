import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type { IWeatherState, ICityWeather, ISearchSuggestItem } from '@/types';
import { useCommonStore } from '@/stores';
import { weatherService, imagesService } from '@/services';
import { getDate } from '@/helpers';

export const useWeatherStore = defineStore('weather', {
  state: (): IWeatherState => ({
    ids: useLocalStorage('weather:ids', []),
    cities: useLocalStorage('weather:cities', []),
    images: useLocalStorage('weather:images', {}),
    lastUpdateDate: useLocalStorage('weather:last_updated_date', null),
  }),

  actions: {
    async getCityData(city: ISearchSuggestItem) {
      const commonStore = useCommonStore();
      const { setStatus, setMessage, showToast } = commonStore;

      setStatus('loading');

      try {
        const weatherData = await weatherService(city);
        const imageData = await imagesService(`${city.name} city ${city.country}`);

        this.ids.push(weatherData.id);
        this.cities.push(weatherData);
        this.images[weatherData.id] = imageData;

        setStatus('success');
        setMessage(`${weatherData.name} (${weatherData.country}) successfully added.`);
        showToast();
      } catch (error) {
        const message =
          // @ts-ignore
          error.message === '404'
            ? `Weather data for ${city.name} (${city.country}) not found.`
            : 'Something went wrong with the weather service or the image service. Please try again later.';

        setStatus('error');
        setMessage(message);
        showToast();
      }
    },
    async updateCityData() {
      const commonStore = useCommonStore();
      const { setStatus, setMessage, showToast } = commonStore;
      const updateDate = getDate();
      const promises = this.cities.map(async (city: ICityWeather) => await weatherService(city));

      if (promises.length === 0) {
        return;
      }

      for (const promise of promises) {
        try {
          setStatus('updating');

          const weatherData = await promise;

          this.cities = this.cities.map((city: ICityWeather) => {
            if (city.id === weatherData.id) {
              setStatus('success');

              return weatherData;
            }

            return city;
          });
        } catch (error) {
          setStatus('error');
          setMessage('Something went wrong with the weather update. Please try again later.');
          showToast();

          return;
        }
      }

      this.lastUpdateDate = updateDate;
    },
    deleteCity(id: string) {
      this.ids = this.ids.filter((cityId) => cityId !== id);
      this.cities = this.cities.filter((city) => city.id !== id);
      delete this.images[id];

      if (this.cities.length === 0) {
        this.lastUpdateDate = null;
      }
    },
  },
});
