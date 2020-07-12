import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import SentencesScreen from '../screens/MainNavigation/CreateNavigation/SentencesNavigation/Sentences.screen';
import {IEntity} from '../typings/IEntity';
import StartScreen from '../screens/MainNavigation/CreateNavigation/Start.screen';
import {CreateNavigationParamList} from '../typings/INavigationProps';
import WordsNavigator from './Words.navigation';
import PhrasesNavigator from './Phrases.navigation';
import SentencesNavigator from './Sentences.navigation';

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
        component={WordsNavigator}
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
        component={PhrasesNavigator}
        initialParams={{
          entity,
        }}
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
        component={SentencesNavigator}
        initialParams={{
          entity,
        }}
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
