import React, {useContext, useMemo, useState} from 'react';
import Color from 'color';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
} from 'react-native-global-props';
import {PixelRatio, Platform} from 'react-native';
import {useScaleText} from 'react-native-text';

type Theme = 'dark' | 'light';
type TupleColor = {
  backgroundColor: Color;
  color: Color;
};
interface IThemeContext {
  onChangeTheme: (theme: Theme) => any;
  theme: 'dark' | 'light';
  primaryTest: (i?: number, helperColor?: string) => Color;

  primary: (i?: number, helperColor?: string | Color) => Color;
  primaryWithText: (i?: number, helperColor?: string | Color) => TupleColor;

  secondary: (i?: number, helperColor?: string | Color) => Color;
  secondaryWithText: (i?: number, helperColor?: string | Color) => TupleColor;

  accent: (i?: number, helperColor?: string | Color) => Color;
  accentWithText: (i?: number, helperColor?: string | Color) => TupleColor;

  backgroundColor: (i?: number) => Color;
  backgroundColorWithText: (i?: number) => TupleColor;

  textColor: (i?: number, helperColor?: string | Color) => Color;

  colors: {
    primary: Color;
    secondary: Color;
    accent: Color;
    backgroundColor: Color;
    textColor: Color;
  };
}

interface IGetToneColor {
  color: Color;
  ratio?: number;
  helper: Color | string;
  contrast?: number;
}
const ThemeContext = React.createContext({} as IThemeContext);

const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

const getCof = (i: number) => {
  if (i >= 0.06) {
    return 1;
  }
  return Math.abs(Math.log(i)) * 2;
};

const getToneBGColor = ({
  color,
  contrast = 6,
  helper,
  ratio,
}: IGetToneColor) => {
  if (!ratio) {
    ratio = 0;
  }
  helper = Color(helper);
  let nameFunc: 'lighten' | 'darken' = 'darken';
  const isDarkColor = color.isDark();
  const isDarkHelper = helper.isDark();

  const luminosityPrimary = color.luminosity();
  const luminosityTheme = helper.luminosity();
  if (isDarkColor && isDarkHelper) {
    nameFunc = 'darken';
  } else if (!isDarkColor && !isDarkHelper) {
    nameFunc = 'lighten';
  } else {
    if (luminosityPrimary > luminosityTheme) {
      nameFunc = 'darken';
    } else {
      nameFunc = 'lighten';
    }
  }

  return color[nameFunc](ratio);
};

const getToneColor = ({color, contrast = 4, helper, ratio}: IGetToneColor) => {
  if (!ratio) {
    ratio = 0;
  }
  helper = Color(helper);

  let nameFunc: 'lighten' | 'darken' = 'darken';

  if (ratio === 0) {
    if (color.contrast(helper) < contrast) {
      const isLight = color.isLight();
      color = Color(isLight ? '#1d1d26' : '#ffffff');
      nameFunc = isLight ? 'lighten' : 'darken';
    }
  } else {
    nameFunc = color.isLight() ? 'darken' : 'lighten';
    ratio = ratio > 0.7 ? 0.7 : ratio;
  }

  return color[nameFunc](
    ratio * (nameFunc === 'lighten' ? getCof(color.luminosity()) : 1),
  );
};

const ProviderTheme = ({children}: any) => {
  const {fontSize} = useScaleText({fontSize: 14});
  const [theme, setTheme] = useState('light' as Theme);
  const value: IThemeContext = useMemo(() => {
    const backgroundColor = Color(
      theme === 'light' ? '#f8f6f9ff' : '#1d1d26ff',
    );
    const textColor = Color(theme === 'light' ? '#1d1d26ff' : '#ffffffff');
    const primary = Color('#6563a4ff');
    const accent = Color('#50d2c2ff');
    const secondary = Color('#d667cdff');

    // Setting default styles for all Text components.
    const customTextProps = {
      style: {
        fontSize,
        fontFamily:
          Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'OpenSans-Light',

        color: textColor.toString(),
        fontWeight: '300',
      },
    };

    const customViewProps = {
      style: {
        backgroundColor: backgroundColor.toString(), // light gray
      },
    };

    const customTextInputProps = {
      underlineColorAndroid: 'rgba(0,0,0,0)',
      style: {
        fontSize,
        fontWeight: '300',
        fontFamily:
          Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'OpenSans-Light',

        backgroundColor: 'transparent',
        color: textColor.toString(),
      },
    };
    setCustomView(customViewProps);
    setCustomTextInput(customTextInputProps);
    setCustomText(customTextProps);
    return {
      onChangeTheme: setTheme,
      theme,
      primaryTest: (i, helperColor: any) => {
        if (!i) return primary;
        const res = accent[helperColor](i * 10);
        return res;
      },
      primary: (i, helperColor) => {
        return getToneBGColor({
          ratio: i,
          helper: helperColor ? helperColor : backgroundColor,
          color: primary,
        });
      },
      primaryWithText: (i, helperColor) => {
        const bg = getToneBGColor({
          ratio: i,
          helper: helperColor ? helperColor : backgroundColor,
          color: primary,
        });
        return {
          backgroundColor: bg,
          color: getToneColor({
            helper: bg,
            color: textColor,
          }),
        };
      },
      accent: (i, helperColor) => {
        return getToneBGColor({
          ratio: i,
          helper: helperColor ? helperColor : backgroundColor,
          color: accent,
        });
      },
      accentWithText: (i, helperColor) => {
        const bg = getToneBGColor({
          ratio: i,
          helper: helperColor ? helperColor : backgroundColor,
          color: accent,
        });
        return {
          backgroundColor: bg,
          color: getToneColor({
            helper: bg,
            color: textColor,
          }),
        };
      },
      secondary: (i, helperColor) => {
        return getToneBGColor({
          ratio: i,
          helper: helperColor ? helperColor : backgroundColor,
          color: secondary,
        });
      },
      secondaryWithText: (i, helperColor) => {
        const bg = getToneBGColor({
          ratio: i,
          helper: helperColor ? helperColor : backgroundColor,
          color: secondary,
        });
        return {
          backgroundColor: bg,
          color: getToneColor({
            helper: bg,
            color: textColor,
          }),
        };
      },
      backgroundColor: (i) => {
        return getToneBGColor({
          ratio: i,
          helper: backgroundColor,
          color: backgroundColor,
        });
      },
      backgroundColorWithText: (i) => {
        const bg = getToneBGColor({
          ratio: i,
          helper: backgroundColor,
          color: backgroundColor,
        });
        return {
          backgroundColor: bg,
          color: getToneColor({
            helper: bg,
            color: textColor,
          }),
        };
      },
      textColor: (i, helperColor) => {
        return getToneColor({
          ratio: i,
          helper: helperColor ? helperColor : backgroundColor,
          color: textColor,
        });
      },
      colors: {
        accent,
        backgroundColor,
        primary,
        secondary,
        textColor,
      },
    };
  }, [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export {useTheme};
export default ProviderTheme;
