import React from 'react';
import { EllipseSVGProps } from '../types/svg-props';
import colors from '../../../assets/scss/_themes-vars.module.scss';
const Ellipse1: React.FC<EllipseSVGProps> = ({ fillColor, position }) => {
  const color =
    fillColor === 'yellow'
      ? colors.yellow
      : fillColor === 'blue'
        ? '#008FCC'
        : fillColor === 'aqua'
          ? colors.blueIcons
          : undefined;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="95"
        height="76"
        viewBox="0 0 95 76"
        fill="none"
      >
        <ellipse
          opacity="0.41"
          cx="74.5"
          cy={
            position === 'bottom' ? '74' : position === 'top' ? '-7' : undefined
          }
          rx="74.5"
          ry="74"
          fill={color}
        />
      </svg>
    </>
  );
};
export default Ellipse1;
