import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RiLoaderLine } from 'react-icons/ri';
import { ICityWeather } from '../interfaces';
import { selectWeatherList, selectWeatherStatus, selectWeatherErrorMessage } from '../features/weather/weather-slice';
import { CityWeatherCard, CityWeatherCardSkeleton } from './';

export const CityWeatherCardLayout: FC = () => {
  const citiesList = useSelector(selectWeatherList);
  const status = useSelector(selectWeatherStatus);
  const errorMessage = useSelector(selectWeatherErrorMessage);

  function render() {
    if (status === 'error') {
      return (
        <div className="grid grid-cols-3 w-full pl-24 pr-24 pb-24 gap-16 mt-28">
          {errorMessage}
        </div>
      );
    }


    return citiesList.map((city: ICityWeather, index: number) => {
      return (
        <CityWeatherCard
          key={`${city.name}_${index}`}
          city={city}
        />
      );
    });
  }

  return (
    <div className="grid grid-cols-3 w-full pl-24 pr-24 pb-24 gap-16 mt-28">
      {render()}
      {status === 'loading' && <CityWeatherCardSkeleton />}
    </div>
  );
};
