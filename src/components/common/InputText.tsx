import React, {useEffect, useRef, useState} from 'react';
import {
  NativeViewGestureHandlerProperties,
  TextInput,
} from 'react-native-gesture-handler';
import {
  StyleSheet,
  TextInputProps,
  View,
  Text,
  Animated,
  Keyboard,
} from 'react-native';
import Color from 'color';
import {useTheme} from '../../context/ThemeContext';

type IInputTextProps = NativeViewGestureHandlerProperties &
  TextInputProps & {
    label?: string;
    backgroundColor?: Color;
    isBorder?: boolean;
  };
const InputText = ({
  label,
  value,
  isBorder = false,
  backgroundColor,
  keyboardType,
  onBlur,
  onFocus,
  ...props
}: IInputTextProps) => {
  const {backgroundColor: bgColor, textColor} = useTheme();
  const isPassword = keyboardType === 'visible-password';
  backgroundColor = backgroundColor ? backgroundColor : bgColor();
  const [isFocus, setIsFocus] = useState(false);
  const labelTop = useRef(new Animated.Value(!!value || isFocus ? 8 : 24))
    .current;

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
      toValue: !!value || isFocus ? 8 : 24,
      duration: 200,
      useNativeDriver: true,
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
      ]}>
      {label && (
        <Animated.Text
          style={[
            {
              position: 'absolute',
              color: textColor(0.2, backgroundColor).toString(),
              left: 16,
              transform: [
                {
                  translateY: labelTop,
                },
              ],
            },
          ]}>
          {label}
        </Animated.Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          {
            color: textColor(0, backgroundColor).toString(),
          },
        ]}
        selectionColor={textColor().toString()}
        onSubmitEditing={Keyboard.dismiss}
        secureTextEntry={isPassword}
        keyboardType={isPassword ? 'default' : keyboardType}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    borderBottomWidth: 1,
  },
  textInput: {
    padding: 16,
    paddingTop: 32,
  },
});

export default InputText;
