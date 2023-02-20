import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { WeatherIconsDoodle, SearchLayout, CityWeatherCardLayout, UpdateButton } from './components';
import { selectWeatherList, selectWeatherStatus, updateWeatherData } from './features/weather/weather-slice';

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherCitiesList = useSelector(selectWeatherList);
  const status = useSelector(selectWeatherStatus);

  return (
    <div className="font-body flex flex-col items-center justify-center pt-32 pr-12 pb-32 pl-12 min-h-screen">
      <div className="w-full md:w-[500px]">
        <WeatherIconsDoodle />
        <SearchLayout />
      </div>
      <CityWeatherCardLayout />
      {weatherCitiesList.length > 0 && (
        <UpdateButton
          isLoading={status === 'updating'}
          onclick={() => dispatch(updateWeatherData())}
        />
      )}
    </div>
  );
}
