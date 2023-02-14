import { FC } from 'react';

export const WeatherIconsDoodle: FC = () => {
  const particlesNumber = 10;

  let particles = [];
  for (let i = 0; i < particlesNumber; i++) {
    particles.push(<div key={i}></div>);
  }

  return (
    <div className="weather-doodle flex justify-between mb-10 text-center text-5xl">
      <div className="weather-icon weather-icon_clear"></div>
      <div className="weather-icon weather-icon_cloud"></div>
      <div className="weather-icon weather-icon_snow">
        {particles}
      </div>
      <div className="weather-icon weather-icon_dust">
        {particles}
      </div>
    </div>
  );
};
