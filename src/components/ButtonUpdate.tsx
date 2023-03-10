import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { GrUpdate } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import {
  selectWeatherList,
  selectLastUpdateDate,
  selectStatus,
  updateWeatherData
} from '../features/weather/weather-slice';

export const ButtonUpdate: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const citiesList = useSelector(selectWeatherList);
  const lastUpdate = useSelector(selectLastUpdateDate);
  const status = useSelector(selectStatus);

  return (
    <>
      {citiesList.length > 0 && (
        <div className="fixed right-6 bottom-6 flex flex-col items-center z-50">
          <button
            className="rounded-full bg-white border p-3 md:p-5 shadow-sm shadow-gray-200 hover:rotate-45 hover:shadow-lg transition-all duration-300"
            onClick={() => dispatch(updateWeatherData())}
            type="button"
          >
            {status === 'updating' ? <div className="animate-spin"><GrUpdate /></div> : <GrUpdate />}
          </button>
          {lastUpdate && (
            <span className="mt-1 md:mt-3 p-[2px] rounded-[3px] text-[10px] md:text-xs text-gray-500 bg-white">{lastUpdate}</span>
          )}
        </div>
      )}
    </>
  );
};

ButtonUpdate.displayName = 'ButtonUpdate';
