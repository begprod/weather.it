import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrUpdate } from 'react-icons/gr';
import { AppDispatch } from './store';
import { WeatherIconsDoodle } from './components';
import { SearchLayout } from './components';
import { CityWeatherCardLayout } from './components';
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
        <button
          className="fixed rounded-full right-6 bottom-6 border p-5 hover:rotate-45 transition-transform duration-300"
          onClick={() => dispatch(updateWeatherData())}
        >
          {status === 'updating' ? <div className="animate-spin"><GrUpdate /></div> : <GrUpdate />}
        </button>
      )}
    </div>
  );
}
