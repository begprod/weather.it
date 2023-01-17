import {FC, useCallback, useContext} from 'react';
import { ICityForecast } from '../interfaces/ICityForecast';
import {CitiesContext} from "../store/cities-context";

// TODO: Сделать анимацию погоды в зависимости от main
// const forecastType = {
//   'Thunderstorm': 'thunderstorm',
//   'Drizzle': 'drizzle',
//   'Rain': 'rain',
//   'Snow': 'snow',
//   'Clear': 'clear',
//   'Clouds': 'clouds',
// }

interface ICityForecastItemProps {
  city: ICityForecast;
}
export const CityForecastItem: FC<ICityForecastItemProps> = (props) => {
  const citiesCtx = useContext(CitiesContext);
  const removeCity = useCallback((city: ICityForecast) => citiesCtx.removeCity(city), [citiesCtx]);

  return (
    <div
      className="group relative h-[300px] p-10 text-white overflow-hidden rounded-lg shadow-md shadow-gray-700"
    >
      <div className="relative z-50 select-none">
        <p className="text-xl">{props.city.name}</p>
        <p className="text-3xl">{props.city.weather.current}</p>
        <p className="text-sm">feels like: {props.city.weather.feels_like}</p>
        <p className="text-sm">{props.city.weather.description}</p>
      </div>
      <button
        className="absolute top-3 right-3 hidden group-hover:block"
        onClick={() => removeCity(props.city)}
      >
        ❌
      </button>
      <div className="absolute top-0 left-0 right-0 z-40 w-full h-full bg-gray-700 opacity-50" />
      <div
        className="absolute top-0 left-0 right-0 z-30 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${props.city.image})` }}
      />
    </div>
  );
}
