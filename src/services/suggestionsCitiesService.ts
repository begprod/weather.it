import { suggestionsCitiesApi } from './apiSettings';
import { type ISearchSuggestItem, type ICitiesSuggestionsItem, type ISearchDataResponse } from '@/types';

export function suggestionsCitiesService(name: string = ''): Promise<Array<ISearchSuggestItem>> {
  if (name.length < 3) {
    return Promise.resolve([]);
  }

  const url = `/autocomplete?text=${name}&type=city&limit=5&lang=en&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`;

  return suggestionsCitiesApi.get(url)
    .then((data: ISearchDataResponse) => {
      const filteredCities: Array<ICitiesSuggestionsItem> = data.data.features.filter((city: ICitiesSuggestionsItem) => {
        return (city.properties.category === 'populated_place' || city.properties.category === 'administrative') && (city.properties.result_type === 'city' || city.properties.result_type === 'postcode');
      });

      const uniqueCities: Array<ICitiesSuggestionsItem> = filteredCities.filter((city: ICitiesSuggestionsItem, index: number, self: Array<ICitiesSuggestionsItem>) => {
        return index === self.findIndex((i: ICitiesSuggestionsItem) => {
          return i.properties.city === city.properties.city && i.properties.country === city.properties.country;
        });
      });

      return uniqueCities.map((city: ICitiesSuggestionsItem) => {
        return {
          id: city.properties.place_id,
          name: city.properties.city,
          country: city.properties.country
        };
    });
  })
  .catch((error) => {
    throw new Error(error);
  });
}
