import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/AuthNavigation/Main.screen';
import SignUpScreen from '../screens/AuthNavigation/SignUp.screen';
import {AuthNavigationParamList} from '../typings/INavigationProps';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/EvilIcons';

const Stack = createStackNavigator<AuthNavigationParamList>();

const AuthNavigator = () => {
  const {backgroundColor, textColor} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {backgroundColor: backgroundColor().toString()},
        headerTitle: '',
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerLeft: (props) => {
            return (
              <View style={styles.iconView}>
                <Icon
                  onPress={props.onPress}
                  name="close"
                  size={30}
                  color={textColor(0.5).toString()}
                />
                <Text style={[styles.text]}>Sign Up</Text>
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconView: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default AuthNavigator;
