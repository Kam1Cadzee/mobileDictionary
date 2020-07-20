import React from 'react';
import {useTheme} from '../../context/ThemeContext';
import {StyleSheet, TouchableOpacity, Text, PixelRatio} from 'react-native';
import {Button} from 'react-native-paper';

const TestChangeTheme = () => {
  const {onChangeTheme, theme} = useTheme();
  return (
    <Button
      style={{
        position: 'absolute',
        top: 30,
        right: 0,
        width: 100,
        height: 50,
        zIndex: 200,
        backgroundColor: 'white',
      }}
      onPress={() => {
        onChangeTheme((t) => (t === 'dark' ? 'light' : 'dark'));
      }}>
      <Text>{PixelRatio.getPixelSizeForLayoutSize(60)}</Text>
    </Button>
  );
};

export default TestChangeTheme;
