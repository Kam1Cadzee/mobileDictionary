import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainSvg from '../components/Svg/MainSvg';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <MainSvg />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffab91',
  },
});

export default SplashScreen;
