import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Button,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import MainSvg from '../../components/Svg/MainSvg';
import {SignUpScreenProps} from './authTypings';

const SignUpScreen = (props: SignUpScreenProps) => {
  const theme = useTheme();
  const {colors} = theme;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.all}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.con}>
          <View style={styles.top}>
            <MainSvg fill={colors.primary} height={100} />
          </View>
          <View>
            <TextInput style={styles.input} mode={'outlined'} label="Name" />
            <TextInput style={styles.input} mode={'outlined'} label="Email" />
            <TextInput
              style={styles.input}
              mode={'outlined'}
              label="Password"
            />
            <TextInput
              style={styles.input}
              mode={'outlined'}
              label="Repeat password"
            />
          </View>
          <View>
            <Button
              style={{
                backgroundColor: colors.primary,
                marginBottom: 16,
              }}
              color={'white'}>
              Sign up
            </Button>
            <Paragraph style={styles.alignCenter}>
              You have an account
              <Title
                style={{color: colors.primary}}
                onPress={() => props.navigation.push('SignIn')}>
                {' '}
                Sign in
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

export default SignUpScreen;
