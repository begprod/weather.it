import { FC, useEffect, useState } from 'react';
import { useDebounce } from "../hooks/useDebounce";
import { ICity, getCities } from '../services/api';
import { SearchItem } from './SearchItem';

export interface ICitiesList {
  cities: Array<ICity>;
}
export const Search: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [citiesList, setCitiesList] = useState<ICitiesList>({ cities: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 1100);

  useEffect(() => {
    setIsLoading(true);

    if (searchQuery === '') {
      setCitiesList({ cities: [] });
      setIsLoading(false);
      return;
    }
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearch) {
      getCities(searchQuery)
        .then((data: ICitiesList) => {
          setCitiesList(data);
          setError(null);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [debouncedSearch]);

  function selectItemHandler(item: string) {
    console.log('item from parent', item);
  }

  return (
    <form>
      <label
        htmlFor="city-search"
        className="mb-2 text-sm sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          🔍
        </div>
        <input
          id="city-search"
          type="text"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
          placeholder="City name"
          onChange={(event) => setSearchQuery(event.target.value)}
          value={searchQuery}
          required
          autoComplete="off"
        />
        <div className="absolute left-0 top-full w-full bg-gray-300 rounded-lg">
          {
            isLoading && searchQuery.length !== 0 ? (
              <div className="flex items-center justify-center h-10">
                <div className="animate-spin">
                  🌀
                </div>
              </div>
            ) : (
              citiesList.cities.map((city: ICity) => {
                return (
                  <SearchItem
                    key={`${city.name}${city.country}`}
                    title={`${city.name}, ${city.country}`}
                    onSelectItem={() => selectItemHandler(city.name)}
                  />
                )
              }))
          }
        </div>
      </div>
    </form>
  );
}
