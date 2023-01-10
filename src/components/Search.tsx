import { FC, useEffect, useState } from 'react';
import { useDebounce } from "../hooks/useDebounce";
import { ICity, getCities } from '../services/api';
import { Input } from './Input';
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
      <div className="relative">
        <Input
          id="city_search"
          type="text"
          label="Search"
          icon="🔍"
          placeholder="City name"
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
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
