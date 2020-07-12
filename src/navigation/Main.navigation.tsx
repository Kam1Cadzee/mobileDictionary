import React from 'react';
import ProfileScreen from '../screens/MainNavigation/Profile.screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DictionaryScreen from '../screens/MainNavigation/Dictionary.screen';
import CreateNavigation from './Create.navigation';
import {MainNavigationParamList} from '../typings/INavigationProps';

const Tab = createDrawerNavigator<MainNavigationParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      minSwipeDistance={20}
      edgeWidth={100}
      drawerType={'back'}
      initialRouteName={'Profile'}>
      <Tab.Screen name="Create" component={CreateNavigation} />
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
