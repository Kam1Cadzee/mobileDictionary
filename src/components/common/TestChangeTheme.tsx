import React from 'react';
import {useTheme} from '../../context/ThemeContext';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-paper';

const TestChangeTheme = () => {
  const {onChangeTheme, theme} = useTheme();
  return (
    <Button
      style={{
        position: 'absolute',
        top: 90,
        right: 0,
        width: 100,
        height: 50,
        zIndex: 100,
      }}
      onPress={() => {
        console.log(1);
        onChangeTheme((t) => (t === 'dark' ? 'light' : 'dark'));
      }}>
      <Text>{theme}</Text>
    </Button>
  );
};

export default TestChangeTheme;
