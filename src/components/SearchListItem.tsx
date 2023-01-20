import { FC } from 'react';
import { IFoundCity } from '../interfaces';

interface IItemListProps {
  city: IFoundCity;
  onSelectItem: (item: IFoundCity) => void;
}

export const SearchListItem: FC<IItemListProps> = (props) => {
  function selectItem(item: IFoundCity) {
    props.onSelectItem(item);
  }

  return (
    <div key={props.city.name} className="flex items-center p-2">
      <div
        className="flex items-center hover:bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => selectItem(props.city)}
      >
        ➕
        <div className="ml-2 truncate">
          {props.city.name}, {props.city.country}
        </div>
      </div>
    </div>
  );
};
