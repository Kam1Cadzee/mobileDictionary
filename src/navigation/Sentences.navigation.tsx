import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import {
  SentencesNavigationParamList,
  SentencesNavigationProps,
} from '../typings/INavigationProps';
import SentencesScreen from '../screens/MainNavigation/CreateNavigation/SentencesNavigation/Sentences.screen';
import SentencesModal from '../screens/MainNavigation/CreateNavigation/SentencesNavigation/Sentences.modal';

const Stack = createStackNavigator<SentencesNavigationParamList>();

const SentencesNavigator = (props: SentencesNavigationProps) => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator mode={'modal'} initialRouteName="SentencesScreen">
      <Stack.Screen
        name="SentencesScreen"
        component={SentencesScreen}
        initialParams={{
          entity: props.route.params.entity,
        }}
      />
      <Stack.Screen name="SentencesModal" component={SentencesModal} />
    </Stack.Navigator>
  );
};

export default SentencesNavigator;
