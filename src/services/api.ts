import { ICity } from '../interfaces/ICity';

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
        cities: citiesData.data.map((city: ICity) => {
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

export async function getWeather(city: string) {
  return await fetch(``)
    .then(async (response) => {
      const weatherData = await response.json();

      return {
        weather: weatherData
      }
    });
}
