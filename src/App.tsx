import { FC } from 'react';
import { DefaultLayout } from './components/layouts/Default';
import { IconsDoodle, SearchBar, CardGrid } from './components/ui';
import 'react-toastify/dist/ReactToastify.min.css';

export const App: FC = () => {
  return (
    <DefaultLayout>
       <div className="w-full md:w-[500px]">
          <IconsDoodle />
          <SearchBar />
        </div>

        <CardGrid />
    </DefaultLayout>
  );
};
