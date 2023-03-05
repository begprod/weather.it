import axios, { AxiosInstance } from 'axios';

export const geoDbApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_GEO_DB_API_URL,
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_GEO_DB_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  }
});

export const weatherApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
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
