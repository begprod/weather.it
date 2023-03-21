import { citySuggestionsApi } from './apiSettings';
import { ISearchSuggestItem, ICitiesSuggestionsResponse } from '../types';

export async function getCitiesSuggestions(name: string): Promise<Array<ISearchSuggestItem>> {
  try {
    const { data } = await citySuggestionsApi.get(`/autocomplete?text=${name}&type=city&limit=5&lang=en&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`);

    const filteredCities: Array<ICitiesSuggestionsResponse> = data.features.filter((city: ICitiesSuggestionsResponse) => {
      return (city.properties.category === 'populated_place' || city.properties.category === 'administrative') && (city.properties.result_type === 'city' || city.properties.result_type === 'postcode');
    });

    const uniqueCities: Array<ICitiesSuggestionsResponse> = filteredCities.filter((city: ICitiesSuggestionsResponse, index: number, self: Array<ICitiesSuggestionsResponse>) => {
      return index === self.findIndex((i: ICitiesSuggestionsResponse) => {
        return i.properties.city === city.properties.city && i.properties.country === city.properties.country;
      });
    });

    return uniqueCities.map((city: ICitiesSuggestionsResponse) => {
      return {
        id: city.properties.place_id,
        name: city.properties.city,
        country: city.properties.country
      };
    });
  } catch (error) {
    throw new Error('Something went wrong with getting cities list. Please try again later.');
  }
}
