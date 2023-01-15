import { FC } from 'react';

interface IInputProps {
  icon: string;
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
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {props.icon}
        </div>
        <input
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          required={props.required}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </div>
    </>
  )
}
