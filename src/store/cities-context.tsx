import { FC, createContext, useState } from 'react';
import { getForecast, getCityImage } from '../services/api';
import { IFoundCity, ICityWeather } from "../interfaces";

interface ICitiesContextProps {
  children: React.ReactNode;
}

interface ICitiesContext {
  citiesWeatherList: Array<ICityWeather>;
  getWeatherCitiesList: () => Array<ICityWeather>;
  addCity: (city: IFoundCity) => void;
  removeCity: (city: ICityWeather) => void;
}

export const CitiesContext = createContext<ICitiesContext>({
  citiesWeatherList: [],
  addCity: () => {},
  removeCity: () => {},
  getWeatherCitiesList: () => [],
});

export const CitiesContextProvider: FC<ICitiesContextProps> = (props) => {
  const [citiesWeatherList, setCitiesWeatherList] = useState<Array<ICityWeather>>([]);

  async function addCityHandler(city: IFoundCity) {
    await Promise.all([
      getForecast(city.name),
      getCityImage(city.name),
    ])
      .then((data: Awaited<any>) => {
        const cityWeather = {
          name: city.name,
          weather: data[0].weather,
          image: data[1].urls.regular,
        } as ICityWeather;

        setCitiesWeatherList((prevState) => {
          return [...prevState, cityWeather];
        });
      });
  }

  function removeCityHandler(city: ICityWeather) {
    setCitiesWeatherList((prevCities) => {
      return prevCities.filter((item) => item !== city);
    });
  }

  function getCitiesListHandler(): ICityWeather[] {
    return citiesWeatherList;
  }

  const context = {
    citiesWeatherList,
    addCity: addCityHandler,
    removeCity: removeCityHandler,
    getWeatherCitiesList: getCitiesListHandler,
  };

  return (
    <CitiesContext.Provider value={context}>
      {props.children}
    </CitiesContext.Provider>
  );
};
