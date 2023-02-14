import { FC } from 'react';
import { WeatherIconsDoodle } from './components';
import { SearchLayout } from './components';
import { CityWeatherCardLayout } from './components';

export const App: FC = () => {
  return (
    <div className="font-body flex flex-col items-center justify-center pt-32 pr-12 pb-32 pl-12 min-h-screen">
      <div className="w-full md:w-[500px]">
        <WeatherIconsDoodle />
        <SearchLayout />
      </div>
      <CityWeatherCardLayout />
    </div>
  );
}
