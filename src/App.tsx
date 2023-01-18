import { FC, useContext, useCallback } from 'react';
import { ICityForecast } from './interfaces/ICityForecast';
import { CitiesContext } from './store/cities-context';
import { SearchLayout } from './components/SearchLayout';
import { CityForecastItem } from './components/CityForecastItem';

export const App: FC = () => {
  const citiesCtx = useContext(CitiesContext);
  const cities = useCallback(() => citiesCtx.getWeatherCitiesList(), [citiesCtx]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-1/3">
        <div className="flex justify-between mb-10 text-center text-5xl">
          {/*🌤 🌥 🌦 🌧 🌨 🌩*/}
          <div className="forecast forecast_clear"></div>
          <div className="forecast forecast_cloud"></div>
          <div className="forecast forecast_snow">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="forecast forecast_rain">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <SearchLayout/>
      </div>
      <div className="grid grid-cols-3 w-full pl-24 pr-24 pb-24 gap-16 mt-28">
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
