import {
  FC,
  useEffect,
  useState,
  useContext,
  useCallback
} from 'react';
import { IFoundCity, ICitiesList } from '../interfaces';
import { CitiesContext } from '../store/cities-context';
import { SearchInput } from './SearchInput';
import { SearchListItem } from './SearchListItem';
import { useDebounce } from "../hooks/useDebounce";
import { getCities } from '../services/api';

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
        <div className="absolute left-0 top-full w-full bg-gray-300 rounded-lg drop-shadow-2xl z-50">
          {isLoading && searchQuery.length !== 0
            ? (
              <div className="flex items-center justify-center h-10">
                <div className="animate-spin">
                  🌀
                </div>
              </div>
            )
            : (
              (foundCitiesList.length === 0 && searchQuery.length !== 0)
              ? (
                <div className="flex items-center justify-center h-10">
                  <p className="text-sm">City not found</p>
                </div>
              )
              : (
              foundCitiesList.map((city: IFoundCity, index: number) => {
                return (
                  <SearchListItem
                    key={`${city.name}${city.country}_${index}`}
                    city={city}
                    onSelectItem={selectItemHandler}
                  />
                )
              }))
            )
          }
        </div>
      </div>
    </>
  );
}
