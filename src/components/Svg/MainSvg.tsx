import React from 'react';
import Svg from '../../assets/images/logo.svg';

interface MainSvg {
  width?: string | number;
  height?: number;
  fill?: string;
}
const MainSvg = ({fill = 'white', height = 150, width = '100%'}: MainSvg) => {
  return <Svg width={width} height={height} />;
};

export default MainSvg;
