import { FC, useContext, useCallback } from 'react';
import {Search} from './components/Search';
import {CitiesContext} from './store/cities-context';
import { ICity } from './interfaces/ICity';

export const App: FC = () => {
  const citiesCtx = useContext(CitiesContext);
  const cities = useCallback(() => citiesCtx.getCitiesList(), [citiesCtx]);
  const removeCity = useCallback((city: ICity) => citiesCtx.removeCity(city), [citiesCtx]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-1/3">
        <div className="mb-5 text-center text-5xl">
          🌤 🌥 🌦 🌧 🌨 🌩
        </div>
        <Search/>
      </div>
      <div>
        selected cities:
        {cities().map((city: ICity, index: number) => (
          <div key={`${city.name}_${index}`}>
            {city.name}, {city.country}
            <button
              className="ml-2"
              onClick={() => removeCity(city)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
