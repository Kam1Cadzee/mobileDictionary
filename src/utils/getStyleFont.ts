import {Platform} from 'react-native';

type StyleFont =
  | '300-Light'
  | '300-LightItalic'
  | '400-Regular'
  | '400-RegularItalic'
  | '600-SemiBold'
  | '600-SemiBoldItalic'
  | '700-Bold'
  | '700-BoldItalic'
  | '800-ExtraBold'
  | '800-ExtraBoldItalic';

export const getStyleFont = (style: StyleFont) => {
  const [ios, android] = style.split('-');
  return (Platform.OS === 'ios'
    ? {fontWeight: ios}
    : {fontFamily: android}) as any;
};
