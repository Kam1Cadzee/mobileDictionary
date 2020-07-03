import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/AuthNavigation/Main.screen';
import SignInScreen from '../screens/AuthNavigation/SignIn.screen';
import SignUpScreen from '../screens/AuthNavigation/SignUp.screen';
import {useTheme} from 'react-native-paper';
import {AuthNavigationParamList} from '../typings/INavigationProps';

const Stack = createStackNavigator<AuthNavigationParamList>();

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
