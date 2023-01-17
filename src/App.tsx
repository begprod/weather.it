import { FC, useContext, useCallback } from 'react';
import { SearchLayout } from './components/SearchLayout';
import { CitiesContext } from './store/cities-context';
import { ICityWeather } from './interfaces/ICityWeather';

export const App: FC = () => {
  const citiesCtx = useContext(CitiesContext);
  const cities = useCallback(() => citiesCtx.getWeatherCitiesList(), [citiesCtx]);
  const removeCity = useCallback((city: ICityWeather) => citiesCtx.removeCity(city), [citiesCtx]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-1/3">
        <div className="mb-5 text-center text-5xl">
          🌤 🌥 🌦 🌧 🌨 🌩
        </div>
        <SearchLayout/>
      </div>
      <div className="grid grid-cols-3 w-full pl-24 pr-24 gap-16 mt-28">
        {cities().map((city: ICityWeather, index: number) => (
          <div
            className="h-[300px] drop-shadow-md rounded-lg text-white p-10 hover:bg-amber-300 transition-colors bg-cover bg-center group bg-blend-darken"
            key={`${city.name}_${index}`}
            style={{ backgroundImage: `url(${city.image})` }}
          >
            <p className="text-xl">{city.name}</p>
            <p className="text-3xl">{city.weather.current}</p>
            <p className="text-sm">feels like: {city.weather.feels_like}</p>
            <p className="text-sm">{city.weather.description}</p>
            <button
              className="absolute top-3 right-3 hidden group-hover:block"
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
