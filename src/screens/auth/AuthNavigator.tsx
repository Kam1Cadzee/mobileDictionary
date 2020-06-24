import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import {useTheme} from 'react-native-paper';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        headerTransparent: true,
        headerTitle: '',
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
