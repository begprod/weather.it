import { FC, memo } from 'react';
import { generateParticles } from '../helpers';

const IconsDoodleMemo: FC = () => {
  return (
    <div className="weather-doodle flex justify-between mb-10 text-center text-5xl">
      <div className="weather-icon weather-icon_clear"></div>
      <div className="weather-icon weather-icon_cloud"></div>
      <div className="weather-icon weather-icon_snow">
        {generateParticles()}
      </div>
      <div className="weather-icon weather-icon_dust">
        {generateParticles()}
      </div>
    </div>
  );
};

export const IconsDoodle = memo(IconsDoodleMemo);

