import axios, { type AxiosInstance } from 'axios';

export const suggestionsCitiesApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_GEOAPIFY_API_URL,
});

export const weatherApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const imageApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_UNSPLASH_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
