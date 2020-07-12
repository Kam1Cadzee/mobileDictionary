import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MainSvg from '../../components/Svg/MainSvg';
import {
  Button,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import {SignInScreenProps} from '../../typings/authTypings';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@apollo/react-hooks';
import QUERIES from '../../graphql/queries';
import AsyncStorage from '@react-native-community/async-storage';

interface IFormData {
  email: string;
  password: string;
}
const SignInScreen = (props: SignInScreenProps) => {
  const theme = useTheme();
  const {colors} = theme;
  const {control, handleSubmit} = useForm<IFormData>({
    /*  defaultValues: {
      email: 'test@gmail.com',
      password: '12345',
    },*/
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.all}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.con}>
          <View style={styles.top}>
            <MainSvg fill={colors.primary} height={100} />
            <Title style={[styles.title, styles.alignCenter]}>
              Welcome back!
            </Title>
            <Paragraph style={styles.alignCenter}>
              Please, sign in to continue
            </Paragraph>
          </View>
          <View>
            <Controller
              render={({onChange, onBlur, value}) => (
                <TextInput
                  style={styles.input}
                  mode={'outlined'}
                  label="Email"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              control={control}
              name="email"
              rules={{required: true}}
            />
            <Controller
              render={({onChange, onBlur, value}) => (
                <TextInput
                  style={styles.input}
                  mode={'outlined'}
                  label="Password"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              control={control}
              name="password"
              rules={{required: true}}
            />
          </View>
          <View>
            <Button
              style={{
                backgroundColor: colors.primary,
                marginBottom: 16,
              }}
              color={'white'}
              onPress={handleSubmit(onSubmit)}>
              Sign in
            </Button>
            <Paragraph style={styles.alignCenter}>
              Don't have an account
              <Title
                style={{color: colors.primary}}
                onPress={() => props.navigation.push('SignUp')}>
                {' '}
                Sign up
              </Title>
            </Paragraph>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  all: {
    flex: 1,
  },
  con: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  top: {
    paddingTop: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    paddingTop: 24,
  },
  alignCenter: {
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
});
export default SignInScreen;
