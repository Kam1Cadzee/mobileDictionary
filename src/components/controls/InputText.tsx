import React, {useEffect, useRef, useState} from 'react';
import {NativeViewGestureHandlerProperties} from 'react-native-gesture-handler';
import {
  StyleSheet,
  TextInputProps,
  View,
  TextInput,
  Animated,
  Keyboard,
} from 'react-native';
import Color from 'color';
import {useTheme} from '../../context/ThemeContext';
import useLayoutSize, {ISize} from '../../useHooks/useLayoutSize';

type IInputTextProps = NativeViewGestureHandlerProperties &
  TextInputProps & {
    label?: string;
    backgroundColor?: Color;
    isBorder?: boolean;
    size?: ISize;
    styleLabel?: any;
    styleInput?: any;
    afterIcon?: any;
  };

const InputText = ({
  label,
  value,
  isBorder = false,
  backgroundColor,
  keyboardType,
  onBlur,
  onFocus,
  style,
  styleInput,
  styleLabel,
  size = 'default',
  afterIcon: AfterIcon,
  ...props
}: IInputTextProps) => {
  const layout = useLayoutSize(size);

  const {theme} = useTheme();
  const {backgroundColor: bgColor, textColor} = useTheme();
  const isPassword = keyboardType === 'visible-password';
  backgroundColor = backgroundColor ? backgroundColor : bgColor();
  const [isFocus, setIsFocus] = useState(false);
  const labelTop = useRef(new Animated.Value(0)).current;

  const handleFocus = (e: any) => {
    setIsFocus(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocus(false);
    if (onBlur) onBlur(e);
  };

  useEffect(() => {
    Animated.timing(labelTop, {
      toValue: !!value || isFocus ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocus, labelTop]);

  return (
    <View
      style={[
        styles.con,
        {
          backgroundColor: backgroundColor!.toString(),
          borderBottomColor: isBorder
            ? textColor(0.2).toString()
            : 'transparent',
        },
        style,
      ]}>
      {label && (
        <Animated.Text
          style={[
            {
              position: 'absolute',
              color: textColor(0.2, backgroundColor).toString(),
              left: layout.paddingHorizontal,
              fontSize: labelTop.interpolate({
                inputRange: [0, 1],
                outputRange: [layout.fontSizeLow, layout.fontSize],
              }),
              transform: [
                {
                  translateY: labelTop.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0],
                  }),
                },
              ],
            },
            styleLabel,
          ]}>
          {label}
        </Animated.Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          {
            height: layout.height,
            fontSize: layout.fontSize,
            paddingHorizontal: layout.paddingHorizontal,
            color: textColor(0, backgroundColor).toString(),
            paddingTop: label ? 15 : 0,
          },
          styleInput,
        ]}
        allowFontScaling={false}
        autoCapitalize={'none'}
        keyboardAppearance={theme}
        selectionColor={textColor().toString()}
        onSubmitEditing={Keyboard.dismiss}
        secureTextEntry={isPassword}
        keyboardType={isPassword ? 'default' : keyboardType}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {AfterIcon && (
        <AfterIcon
          color={textColor(0, backgroundColor).toString()}
          style={{marginRight: layout.paddingHorizontal}}
          size={layout.sizeIcon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    padding: 0,
    flex: 1,
  },
});

export default InputText;
