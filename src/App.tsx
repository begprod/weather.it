import {FC, useEffect, useState} from 'react';
import {useDebounce} from './hooks/useDebounce';
import {GEO_DB_API_OPTIONS} from './services/api';

interface ICity {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface ICitiesList {
  cities: Array<ICity>;
}

export const App: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [citiesList, setCitiesList] = useState<ICitiesList>({ cities: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 1100);

  useEffect(() => {
    if (debouncedSearch || searchQuery.length < 0) {
      setIsLoading(true);

      getCities()
        .then((data: ICitiesList) => {
          setCitiesList(data);
          setError(null);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
        });
    }

    async function getCities() {
      return await fetch(
        `${process.env.REACT_APP_GEO_DB_API_URL}/cities?limit=10&languageCode=en&minPopulation=500000&namePrefix=${searchQuery}`,
        GEO_DB_API_OPTIONS
      )
      .then(async (response) => {
        const citiesData = await response.json();

        return {
          cities: citiesData.data.map((city: ICity) => {
            return {
              name: city.name,
              country: city.country,
              latitude: city.latitude,
              longitude: city.longitude,
            }
          })
        }
      })
    }
  }, [debouncedSearch]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-1/3">
        <div className="mb-5 text-center text-5xl">
          🌤 🌥 🌦 🌧 🌨 🌩
        </div>
        <form>
          <label htmlFor="default-search"
                 className="mb-2 text-sm sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              id="default-search"
              type="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              placeholder="City name"
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery}
              required
              autoComplete="off"
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2">
              Add city
            </button>
            <div className="absolute left-0 top-full w-full bg-gray-300 rounded-lg">
              {
                isLoading && searchQuery.length !== 0 ? (
                  <div className="flex items-center justify-center h-10">
                    <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg"
                          fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                              strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"></path>
                    </svg>
                  </div>
                ) : (
                  citiesList.cities.map((city: ICity) => {
                    return (
                      <div key={city.name} className="flex items-center p-2">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          <span className="ml-2">{city.name}, {city.country}</span>
                        </div>
                      </div>
                    )
                  }))
                }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
