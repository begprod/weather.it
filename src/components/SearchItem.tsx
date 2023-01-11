import { FC } from 'react';
import { ICity } from '../interfaces/ICity';

interface IItemListProps {
  city: ICity;
  onSelectItem: (item: ICity) => void;
}

export const SearchItem: FC<IItemListProps> = (props) => {
  function selectItem(item: ICity) {
    props.onSelectItem(item);
  }

  return (
    <div key={props.city.name} className="flex items-center p-2">
      <div
        className="flex items-center hover:bg-gray-100 cursor-pointer"
        onClick={() => selectItem(props.city)}
      >
        ➕
        <span className="ml-2">
          {props.city.name}, {props.city.country}
        </span>
      </div>
    </div>
  );
};
