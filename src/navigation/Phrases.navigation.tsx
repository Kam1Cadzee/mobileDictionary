import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import {
  PhrasesNavigationParamList,
  PhrasesNavigationProps,
} from '../typings/INavigationProps';
import PhrasesScreen from '../screens/MainNavigation/CreateNavigation/PhrasesNavigation/Phrases.screen';
import PhrasesModal from '../screens/MainNavigation/CreateNavigation/PhrasesNavigation/Phrases.modal';

const Stack = createStackNavigator<PhrasesNavigationParamList>();

const PhrasesNavigator = (props: PhrasesNavigationProps) => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator mode={'modal'} initialRouteName="PhrasesScreen">
      <Stack.Screen
        name="PhrasesScreen"
        component={PhrasesScreen}
        initialParams={{
          entity: props.route.params.entity,
        }}
      />
      <Stack.Screen name="PhrasesModal" component={PhrasesModal} />
    </Stack.Navigator>
  );
};

export default PhrasesNavigator;
