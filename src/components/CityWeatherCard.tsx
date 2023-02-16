import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { IoIosPin } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { VscCircleOutline } from 'react-icons/vsc';
import { ICityWeather } from '../interfaces';
import { AppDispatch } from '../store';
import { weatherActions } from '../features/weather/weather-slice'
import { generateParticles } from '../helpers';

type weatherTypes = {
  [key: string]: string;
}

const weatherTypes: weatherTypes = {
  'Clear': 'clear',
  'Clouds': 'cloud',
  'Thunderstorm': 'thunder',
  'Tornado': 'thunder',
  'Drizzle':  'drizzle',
  'Rain': 'rain',
  'Snow':  'snow',
  'Smoke': 'smoke',
  'Haze': 'smoke',
  'Squall': 'smoke',
  'Mist': 'mist',
  'Fog': 'smoke',
  'Dust': 'dust',
  'Sand': 'dust',
  'Ash': 'dust',
}

interface ICityWeatherItemProps {
  city: ICityWeather;
}
const CityWeatherCardItem: FC<ICityWeatherItemProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  function setWeatherType(type: string) {
    const weatherType = weatherTypes[type];
    return weatherType;
  };

  return (
    <div className="group relative min-h-[350px] p-10 text-white overflow-hidden rounded-[20px] shadow-md">
      <div className="relative z-30 select-none">
        <div className="flex items-start text-2xl">
          <IoIosPin className="w-7 h-8 shrink-0 mr-1"/>
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
        <div className={`mt-5 weather-icon weather-icon_${setWeatherType(props.city.weather.main)}`}>
          {generateParticles()}
        </div>
      </div>
      <button
        className="group-hover:block absolute top-3 right-3 z-30 hidden"
        onClick={() => dispatch(weatherActions.removeCity(props.city))}
      >
        <MdOutlineClose className="w-7 h-7"/>
      </button>
      <div className="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50" />
      <div
        className="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${props.city.image})` }}
      />
    </div>
  );
}

export const CityWeatherCard = memo(CityWeatherCardItem);
