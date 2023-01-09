import { FC } from 'react';
import { Search } from './components/Search';

export const App: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-1/3">
        <div className="mb-5 text-center text-5xl">
          🌤 🌥 🌦 🌧 🌨 🌩
        </div>
        <Search />
      </div>
    </div>
  );
}
