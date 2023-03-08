import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocationOff } from 'react-icons/md';
import { RiLoaderLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { ISearchItem } from '../types';
import { AppDispatch } from '../store';
import { useDebounce } from "../hooks";
import {
  getSearchCities,
  getCityData,
  selectSearchCitiesResult,
  selectWeatherList,
  weatherActions
} from '../features/weather/weather-slice'
import { SearchInput, SearchItem } from './';

export const SearchBar: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const citiesList = useSelector(selectWeatherList);
  const searchCitiesList = useSelector(selectSearchCitiesResult);
  const debouncedSearch = useDebounce(searchQuery, 1100);

  useEffect(() => {
    setIsSearching(true);

    if (searchQuery.length === 0) {
      dispatch(weatherActions.setSearchCitiesResult([]));
      setIsSearching(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(getSearchCities(searchQuery))
        .unwrap()
        .then(() => {
          setIsSearching(false);
        })
        .catch((error) => {
          toast.error(error.message, {
            toastId: 'getSearchCitiesError'
          });
        });
    }
  }, [debouncedSearch]);

  function selectItemHandler(item: ISearchItem) {
    dispatch(getCityData(item))
      .unwrap()
      .then(() => {
        if (citiesList.length >= 6) {
          toast.success(`${item.name} city added`, {
            toastId: 'getCityDataSuccess'
          });
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          toastId: 'getCityDataError'
        });
      });
    setSearchQuery('');
  }

  function render() {
    if (isSearching && searchQuery.length !== 0) {
      return (
        <div className="flex items-center justify-center p-3">
          <div className="animate-spin">
            <RiLoaderLine className="w-6 h-6 opacity-30" />
          </div>
        </div>
      );
    }

    if (!isSearching && searchCitiesList.length === 0 && searchQuery.length !== 0) {
      return (
        <div className="flex items-center justify-center p-3 select-none">
          <MdOutlineLocationOff className="w-6 h-6 mr-3 opacity-30" />
          <p className="text-xl">City not found</p>
        </div>
      );
    }

    return searchCitiesList.map((city: ISearchItem) => {
      return (
        <SearchItem
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
};
