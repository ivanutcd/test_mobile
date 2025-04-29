import React from 'react';
import { EllipseSVGProps } from '../types/svg-props';
import colors from '../../../assets/scss/_themes-vars.module.scss';
const GroupEllipse: React.FC<EllipseSVGProps> = ({ fillColor }) => {
  const color =
    fillColor === 'yellow'
      ? colors.yellow
      : fillColor === 'blue'
        ? '#09ADF4'
        : fillColor === 'aqua'
          ? colors.blueIcons
          : undefined;

  const gradientColor =
    fillColor === 'yellow'
      ? '#FFEFDC'
      : fillColor === 'blue'
        ? '#ACE0FB'
        : fillColor === 'aqua'
          ? colors.blueIcons
          : undefined;

  const gradient =
    fillColor === 'yellow'
      ? '457_5901'
      : fillColor === 'blue'
        ? '457_6217'
        : fillColor === 'aqua'
          ? '457_4259'
          : undefined;

  const stopOpacity = fillColor === 'aqua' || fillColor === 'blue' ? '0' : '1';

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="86"
        height="100"
        viewBox="0 0 86 100"
        fill="none"
      >
        <circle
          opacity="0.41"
          cx="62.5"
          cy="-3.5"
          r="57.5"
          fill={`url(#paint0_linear_${gradient})`}
        />
        <circle
          opacity="0.41"
          cx="79.4998"
          cy="88.5"
          r="57.5"
          transform="rotate(57.9109 79.4998 88.5)"
          fill={`url(#paint1_linear_${gradient})`}
        />
        <defs>
          <linearGradient
            id={`paint0_linear_${gradient}`}
            x1="77.0896"
            y1="-11.041"
            x2="49.0867"
            y2="63.7061"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color} />
            <stop
              offset="1"
              stopColor={gradientColor}
              stopOpacity={stopOpacity}
            />
          </linearGradient>
          <linearGradient
            id={`paint1_linear_${gradient}`}
            x1="94.0893"
            y1="80.959"
            x2="66.0864"
            y2="155.706"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color} />
            <stop
              offset="1"
              stopColor={gradientColor}
              stopOpacity={stopOpacity}
            />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};
export default GroupEllipse;
