import { FC, useEffect, useState } from 'react';
import { useDebounce } from "../hooks/useDebounce";
import { ICity, getCities } from '../services/api';

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
                  <div key={city.name} className="flex items-center p-2">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-900"
                        fill="none" stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                        </path>
                      </svg>
                      <span className="ml-2">
                        {city.name}, {city.country}
                      </span>
                    </div>
                  </div>
                )
              }))
          }
        </div>
      </div>
    </form>
  );
}
