import { FC, useContext, useCallback } from 'react';
import { ICityWeather } from './interfaces';
import { CitiesContext } from './store/cities-context';
import { SearchLayout } from './components/SearchLayout';
import { CityWeatherCard } from './components/CityWeatherCard';

export const App: FC = () => {
  const citiesCtx = useContext(CitiesContext);
  const cities = useCallback(() => citiesCtx.getWeatherCitiesList(), [citiesCtx]);
  const particlesNumber = 10;

  let particles = [];
  for (let i = 0; i < particlesNumber; i++) {
    particles.push(<div key={i}></div>);
  }

  return (
    <div className="font-body flex flex-col items-center justify-center pt-32 pr-12 pb-32 pl-12 min-h-screen">
      <div className="w-full md:w-[500px]">
        <div className="forecast-doodle flex justify-between mb-10 text-center text-5xl">
          <div className="forecast forecast_clear"></div>
          <div className="forecast forecast_cloud"></div>
          <div className="forecast forecast_snow">
            {particles}
          </div>
          <div className="forecast forecast_dust">
            {particles}
          </div>
        </div>
        <SearchLayout/>
      </div>
      <div className="grid grid-cols-3 w-full pl-24 pr-24 pb-24 gap-16 mt-28">
        {cities().map((city: ICityWeather, index: number) => (
          <CityWeatherCard
            key={`${city.name}_${index}`}
            city={city}
          />
        ))}
      </div>
    </div>
  );
}
