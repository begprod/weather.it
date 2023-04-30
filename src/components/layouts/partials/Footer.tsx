import { FC } from 'react';
const { version } = require('../../../../package.json');

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center pt-16 pb-16 md:pt-32 text-sm text-gray-500">
      <p className="text-center">
        made with <span className="text-red-500">❤</span> by <a href="https://github.com/begprod" className="text-blue-600">begprod</a>
      </p>
      <p>v.{version}</p>
      <p>
        <a
          className="text-blue-600"
          href="https://github.com/begprod/weather.it#install-application-on-your-device"
          target="_blank"
          rel="noreferrer"
        >
          Install app on your device
          <span className="inline-block ml-2 -rotate-12 origin-center">→</span>
        </a>
      </p>
    </footer>
  );
};
