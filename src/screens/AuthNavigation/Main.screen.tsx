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
import InputText from '../../components/controls/InputText';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../../components/controls/Button';
import {MainScreenProps} from '../../typings/INavigationProps';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@apollo/react-hooks';
import QUERIES from '../../graphql/queries';
import AsyncStorage from '@react-native-community/async-storage';
import DismissKeyboard from '../../components/common/DismissKeyboard';
import Logo from '../../components/common/Logo';
import {useKeyboard} from '../../context/KeyboardContext';
import {getStyleFont} from '../../utils/getStyleFont';
import useLayoutSize from '../../useHooks/useLayoutSize';

const {width, height} = Dimensions.get('window');

interface IFormData {
  email: string;
  password: string;
}

const MainScreen = (props: MainScreenProps) => {
  const {accent, backgroundColor} = useTheme();
  const {bottom, top} = useSafeAreaInsets();
  const layout = useLayoutSize('high');
  const isShow = useKeyboard();
  const {control, handleSubmit} = useForm<IFormData>({
    defaultValues: {
      email: 'testMaks@gmail.com',
      password: '12345',
    },
  });

  const [login] = useMutation(QUERIES.LOGIN, {
    update: async (proxy, mutationResult) => {
      proxy.writeData({
        data: {
          isAuth: true,
          currentUser: mutationResult.data.login.user,
        },
      });
      await AsyncStorage.setItem('token', mutationResult.data.login.token);
    },
  });

  const onSubmit = async (data: IFormData) => {
    await login({
      variables: {
        loginData: data,
      },
    });
  };

  const bgInputText = backgroundColor().fade(0.4);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <DismissKeyboard>
        <SafeAreaView
          style={[
            {
              backgroundColor: accent(0.3).toString(),
              flex: 1,
            },
            styles.container,
          ]}>
          <Image
            source={require('../../assets/images/main-img-1.jpg')}
            style={[styles.img]}
            resizeMode={'cover'}
            blurRadius={isShow ? 10 : 0}
          />
          <View style={styles.top}>
            <Logo loading={false} />
          </View>
          <View
            style={[
              styles.bottom,
              {
                marginBottom: -1 * bottom,
              },
            ]}>
            <Controller
              render={({onChange, onBlur, value}) => (
                <InputText
                  label="Email"
                  autoCompleteType={'email'}
                  textBreakStrategy={'simple'}
                  keyboardType={'email-address'}
                  textContentType={'emailAddress'}
                  backgroundColor={bgInputText}
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
                backgroundColor: backgroundColor().fade(0.1).toString(),
              }}
            />
            <Controller
              render={({onChange, onBlur, value}) => (
                <InputText
                  label="Password"
                  textContentType={'password'}
                  keyboardType={'visible-password'}
                  backgroundColor={bgInputText}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  size={'high'}
                />
              )}
              control={control}
              name="password"
              rules={{required: true}}
            />
            <Button
              ration={0.4}
              color={'primary'}
              size={'high'}
              onPress={handleSubmit(onSubmit)}>
              Sign in
            </Button>
            <View
              style={[
                styles.textSignup,
                {
                  backgroundColor: bgInputText.toString(),
                  paddingVertical: 16,
                  paddingBottom: bottom || 16,
                },
              ]}>
              <Text>Don't have an account?</Text>
              <Text
                style={styles.weighText}
                onPress={() => {
                  props.navigation.push('SignUp');
                }}>
                {' '}
                Sign up
              </Text>
            </View>
          </View>
          <Text style={[styles.version, {top}]}>version 0.0.1</Text>
        </SafeAreaView>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textSignup: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  weighText: {
    ...getStyleFont('800-ExtraBold'),
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottom: {
    flexDirection: 'column',
  },
  version: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    height,
    width,
  },
});
export default MainScreen;
