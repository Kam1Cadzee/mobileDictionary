import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import WordsModal from '../screens/MainNavigation/CreateNavigation/WordsNavigation/Words.modal';
import WordsScreen from '../screens/MainNavigation/CreateNavigation/WordsNavigation/Words.screen';
import {
  WordsNavigationParamList,
  WordsNavigationProps,
} from '../typings/INavigationProps';

const Stack = createStackNavigator<WordsNavigationParamList>();

const WordsNavigator = (props: WordsNavigationProps) => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator mode={'modal'} initialRouteName="WordsScreen">
      <Stack.Screen
        name="WordsScreen"
        component={WordsScreen}
        initialParams={{
          entity: props.route.params.entity,
        }}
      />
      <Stack.Screen name="WordsModal" component={WordsModal} />
    </Stack.Navigator>
  );
};

export default WordsNavigator;
