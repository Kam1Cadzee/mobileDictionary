import React from 'react';
import ProfileScreen from '../screens/MainNavigation/Profile.screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DictionaryScreen from '../screens/MainNavigation/Dictionary.screen';
import CreateNavigation from './Create.navigation';
import {MainNavigationParamList} from '../typings/INavigationProps';
import {useTheme} from '../context/ThemeContext';

const Tab = createDrawerNavigator<MainNavigationParamList>();

const MainNavigator = () => {
  const {backgroundColorWithText, accent} = useTheme();
  const colors = backgroundColorWithText();
  return (
    <Tab.Navigator
      minSwipeDistance={10}
      edgeWidth={100}
      drawerStyle={{
        backgroundColor: colors.backgroundColor.toString(),
      }}
      drawerContentOptions={{
        activeTintColor: accent().toString(),
        inactiveTintColor: colors.color.toString(),
      }}
      drawerType={'front'}
      initialRouteName={'Create'}>
      <Tab.Screen name="Create" component={CreateNavigation} />
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
