import { FC } from 'react';
import { TfiPin } from 'react-icons/tfi';
import { HiOutlineGlobe } from 'react-icons/hi';
import { ISearchItem } from '../types';

interface IItemListProps {
  city: ISearchItem;
  onSelectItem: (item: ISearchItem) => void;
}

export const SearchResultItem: FC<IItemListProps> = (props) => {
  function selectItem(item: ISearchItem) {
    props.onSelectItem(item);
  }

  return (
    <div className="flex items-center">
      <div
        className="group flex items-center w-full p-2 hover:bg-gray-200 transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={() => selectItem(props.city)}
      >
        <div className="flex flex-col items-center justify-center mr-3 opacity-30 overflow-hidden">
          <TfiPin className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
          <HiOutlineGlobe className="w-5 h-5 translate-y-5 group-hover:-translate-y-2 group-hover:opacity-100 transition-transform duration-300" />
        </div>
        <div className="truncate text-xl">
          <p>{props.city.name}</p>
          <p className="text-sm">{props.city.country}</p>
        </div>
      </div>
    </div>
  );
};
