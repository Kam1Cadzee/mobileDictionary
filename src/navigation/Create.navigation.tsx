import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import WordsScreen from '../screens/MainNavigation/CreateNavigation/Words.screen';
import PhrasesScreen from '../screens/MainNavigation/CreateNavigation/Phrases.screen';
import SentencesScreen from '../screens/MainNavigation/CreateNavigation/Sentences.screen';
import {IEntity} from '../typings/IEntity';
import StartScreen from '../screens/MainNavigation/CreateNavigation/Start.screen';
import {CreateNavigationParamList} from '../typings/INavigationProps';

const Tab = createMaterialBottomTabNavigator<CreateNavigationParamList>();

const CreateNavigation = () => {
  const [entity, setEntity] = useState(null as IEntity | null);
  const theme = useTheme();
  const {colors} = theme;

  if (!entity) {
    return <StartScreen setEntity={setEntity} />;
  }
  return (
    <Tab.Navigator
      initialRouteName={'Words'}
      activeColor={colors.accent}
      inactiveColor="#fff"
      barStyle={{backgroundColor: colors.primary}}>
      <Tab.Screen
        name="Words"
        component={WordsScreen}
        initialParams={{
          entity,
        }}
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
        name="Phrases"
        component={PhrasesScreen}
        options={{
          tabBarLabel: 'Phrases',
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
        name="Sentences"
        component={SentencesScreen}
        options={{
          tabBarLabel: 'Sentences',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="format-font"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CreateNavigation;
