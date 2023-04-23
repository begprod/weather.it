import { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonUpdate, GithubCorner } from '../ui';
import { updateWeatherData } from '../../features/weather/weather-slice';
import { AppDispatch } from '../../store';

interface IDefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout: FC<IDefaultLayoutProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateWeatherData())
      .unwrap()
      .catch((error) => {
        toast.error(error.message, {
          toastId: 'updateWeatherDataError'
        });
      });
  }, []);

  return (
    <div className="font-body">
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pr-6 pb-32 pl-6">
        {props.children}
      </div>

      <ButtonUpdate />

      <ToastContainer
          position="bottom-center"
          theme="colored"
          draggableDirection="y"
          autoClose={3000}
          draggablePercent={60}
          limit={3}
        />

      <GithubCorner
        url="https://github.com/begprod/weather.it"
      />
    </div>
  );
};
