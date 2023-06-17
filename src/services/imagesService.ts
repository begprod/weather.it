import { imageApi } from './apiSettings';
import { generateRandomNumber } from '@/helpers';

export async function imagesService(query: string): Promise<string> {
  const url = `/?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY}`;

  return imageApi.get(url)
    .then((data) => {
      return data.data.urls.regular;
    })
    .catch((error) => {
      if (error.response.status === 403 || error.response.status === 401 || error.response.status === 404) {
        return `https://loremflickr.com/500/500?random=${generateRandomNumber(0, 100)}`;
      }

      throw new Error(error);
    });
}
