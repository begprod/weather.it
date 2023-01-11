import { FC, useContext, useCallback, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal} from 'react';
import {Search} from './components/Search';
import {CitiesContext} from './store/cities-context';

export const App: FC = () => {
  const citiesCtx = useContext(CitiesContext);
  const cities = useCallback(() => citiesCtx.getCitiesList(), [citiesCtx]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-1/3">
        <div className="mb-5 text-center text-5xl">
          🌤 🌥 🌦 🌧 🌨 🌩
        </div>
        <Search/>
      </div>
      <div>
        {cities().map((city) => city)}
      </div>
    </div>
  );
}
