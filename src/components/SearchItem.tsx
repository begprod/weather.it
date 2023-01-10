import { FC } from 'react';

interface IItemListProps {
  title: string;
  onSelectItem: (item: string) => void;
}

export const SearchItem: FC<IItemListProps> = (props) => {
  function selectItem(item: string) {
    props.onSelectItem(item);
  }

  return (
    <div key={props.title} className="flex items-center p-2">
      <div
        className="flex items-center hover:bg-gray-100 cursor-pointer"
        onClick={() => selectItem(props.title)}
      >
        ➕
        <span className="ml-2">
          {props.title}
        </span>
      </div>
    </div>
  );
};
