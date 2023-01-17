import { FC, useContext, useCallback } from 'react';
import { SearchLayout } from './components/SearchLayout';
import { CityForecastItem } from './components/CityForecastItem';
import { CitiesContext } from './store/cities-context';
import { ICityForecast } from './interfaces/ICityForecast';

export const App: FC = () => {
  const citiesCtx = useContext(CitiesContext);
  const cities = useCallback(() => citiesCtx.getWeatherCitiesList(), [citiesCtx]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-1/3">
        <div className="mb-5 text-center text-5xl">
          🌤 🌥 🌦 🌧 🌨 🌩
        </div>
        <SearchLayout/>
      </div>
      <div className="grid grid-cols-3 w-full pl-24 pr-24 gap-16 mt-28">
        {cities().map((city: ICityForecast, index: number) => (
          <CityForecastItem
            key={`${city.name}_${index}`}
            city={city}
          />
        ))}
      </div>
    </div>
  );
}
