import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import MainSvg from '../../components/Svg/MainSvg';
import InputText from '../../components/common/InputText';
import TestChangeTheme from '../../components/common/TestChangeTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Button from '../../components/common/Button';
import {MainScreenProps} from '../../typings/INavigationProps';

const {width, height} = Dimensions.get('window');
interface IWrapperLogoProps {
  loading: boolean;
}
const Logo = ({loading}: IWrapperLogoProps) => {
  const {backgroundColor} = useTheme();
  const size = width / 2.5;

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
const DismissKeyboard = ({children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback
        style={{backgroundColor: 'black'}}
        onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const MainScreen = (props: MainScreenProps) => {
  const {accent, backgroundColor, textColor, onChangeTheme} = useTheme();
  const {bottom, top} = useSafeAreaInsets();
  const bgInputText = backgroundColor().fade(0.6);
  return (
    <View
      style={[
        {
          backgroundColor: accent(0.5).toString(),
          paddingTop: top,
          paddingBottom: bottom,
          height,
        },
        styles.container,
      ]}>
      <TestChangeTheme />
      <Image
        source={require('../../assets/images/main-img-1.jpg')}
        style={[styles.img, {opacity: 0.5}]}
        height={height}
        width={width}
        resizeMode={'cover'}
        resizeMethod={'resize'}
      />
      <View style={styles.top}>
        <Logo loading={false} />
      </View>

      <View style={[styles.bottom]}>
        <InputText
          label="Email"
          keyboardType={'email-address'}
          backgroundColor={bgInputText}
        />
        <View
          style={{height: 1, backgroundColor: backgroundColor().fade(0.3)}}
        />
        <InputText
          label="Password"
          keyboardType={'visible-password'}
          backgroundColor={bgInputText}
        />
        <Button
          ration={0.3}
          color={'primary'}
          onPress={() => {
            return;
            props.navigation.push('SignIn');
          }}>
          Sign in
        </Button>
        <Text
          style={[
            styles.textSignup,
            {backgroundColor: bgInputText.toString()},
          ]}>
          Don't have an account?
          <Text> Sign up</Text>
        </Text>
      </View>
      <Text style={styles.version}>0.0.1-pre-alpha</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textSignup: {
    padding: 24,
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? -40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 40 : 0,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  bottom: {
    flexDirection: 'column',
  },
  version: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 2,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MainScreen;
