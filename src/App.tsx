import { FC, useContext, useCallback } from 'react';
import { ICityForecast } from './interfaces';
import { CitiesContext } from './store/cities-context';
import { SearchLayout } from './components/SearchLayout';
import { CityForecastItem } from './components/CityForecastItem';

export const App: FC = () => {
  const citiesCtx = useContext(CitiesContext);
  const cities = useCallback(() => citiesCtx.getWeatherCitiesList(), [citiesCtx]);

  return (
    <div className="flex flex-col items-center justify-center pt-32 pr-12 pb-32 pl-12 min-h-screen">
      <div className="w-full md:w-[500px]">
        <div className="flex justify-between mb-10 text-center text-5xl">
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
          <div className="forecast forecast_dust">
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
