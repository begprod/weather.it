import { FC } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { selectLastUpdateDate } from '../features/weather/weather-slice';

interface IUpdateButtonProps {
  isLoading: boolean;
  onclick: () => void;
}

export const ButtonUpdate: FC<IUpdateButtonProps> = (props) => {
  const lastUpdate = useSelector(selectLastUpdateDate);

  return (
    <div className="fixed right-6 bottom-6 flex flex-col items-center z-50">
      <button
        className="rounded-full bg-white border p-3 md:p-5 shadow-sm shadow-gray-200 hover:rotate-45 hover:shadow-lg transition-all duration-300"
        onClick={() => props.onclick()}
      >
        {props.isLoading ? <div className="animate-spin"><GrUpdate /></div> : <GrUpdate />}
      </button>
      {lastUpdate && (
        <span className="mt-1 md:mt-3 p-[2px] rounded-[3px] text-[10px] md:text-xs text-gray-500 bg-white">{lastUpdate}</span>
      )}
    </div>
  )
};
