import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useWeatherStore } from '@/stores';
import type { ISearchSuggestItem } from '@/types';

describe('weather store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const weatherStore = useWeatherStore();

  const mockSearchSuggestItem: ISearchSuggestItem = {
    id: '123',
    name: 'London',
    country: 'GB',
    country_code: 'GB',
    lon: 51.5085,
    lat: -0.1257,
  };

  it('correct get city data', async () => {
    await weatherStore.getCityData(mockSearchSuggestItem);

    expect(weatherStore.getIds).toEqual(['123']);
    expect(weatherStore.getCities.length).toEqual(1);
    expect(Object.keys(weatherStore.getImages).length).toEqual(1);
  });

  it('correct update city data', async () => {
    await weatherStore.updateCityData();

    expect(weatherStore.getIds).toEqual(['123']);
    expect(weatherStore.getCities.length).toEqual(1);
    expect(Object.keys(weatherStore.getImages).length).toEqual(1);
    expect(weatherStore.getLastUpdateDate).not.toEqual(null);
  });

  it('correct remove city data', () => {
    weatherStore.removeCity(mockSearchSuggestItem.id);

    expect(weatherStore.getIds).toEqual([]);
    expect(weatherStore.getCities.length).toEqual(0);
    expect(Object.keys(weatherStore.getImages).length).toEqual(0);
  });
});
