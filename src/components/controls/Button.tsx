import React from 'react';
import {ContainedTouchableProperties} from 'react-native-gesture-handler';
import {
  StyleSheet,
  TouchableNativeFeedbackProps,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import Color from 'color';
import useLayoutSize, {ISize} from '../../useHooks/useLayoutSize';

type IColor = 'primary' | 'accent' | 'secondary' | 'default';
type IButtonProps = TouchableNativeFeedbackProps &
  ContainedTouchableProperties & {
    color?: IColor;
    backgroundColor?: Color | string;
    ration?: number;
    children: any;
    icon?: any;
    size?: ISize;
  };
const Button = ({
  color = 'default',
  ration = 0,
  children,
  backgroundColor,
  style,
  size = 'default',
  icon: Icon,
  ...props
}: IButtonProps) => {
  const {
    primaryWithText,
    accentWithText,
    secondaryWithText,
    backgroundColorWithText,
    textColor,
  } = useTheme();
  const layout = useLayoutSize(size);
  let colors: any = {};
  if (backgroundColor) {
    colors.backgroundColor = backgroundColor.toString();
    colors.color = textColor(ration, backgroundColor).toString();
  } else {
    switch (color as IColor) {
      case 'primary':
        colors = primaryWithText(ration);
        break;
      case 'accent':
        colors = accentWithText(ration);
        break;
      case 'secondary':
        colors = secondaryWithText(ration);
        break;
      case 'default':
        colors = backgroundColorWithText(ration);
        break;
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: colors.backgroundColor.toString(),
          minHeight: layout.height,
        },
        style,
      ]}
      {...props}>
      {children ? (
        <Text style={{color: colors.color.toString()}}>{children}</Text>
      ) : (
        <Icon color={colors.color.toString()} fill={colors.color.toString()} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Button;
