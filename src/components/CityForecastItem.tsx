import { FC, useCallback, useContext } from 'react';
import { ICityForecast } from '../interfaces';
import { CitiesContext } from "../store/cities-context";

const particlesNumber = 10;
const forecastTypes = {
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
  'Mist': 'smoke',
  'Fog': 'smoke',
  'Dust': 'dust',
  'Sand': 'dust',
  'Ash': 'dust',
}

interface ICityForecastItemProps {
  city: ICityForecast;
}
export const CityForecastItem: FC<ICityForecastItemProps> = (props) => {
  const citiesCtx = useContext(CitiesContext);
  const removeCity = useCallback((city: ICityForecast) => citiesCtx.removeCity(city), [citiesCtx]);

  let particles = [];
  for (let i = 0; i < particlesNumber; i++) {
    particles.push(<div key={i}></div>);
  }

  return (
    <div
      className="group relative h-[300px] p-10 text-white overflow-hidden rounded-lg shadow-md shadow-gray-700"
    >
      <div className="relative z-30 select-none">
        <p className="text-xl">{props.city.name}</p>
        <p className="text-3xl">{props.city.weather.current}</p>
        <p className="text-sm">feels like: {props.city.weather.feels_like}</p>
        <p className="text-sm">{props.city.weather.description}</p>
        <div className={`forecast forecast_${forecastTypes[props.city.weather.main as keyof typeof forecastTypes]}`}>
          {particles}
        </div>
      </div>
      <button
        className="absolute top-3 right-3 z-30 hidden group-hover:block"
        onClick={() => removeCity(props.city)}
      >
        ❌
      </button>
      <div className="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50" />
      <div
        className="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${props.city.image})` }}
      />
    </div>
  );
}
