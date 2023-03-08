import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AppDispatch } from './store';
import { IconsDoodle, SearchBar, CardGrid, ButtonUpdate } from './components';
import { updateWeatherData } from './features/weather/weather-slice';

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateWeatherData())
      .unwrap()
      .catch((error) => {
        toast.error(error.message, {
          toastId: 'updateWeatherDataError'
        });
      });
  }, [])

  return (
    <div className="font-body min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pb-32 pl-6">
      <div className="w-full md:w-[500px]">
        <IconsDoodle />
        <SearchBar />
      </div>

      <CardGrid />

      <ButtonUpdate />

      <ToastContainer
        position="bottom-center"
        theme="colored"
        draggableDirection="y"
        autoClose={3000}
        draggablePercent={60}
        limit={3}
      />
    </div>
  );
}
