import {Theme, useTheme} from '../../../context/ThemeContext';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import React from 'react';
import {useScaleText} from 'react-native-text';
import Icon from 'react-native-vector-icons/Ionicons';

interface IPreviewThemeProps {
  theme: Theme;
}
const PreviewTheme = ({theme}: IPreviewThemeProps) => {
  const {
    backgroundColor,
    primaryTest,
    primary,
    textColor,
    primaryWithText,
    backgroundColorWithText,
    accent,
    accentWithText,
    theme: current,
    onChangeTheme,
    secondary,
  } = useTheme();
  const {fontSize} = useScaleText({fontSize: 10});

  const isActive = theme === current;
  const bg = isActive ? backgroundColor().toString() : textColor().toString();
  const color = isActive
    ? textColor().toString()
    : backgroundColor().toString();

  const colors = accentWithText(0.5, bg);

  return (
    <TouchableWithoutFeedback
      onPress={() => onChangeTheme(theme)}
      style={[
        styles.con,
        {
          borderColor: isActive ? secondary().toString() : 'transparent',
        },
      ]}>
      <View
        style={[
          styles.theme,
          {
            backgroundColor: bg,
          },
        ]}>
        <View
          style={[
            styles.bar,
            {
              backgroundColor: colors.backgroundColor.toString(),
            },
          ]}>
          <Text style={{fontSize, color: color.toString()}}>Settings</Text>
        </View>
        <View style={styles.conActive}>
          {isActive && (
            <View
              style={[
                styles.active,
                {
                  backgroundColor: primary(0.3, bg).toString(),
                },
              ]}>
              <Icon name={'md-checkmark'} size={30} color={color.toString()} />
            </View>
          )}
        </View>
        <View
          style={[
            styles.bar,
            {
              backgroundColor: colors.backgroundColor.toString(),
            },
          ]}>
          <Text style={{fontSize, color: color.toString()}}>Words</Text>
          <Text style={{fontSize, color: color.toString()}}>Words</Text>
          <Text style={{fontSize, color: color.toString()}}>Words</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  con: {
    borderRadius: 5,
    flex: 1,
  },
  theme: {
    height: 225,
    width: 125,
    margin: 16,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  bar: {
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  active: {
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conActive: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default PreviewTheme;
