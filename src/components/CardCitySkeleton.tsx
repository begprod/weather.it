import { FC } from 'react';

interface ICityWeatherCardSkeletonProps {
  image?: string;
}

export const CardCitySkeleton: FC<ICityWeatherCardSkeletonProps> = (props) => {
  return (
    <div className="relative flex flex-col w-full h-[350px] p-10 bg-white rounded-[20px] shadow-md overflow-hidden">
      <div className="relative z-30">
        <div className="animate-pulse flex flex-col w-full mt-4">
          <div className="w-5/6 h-4 bg-gray-300 rounded" />
          <div className="w-1/4 h-20 mt-2 bg-gray-300 rounded" />
        </div>
        <div className="animate-pulse flex flex-col w-full mt-4">
          <div className="w-1/3 h-4 bg-gray-300 rounded" />
          <div className="w-1/2 h-4 mt-2 bg-gray-300 rounded" />
        </div>
        <div className="animate-pulse flex flex-col w-full mt-4">
          <div className="w-[75px] h-[75px] mt-2 bg-gray-300 rounded-[20px]" />
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 z-20 w-full h-full bg-gray-600 opacity-50" />
      <div
        className="absolute top-0 left-0 right-0 z-10 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${props.image})` }}
      />
    </div>
  );
};

CardCitySkeleton.displayName = 'CardCitySkeleton';
