import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosPin } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { VscCircleOutline } from 'react-icons/vsc';
import { ICityWeather, IRootState, WeatherType } from '../types';
import { AppDispatch } from '../store';
import { weatherActions } from '../features/weather/weather-slice'
import { generateParticles } from '../helpers';
import { CityWeatherCardSkeleton } from './CityWeatherCardSkeleton';

interface ICityWeatherCardProps {
  city: ICityWeather;
  image: string;
}

const CityWeatherCardItem: FC<ICityWeatherCardProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: IRootState) => state.status);

  function setWeatherTypeIcon(type: string): WeatherType {
    return WeatherType[type as keyof typeof WeatherType];
  }

  function render() {
    if (status === 'updating') {
      return (
        <CityWeatherCardSkeleton
          image={props.image}
        />
      )
    }

    return (
      <div className="group relative min-h-[350px] p-10 text-white overflow-hidden rounded-[20px] shadow-md">
        <div className="relative z-30 select-none">
          <div className="flex items-start text-2xl">
            <IoIosPin className="w-6 h-7 shrink-0 mr-1"/>
            {props.city.name}
          </div>
          <p className="flex items-start mt-2 mb-2 text-7xl font-bold">
            {props.city.weather.current}
            <VscCircleOutline className="w-7 h-7"/>
          </p>
          <p className="flex text-lg">feels like:
            <span className="flex items-start ml-1">
              {props.city.weather.feels_like}
              <VscCircleOutline className="w-3 h-3"/>
            </span>
          </p>
          <p className="text-sm">{props.city.weather.description}</p>
          <div className={`mt-5 weather-icon weather-icon_${setWeatherTypeIcon(props.city.weather.main)}`}>
            {generateParticles()}
          </div>
        </div>
        <button
          className="group-hover:block absolute top-3 right-3 z-30 hidden"
          onClick={() => dispatch(weatherActions.removeCity(props.city.id))}
        >
          <MdOutlineClose className="w-7 h-7"/>
        </button>
        <div className="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50" />
        <div
          className="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${props.image})` }}
        />
      </div>
    )
  }

  return (
    <>
      {render()}
    </>
  );
}

export const CityWeatherCard = memo((props: ICityWeatherCardProps) => (CityWeatherCardItem(props)));
