import { FC } from 'react';
import { TfiPin } from 'react-icons/tfi';
import { HiOutlineGlobe } from 'react-icons/hi';
import { ISearchSuggestItem } from '../types';

interface IItemListProps {
  city: ISearchSuggestItem;
  onSelectItem: (item: ISearchSuggestItem) => void;
}

export const SearchItem: FC<IItemListProps> = (props) => {
  function selectItem(item: ISearchSuggestItem) {
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
        <div className="text-xl overflow-hidden">
          <p className="truncate">{props.city.name}</p>
          <p className="text-sm truncate">{props.city.country}</p>
        </div>
      </div>
    </div>
  );
};

SearchItem.displayName = 'SearchItem';
