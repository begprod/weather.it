import { imageApi } from './apiSettings';
import { generateRandomNumber } from '../helpers';

export async function getCityImage(query: string): Promise<String> {
  try {
    const { data } = await imageApi.get(`/?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`);

    return data.urls.regular;
  } catch (error: any) {
    if (error.response.status === 403 || error.response.status === 401 || error.response.status === 404) {
      return  `https://loremflickr.com/500/500?random=${generateRandomNumber(0, 100)}`;
    }

    throw new Error('Something went wrong with getting image data. Please try again later.');
  }
}
