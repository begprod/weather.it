import { FC } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

interface IInputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  required?: boolean;
  autoComplete?: string;
  onChange: (event: string) => void;
}

export const SearchInput: FC<IInputProps> = (props) => {
  return (
    <>
      <label
        htmlFor={props.id}
        className="mb-2 text-sm sr-only dark:text-white"
      >
        {props.label}
      </label>
      <div className="relative">
        <input
          className="block w-full pt-3 pr-5 pb-3 pl-5 text-2xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 shadow-md shadow-gray-300 hover:shadow-lg focus:shadow-2xl focus:outline-none transition-shadow duration-300"
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          required={props.required}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
          <HiOutlineSearch className="w-8 h-8 text-indigo-300" />
        </div>
      </div>
    </>
  )
}
