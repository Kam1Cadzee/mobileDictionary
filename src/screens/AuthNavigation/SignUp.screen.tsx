import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {SignUpScreenProps} from '../../typings/INavigationProps';
import TestChangeTheme from '../../components/common/TestChangeTheme';
import {useTheme} from '../../context/ThemeContext';
import DismissKeyboard from '../../components/common/DismissKeyboard';
import Logo from '../../components/common/Logo';
import {Controller, useForm} from 'react-hook-form';
import InputText from '../../components/controls/InputText';
import Button from '../../components/controls/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useKeyboard} from '../../context/KeyboardContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height, width} = Dimensions.get('window');
interface IFormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
const SignUpScreen = (props: SignUpScreenProps) => {
  const {control, handleSubmit} = useForm<IFormData>({
    /*  defaultValues: {
      email: 'test@gmail.com',
      password: '12345',
    },*/
  });
  const {bottom} = useSafeAreaInsets();
  const {backgroundColor, accent, textColor} = useTheme();
  const heightTop = useRef(new Animated.Value(150)).current;
  const isShow = useKeyboard();

  useEffect(() => {
    Animated.timing(heightTop, {
      toValue: isShow ? 0 : 150,
      useNativeDriver: false,
      duration: 100,
    }).start();
  }, [isShow]);

  return (
    <View style={{flex: 1, backgroundColor: backgroundColor().toString()}}>
      <DismissKeyboard>
        <View
          style={[
            {
              flex: 1,
            },
          ]}>
          <TestChangeTheme />
          <Animated.View
            style={[
              styles.top,
              {
                backgroundColor: accent(0.3).toString(),
                height: heightTop,
              },
            ]}>
            <Image
              source={require('../../assets/images/main-img-1.jpg')}
              style={[styles.img, {opacity: 0.5}]}
              resizeMode={'cover'}
            />
            <Logo size={100} loading={false} />
          </Animated.View>
          <View style={[styles.con]}>
            <KeyboardAwareScrollView>
              <Controller
                render={({onChange, onBlur, value}) => (
                  <InputText
                    label="Name"
                    autoCompleteType={'name'}
                    keyboardType={'default'}
                    textContentType={'name'}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    size={'high'}
                  />
                )}
                control={control}
                name="name"
                rules={{required: true}}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: textColor(1).toString(),
                }}
              />
              <Controller
                render={({onChange, onBlur, value}) => (
                  <InputText
                    label="Email"
                    autoCompleteType={'email'}
                    keyboardType={'email-address'}
                    textContentType={'emailAddress'}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    size={'high'}
                  />
                )}
                control={control}
                name="email"
                rules={{required: true}}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: textColor(1).toString(),
                }}
              />
              <Controller
                render={({onChange, onBlur, value}) => (
                  <InputText
                    label="Password"
                    autoCompleteType={'password'}
                    keyboardType={'visible-password'}
                    textContentType={'password'}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    size={'high'}
                  />
                )}
                control={control}
                name="password"
                rules={{required: true}}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: textColor(1).toString(),
                }}
              />

              <Controller
                render={({onChange, onBlur, value}) => (
                  <InputText
                    label="Repeat password"
                    autoCompleteType={'password'}
                    keyboardType={'visible-password'}
                    textContentType={'password'}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    size={'high'}
                  />
                )}
                control={control}
                name="repeatPassword"
                rules={{required: true}}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: textColor(1).toString(),
                }}
              />
            </KeyboardAwareScrollView>
            <Button
              ration={0.4}
              size={'high'}
              color={'primary'}
              icon={(props) => <Icon name="check" size={30} {...props} />}
              style={[
                styles.btn,
                {
                  paddingBottom: bottom / 2,
                  paddingTop: bottom / 2,
                },
              ]}
            />
          </View>
        </View>
      </DismissKeyboard>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  btn: {},
  img: {
    ...StyleSheet.absoluteFillObject,
    height: 150,
    width,
  },
});

export default SignUpScreen;
