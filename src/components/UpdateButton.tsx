import { FC } from 'react';
import { GrUpdate } from 'react-icons/gr';

interface IUpdateButtonProps {
  isLoading: boolean;
  onclick: () => void;
}

export const UpdateButton: FC<IUpdateButtonProps> = (props) => {
  return (
    <button
      className="fixed rounded-full right-6 bottom-6 border p-5 hover:rotate-45 transition-transform duration-300"
      onClick={() => props.onclick()}
    >
      {props.isLoading ? <div className="animate-spin"><GrUpdate /></div> : <GrUpdate />}
    </button>
  )
};
