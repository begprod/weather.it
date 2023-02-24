import { FC } from 'react';
import { useSelector } from 'react-redux';
import { ICityWeather } from '../types';
import { selectWeatherList, selectWeatherStatus, selectCityImages, selectWeatherErrorMessage } from '../features/weather/weather-slice';
import { CardCity, CardCitySkeleton } from './';

export const CardGrid: FC = () => {
  const citiesList = useSelector(selectWeatherList);
  const status = useSelector(selectWeatherStatus);
  const images = useSelector(selectCityImages);
  const errorMessage = useSelector(selectWeatherErrorMessage);

  return (
    <div className="w-full max-w-screen-2xl m-auto grid grid-cols-1 gap-4 mt-20 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-8">
      {citiesList.map((city: ICityWeather) => {
        return (
          <CardCity
            key={city.id}
            city={city}
            image={images[city.id].urls.regular}
          />
        );
      })}
      {status === 'error' && <div>{errorMessage}</div>}
      {status === 'loading' && <CardCitySkeleton />}
    </div>
  );
};
