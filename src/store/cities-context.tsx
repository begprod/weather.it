import { FC, createContext, useState } from 'react';
import { ICity } from '../interfaces/ICity';

interface ICitiesContextProps {
  children: React.ReactNode;
}

interface ICitiesContext {
  cities: Array<ICity>;
  getCitiesList: () => Array<ICity>;
  addCity: (city: ICity) => void;
  removeCity: (city: ICity) => void;
}

export const CitiesContext = createContext<ICitiesContext>({
  cities: [],
  addCity: () => {},
  removeCity: () => {},
  getCitiesList: () => [],
});

export const CitiesContextProvider: FC<ICitiesContextProps> = (props) => {
  const [cities, setCities] = useState<Array<ICity>>([]);

  function addCityHandler(city: ICity) {
    console.log('addCityHandler', city);

    setCities((prevCities) => {
      return prevCities.concat(city);
    });
  }

  function removeCityHandler(city: ICity) {
    console.log('removeCityHandler', city);

    setCities((prevCities) => {
      return prevCities.filter((c) => c !== city);
    });
  }

  function getCitiesListHandler(): ICity[] {
    return cities as ICity[];
  }

  const context = {
    cities,
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
