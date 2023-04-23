import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center pt-32 pr-6 pb-32 pl-6">
      <p className="text-center text-gray-500">
        Made with <span className="text-red-500">❤</span> by <a href="#" className="text-blue-500">begprod</a>
      </p>
    </footer>
  );
};
