import React from 'react';
import {
  ContainedTouchableProperties,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {StyleSheet, TouchableNativeFeedbackProps, Text} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import Color from 'color';

type IColor = 'primary' | 'accent' | 'secondary' | 'default';
type IButtonProps = TouchableNativeFeedbackProps &
  ContainedTouchableProperties & {
    color?: IColor;
    backgroundColor?: Color | string;
    ration?: number;
    children: any;
  };
const Button = ({
  color = 'default',
  ration = 0,
  children,
  backgroundColor,
  style,
  ...props
}: IButtonProps) => {
  const {
    primaryWithText,
    accentWithText,
    secondaryWithText,
    backgroundColorWithText,
    textColor,
  } = useTheme();
  const Component: any = children !== 'string';
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
        },
        style,
      ]}
      {...props}>
      {typeof children === 'string' ? (
        <Text style={{color: colors.color.toString()}}>{children}</Text>
      ) : (
        <Component
          color={colors.color.toString()}
          fill={colors.color.toString()}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 24,
    alignItems: 'center',
  },
});
export default Button;
