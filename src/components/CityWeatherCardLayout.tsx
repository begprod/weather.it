import { FC } from 'react';
import { useSelector } from 'react-redux';
import { ICityWeather, IRootState } from '../interfaces';
import { selectWeatherList, selectWeatherStatus, selectWeatherErrorMessage } from '../features/weather/weather-slice';
import { CityWeatherCard, CityWeatherCardSkeleton } from './';

export const CityWeatherCardLayout: FC = () => {
  const citiesList = useSelector(selectWeatherList);
  const status = useSelector(selectWeatherStatus);
  const errorMessage = useSelector((state: IRootState) => state.errorMessage);

  function render() {
    if (status === 'error') {
      return (
        <div className="w-full pl-24 pr-24 pb-24 mt-28">
          {errorMessage}
        </div>
      );
    }

    if (status === 'loading') {
      return citiesList.map((city: ICityWeather) => {
        return (
          <CityWeatherCardSkeleton
            key={city.id}
          />
        );
      });
    }

    return citiesList.map((city: ICityWeather) => {
      return (
        <>
          <CityWeatherCard
            key={city.id}
            city={city}
          />
        </>
      );
    });
  }

  return (
    <div className="grid grid-cols-3 w-full pl-24 pr-24 pb-24 gap-16 mt-28">
      {render()}
    </div>
  );
};
