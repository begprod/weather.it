import { IFoundCity } from '../interfaces/IFoundCity';

const GEO_DB_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.REACT_APP_GEO_DB_API_KEY}`,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  }
};

export async function getCities(name: string): Promise<any> {
  return await fetch(
    `${process.env.REACT_APP_GEO_DB_API_URL}/cities?limit=10&languageCode=en&minPopulation=500000&namePrefix=${name}`,
    GEO_DB_API_OPTIONS
  )
    .then(async (response) => {
      const citiesData = await response.json();

      return {
        cities: citiesData.data.map((city: IFoundCity) => {
          return {
            name: city.name,
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude,
          }
        })
      }
    });
}

export async function getForecast(cityName: string) {
  return await fetch(`${process.env.REACT_APP_WEATHER_API_URL}/weather?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
    .then(async (response) => {
      if (response.status === 404) {
        throw new Error('City not found');
      }

      const weatherData = await response.json();

      return {
        name: weatherData.name,
        weather: {
          current: weatherData.main.temp.toFixed(0),
          feels_like: weatherData.main.feels_like.toFixed(0),
          description: weatherData.weather[0].description,
        }
      }
    });
}

export async function getCityImage(query: string) {
  return await fetch(`${process.env.REACT_APP_UNSPLASH_API_URL}/?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`, {
    headers: {
      'Authorization': `Client-ID ${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`
    }
  })
    .then(async (response) => {
      const photosData = await response.json();

      return {
        urls: photosData.urls
      }
    });
}
