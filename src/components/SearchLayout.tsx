import { FC, useEffect, useState, useContext } from 'react';
import { useDebounce } from "../hooks/useDebounce";
import { SearchInput } from './SearchInput';
import { SearchListItem } from './SearchListItem';
import { getCities } from '../services/api';
import { IFoundCity } from '../interfaces/IFoundCity';
import { ICitiesList } from '../interfaces/ICitiesList';
import { CitiesContext } from '../store/cities-context';

export const SearchLayout: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foundCitiesList, setFoundCitiesList] = useState<ICitiesList>({ cities: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const citiesCtx = useContext(CitiesContext);

  const debouncedSearch = useDebounce(searchQuery, 1100);

  useEffect(() => {
    setIsLoading(true);

    if (searchQuery === '') {
      setFoundCitiesList({ cities: [] });
      setIsLoading(false);
      return;
    }
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearch) {
      getCities(searchQuery)
        .then((data: ICitiesList) => {
          setFoundCitiesList(data);
          setError(null);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [debouncedSearch]);

  function selectItemHandler(item: IFoundCity) {
    citiesCtx.addCity(item);
    setSearchQuery('');
  }

  return (
    <form>
      <div className="relative">
        <SearchInput
          id="city_search"
          type="text"
          label="Search"
          icon="🔍"
          placeholder="City name"
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
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
              foundCitiesList.cities.map((city: IFoundCity, index: number) => {
                return (
                  <SearchListItem
                    key={`${city.name}${city.country}_${index}`}
                    city={city}
                    onSelectItem={selectItemHandler}
                  />
                )
              }))
          }
        </div>
      </div>
    </form>
  );
}
