import {useScaleText} from 'react-native-text';

export type ISize = 'high' | 'medium' | 'low' | 'default';
const useLayoutSize = (size: ISize) => {
  let fontSize: any = 1;
  let fontSizeLow: any = 1;
  let height: any = 1;
  switch (size) {
    case 'high':
      fontSize = 15;
      fontSizeLow = 14;
      height = 50;
      break;
    case 'medium':
    case 'default':
      fontSize = 14;
      fontSizeLow = 12;
      height = 40;
      break;
    case 'low':
      fontSize = 12;
      fontSizeLow = 11;
      height = 35;
      break;
  }
  const scaleText1 = useScaleText({fontSize: fontSize});
  const scaleText2 = useScaleText({fontSize: fontSizeLow});
  const scaleText3 = useScaleText({fontSize: height});
  switch (size) {
    case 'high':
      return {
        paddingHorizontal: 16,
        height: scaleText3.fontSize,
        fontSize: scaleText1.fontSize,
        fontSizeLow: scaleText2.fontSize,
      };
    case 'medium':
    case 'default':
      return {
        paddingHorizontal: 12,
        height: scaleText3.fontSize,
        fontSize: scaleText1.fontSize,
        fontSizeLow: scaleText2.fontSize,
      };
    case 'low':
      return {
        paddingHorizontal: 8,
        height: scaleText3.fontSize,
        fontSize: scaleText1.fontSize,
        fontSizeLow: scaleText2.fontSize,
      };
  }
};

export default useLayoutSize;
