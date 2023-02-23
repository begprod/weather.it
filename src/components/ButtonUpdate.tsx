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
        className="rounded-full border p-5 shadow-sm shadow-gray-200 hover:rotate-45 hover:shadow-lg transition-all duration-300"
        onClick={() => props.onclick()}
      >
        {props.isLoading ? <div className="animate-spin"><GrUpdate /></div> : <GrUpdate />}
      </button>
      <span className="mt-3 text-xs text-gray-400">{props.subText}</span>
    </div>
  )
};
