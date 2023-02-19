import { FC } from 'react';
import { useSelector } from 'react-redux';
import { ICityWeather } from '../types';
import { selectWeatherList, selectWeatherStatus, selectCityImages, selectWeatherErrorMessage } from '../features/weather/weather-slice';
import { CityWeatherCard, CityWeatherCardSkeleton } from './';

export const CityWeatherCardLayout: FC = () => {
  const citiesList = useSelector(selectWeatherList);
  const status = useSelector(selectWeatherStatus);
  const images = useSelector(selectCityImages);
  const errorMessage = useSelector(selectWeatherErrorMessage);

  return (
    <div className="grid grid-cols-3 w-full pl-24 pr-24 pb-24 gap-16 mt-28">
      {citiesList.map((city: ICityWeather) => {
        return (
          <CityWeatherCard
            key={city.id}
            city={city}
            image={images[city.id].urls.regular}
          />
        );
      })}
      {status === 'error' && <div>{errorMessage}</div>}
      {status === 'loading' && <CityWeatherCardSkeleton />}
    </div>
  );
};
