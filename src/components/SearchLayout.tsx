import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocationOff } from 'react-icons/md';
import { RiLoaderLine } from 'react-icons/ri';
import { getSearchCitiesList } from '../services/api';
import { ISearchItem, ISearchItemList } from '../types';
import { AppDispatch } from '../store';
import { useDebounce } from "../hooks";
import { getCityData, selectWeatherList } from '../features/weather/weather-slice'
import { SearchInput, SearchResultItem } from './';

export const SearchLayout: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foundCitiesList, setFoundCitiesList] = useState<Array<ISearchItem>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const weatherCitiesList = useSelector(selectWeatherList);

  const debouncedSearch = useDebounce(searchQuery, 1100);

  useEffect(() => {
    setIsLoading(true);

    if (searchQuery === '') {
      setFoundCitiesList([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearch) {
      getSearchCitiesList(searchQuery)
        .then((data: ISearchItemList) => {
          const result = data.cities.filter((city) => {
            return !weatherCitiesList.some((item) => item.id === city.id);
          });

          setFoundCitiesList(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedSearch]);

  function selectItemHandler(item: ISearchItem) {
    dispatch(getCityData(item));
    setSearchQuery('');
  }

  function render() {
    if (isLoading && searchQuery.length !== 0) {
      return (
        <div className="flex items-center justify-center p-3">
          <div className="animate-spin">
            <RiLoaderLine className="w-6 h-6 opacity-30" />
          </div>
        </div>
      );
    }

    if (foundCitiesList.length === 0 && searchQuery.length !== 0) {
      return (
        <div className="flex items-center justify-center p-3 select-none">
          <MdOutlineLocationOff className="w-6 h-6 mr-3 opacity-30" />
          <p className="text-xl">City not found</p>
        </div>
      );
    }

    return foundCitiesList.map((city: ISearchItem, index: number) => {
      return (
        <SearchResultItem
          key={city.id}
          city={city}
          onSelectItem={selectItemHandler}
        />
      );
    });
  }

  return (
    <>
      <div className="relative">
        <SearchInput
          id="city_search"
          type="text"
          label="Search"
          placeholder="Start typing city name..."
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          autoComplete="off"
        />
        <div className="absolute left-0 top-full w-full bg-gray-100 rounded-xl z-50 shadow-sm shadow-gray-200 overflow-hidden">
          {render()}
        </div>
      </div>
    </>
  );
}
