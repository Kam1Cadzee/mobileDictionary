import React from 'react';
import ProfileScreen from './ProfileScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateScreen from './CreateScreen';
import WordsScreen from './WordsScreen';
import {useTheme} from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  const theme = useTheme();
  const {colors} = theme;
  return (
    <Tab.Navigator
      initialRouteName={'Create'}
      activeColor={colors.accent}
      inactiveColor="#fff"
      barStyle={{backgroundColor: colors.primary}}>
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="contrast" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Words"
        component={WordsScreen}
        options={{
          tabBarLabel: 'Words',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="format-font"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
