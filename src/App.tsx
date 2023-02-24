import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { IconsDoodle, SearchBar, CardGrid, ButtonUpdate } from './components';
import { updateWeatherData, selectWeatherList, selectWeatherStatus, selectLastUpdateDate } from './features/weather/weather-slice';

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherCitiesList = useSelector(selectWeatherList);
  const lastUpdate = useSelector(selectLastUpdateDate);
  const status = useSelector(selectWeatherStatus);

  useEffect(() => {
    dispatch(updateWeatherData());
  }, [])

  return (
    <div className="font-body min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pb-32 pl-6">
      <div className="w-full md:w-[500px]">
        <IconsDoodle />
        <SearchBar />
      </div>
      <CardGrid />
      {weatherCitiesList.length > 0 && (
        <ButtonUpdate
          isLoading={status === 'updating'}
          subText={lastUpdate ? `${lastUpdate}` : ''}
          onclick={() => dispatch(updateWeatherData())}
        />
      )}
    </div>
  );
}
