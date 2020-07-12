import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainSvg from '../components/Svg/MainSvg';
import {useTheme} from '../context/ThemeContext';

const SplashScreen = () => {
  const {backgroundColor} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor()}]}>
      <MainSvg height={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
