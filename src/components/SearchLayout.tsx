import {
  FC,
  useEffect,
  useState,
  useContext,
  useCallback
} from 'react';
import { MdOutlineLocationOff } from 'react-icons/md';
import { RiLoaderLine } from 'react-icons/ri';
import { IFoundCity, ICitiesList } from '../interfaces';
import { getCities } from '../services/api';
import { CitiesContext } from '../store/cities-context';
import { useDebounce } from "../hooks";
import { SearchInput, SearchResultItem } from './';

export const SearchLayout: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foundCitiesList, setFoundCitiesList] = useState<Array<IFoundCity>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const citiesCtx = useContext(CitiesContext);
  const weatherCitiesList = useCallback(() => citiesCtx.getWeatherCitiesList(), [citiesCtx]);

  const debouncedSearch = useDebounce(searchQuery, 1100);

  useEffect(() => {
    setIsLoading(true);

    if (searchQuery === '') {
      setFoundCitiesList([]);
      setIsLoading(false);
      return;
    }
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearch) {
      getCities(searchQuery)
        .then((data: ICitiesList) => {
          const result = data.cities.filter((city) => {
            return !weatherCitiesList().some((item) => item.name === city.name);
          });

          setFoundCitiesList(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedSearch]);

  function selectItemHandler(item: IFoundCity) {
    citiesCtx.addCity(item);
    setSearchQuery('');
  }

  function renderSearchResults() {
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

    return foundCitiesList.map((city: IFoundCity, index: number) => {
      return (
        <SearchResultItem
          key={`${city.name}${city.country}_${index}`}
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
          {renderSearchResults()}
        </div>
      </div>
    </>
  );
}
