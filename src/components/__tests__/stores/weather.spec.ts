import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useWeatherStore } from '@/stores';
import type { ISearchSuggestItem } from '@/types';

describe('weather store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const weatherStore = useWeatherStore();
  const { ids, cities, images, lastUpdateDate } = storeToRefs(weatherStore);
  const { getCityData, updateCityData, deleteCity } = weatherStore;

  const mockSearchSuggestItem: ISearchSuggestItem = {
    id: '123',
    name: 'London',
    country: 'GB',
    country_code: 'GB',
    lon: 51.5085,
    lat: -0.1257,
  };

  it('correct get city data', async () => {
    await getCityData(mockSearchSuggestItem);

    expect(ids.value).toEqual(['123']);
    expect(cities.value.length).toEqual(1);
    expect(Object.keys(images.value).length).toEqual(1);
  });

  it('correct update city data', async () => {
    await updateCityData();

    expect(ids.value).toEqual(['123']);
    expect(cities.value.length).toEqual(1);
    expect(Object.keys(images.value).length).toEqual(1);
    expect(lastUpdateDate.value).not.toEqual(null);
  });

  it('correct remove city data', () => {
    deleteCity(mockSearchSuggestItem.id);

    expect(ids.value).toEqual([]);
    expect(cities.value.length).toEqual(0);
    expect(Object.keys(images.value).length).toEqual(0);
  });
});
