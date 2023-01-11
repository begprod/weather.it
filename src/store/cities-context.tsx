import { FC, createContext, useState } from 'react';

interface ICitiesContextProps {
  children: React.ReactNode;
}

export const CitiesContext = createContext({
  cities: [],
  addCity: (city: string) => {},
  removeCity: (city: string) => {},
  getCitiesList: () => [],
});

export const CitiesContextProvider: FC<ICitiesContextProps> = (props) => {
  const [cities, setCities] = useState([]);

  function addCityHandler(city: string) {
    setCities((prevCities) => {
      // @ts-ignore
      return prevCities.concat(city);
    });
  }

  function removeCityHandler(city: string) {
    setCities((prevCities) => {
      return prevCities.filter((c) => c !== city);
    });
  }

  function getCitiesListHandler() {
    return cities;
  }

  const context = {
    cities: cities,
    addCity: addCityHandler,
    removeCity: removeCityHandler,
    getCitiesList: getCitiesListHandler,
  };

  return (
    <CitiesContext.Provider value={context}>
      {props.children}
    </CitiesContext.Provider>
  );
};
