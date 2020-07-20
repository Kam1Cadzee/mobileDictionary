import {useTheme} from '../../context/ThemeContext';
import {Dimensions, StyleSheet, View} from 'react-native';
import MainSvg from '../Svg/MainSvg';
import React from 'react';

const {width} = Dimensions.get('window');

interface IWrapperLogoProps {
  loading: boolean;
  size?: number;
}

const Logo = ({loading, size}: IWrapperLogoProps) => {
  const {backgroundColor} = useTheme();
  size = size ? size : width / 2.5;

  return (
    <View
      style={[
        styles.wrapper,
        {backgroundColor: backgroundColor().hex(), width: size, height: size},
      ]}>
      <MainSvg height={size / 2} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 100,
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Logo;
