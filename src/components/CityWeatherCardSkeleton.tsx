import { FC } from 'react';

export const CityWeatherCardSkeleton: FC = () => {
  return (
    <div className="flex flex-col w-full h-[350px] p-10 bg-white rounded-[20px] shadow-md">
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
  );
}
