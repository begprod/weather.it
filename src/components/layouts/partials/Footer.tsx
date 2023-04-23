import { FC } from 'react';
const { version } = require('../../../../package.json');

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center pt-16 pb-16 md:pt-32 text-gray-400">
      <p className="text-center">
        made with <span className="text-red-500">❤</span> by <a href="https://github.com/begprod" className="text-blue-500">begprod</a>
      </p>
      <p>v.{version}</p>
    </footer>
  );
};
