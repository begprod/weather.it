import { geoDbApi } from './apiSettings';
import { ISearchItem } from '../types';

export async function getSearchCitiesList(name: string): Promise<Array<ISearchItem>> {
  try {
    const { data } = await geoDbApi.get(`/cities?limit=7&languageCode=en&minPopulation=100000&sort=-population,-elevation&namePrefix=${name}`);

    return data.data.map((city: ISearchItem) => {
      return {
        id: city.id,
        name: city.name,
        country: city.country
      };
    });
  } catch (error) {
    throw new Error('Something went wrong with getting cities list. Please try again later.');
  }
}
