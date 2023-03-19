import { citySuggestionsApi } from './apiSettings';
import { ISearchSuggestItem, ICitiesSuggestionsResponse } from '../types';

export async function getCitiesSuggestions(name: string): Promise<Array<ISearchSuggestItem>> {
  try {
    const { data } = await citySuggestionsApi.get(`/autocomplete?text=${name}&type=city&limit=5&lang=en&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`);

    const filteredCities =  data.features.filter((city: ICitiesSuggestionsResponse) => {
      return (city.properties.category === 'populated_place' || city.properties.category === 'administrative') && (city.properties.result_type === 'city' || city.properties.result_type === 'postcode');
    });

    return filteredCities.map((city: ICitiesSuggestionsResponse) => {
      return {
        id: city.properties.place_id,
        name: city.properties.address_line1,
        country: city.properties.address_line2
      };
    });

  } catch (error) {
    throw new Error('Something went wrong with getting cities list. Please try again later.');
  }
}
