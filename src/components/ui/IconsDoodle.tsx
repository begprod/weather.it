import { FC } from 'react';
import { motion } from 'framer-motion';
import { generateParticles } from '../../helpers';

export const IconsDoodle: FC = () => {
  const dragZone = { left: -30, right: 30, top: -30, bottom: 30 };

  return (
    <motion.div className="weather-doodle flex justify-between mb-10 text-center text-5xl">
      <motion.div
        drag
        dragConstraints={dragZone}
        whileDrag={{ scale: 1.1 }}
        dragElastic={0.2}
      >
        <div className="weather-icon weather-icon_clear"></div>
      </motion.div>

      <motion.div
        drag
        dragConstraints={dragZone}
        whileDrag={{ scale: 1.1 }}
        dragElastic={0.2}
      >
        <div className="weather-icon weather-icon_cloud"></div>
      </motion.div>

      <motion.div
        drag
        dragConstraints={dragZone}
        whileDrag={{ scale: 1.1 }}
        dragElastic={0.2}
      >
        <div className="weather-icon weather-icon_snow">
          {generateParticles()}
        </div>
      </motion.div>

      <motion.div
        drag
        dragConstraints={dragZone}
        whileDrag={{ scale: 1.1 }}
        dragElastic={0.2}
      >
        <div className="weather-icon weather-icon_dust">
          {generateParticles()}
        </div>
      </motion.div>
    </motion.div>
  );
};

IconsDoodle.displayName = 'IconsDoodle';
