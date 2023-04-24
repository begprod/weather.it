import { FC } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ICityWeather } from '../../types';
import { selectWeatherList, selectCityImages, selectStatus } from '../../features/weather/weather-slice';
import { CardCity, CardCitySkeleton } from './';

export const CardGrid: FC = () => {
  const citiesList = useSelector(selectWeatherList);
  const status = useSelector(selectStatus);
  const images = useSelector(selectCityImages);
  const grid = {
    visible: {
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.3
      }
    }
  };
  const card = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      variants={grid}
      initial="hidden"
      animate="visible"
      className="w-full max-w-screen-2xl m-auto grid grid-cols-1 gap-4 mt-20 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-8">
      {citiesList.map((city: ICityWeather, index: number) => {
        return (
          <motion.div
            key={city.id}
            variants={card}
          >
            <CardCity
              city={city}
              image={images[city.id]}
            />
          </motion.div>
        );
      })}
      {status === 'loading' && <CardCitySkeleton />}
    </motion.div>
  );
};

CardGrid.displayName = 'CardGrid';
