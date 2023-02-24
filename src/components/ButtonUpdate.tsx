import { FC } from 'react';
import { GrUpdate } from 'react-icons/gr';

interface IUpdateButtonProps {
  isLoading: boolean;
  subText?: string;
  onclick: () => void;
}

export const ButtonUpdate: FC<IUpdateButtonProps> = (props) => {
  return (
    <div className="fixed right-6 bottom-6 flex flex-col items-center z-50">
      <button
        className="rounded-full bg-white border p-3 md:p-5 shadow-sm shadow-gray-200 hover:rotate-45 hover:shadow-lg transition-all duration-300"
        onClick={() => props.onclick()}
      >
        {props.isLoading ? <div className="animate-spin"><GrUpdate /></div> : <GrUpdate />}
      </button>
      <span className="mt-1 md:mt-3 p-[2px] rounded-[3px] text-[10px] md:text-xs text-gray-500 bg-white">{props.subText}</span>
    </div>
  )
};
