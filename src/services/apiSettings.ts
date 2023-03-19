import axios, { AxiosInstance } from 'axios';

export const citySuggestionsApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_GEOAPIFY_URL,
});

export const weatherApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_OPEN_WEATHER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const imageApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_UNSPLASH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});
