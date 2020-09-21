import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  PhrasesNavigationParamList,
  PhrasesNavigationProps,
} from '../typings/INavigationProps';
import PhrasesScreen from '../screens/MainNavigation/CreateNavigation/PhrasesNavigation/Phrases.screen';
import PhrasesModal from '../screens/MainNavigation/CreateNavigation/PhrasesNavigation/Phrases.modal';
import {useTheme} from '../context/ThemeContext';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const Stack = createStackNavigator<PhrasesNavigationParamList>();

const PhrasesNavigator = (props: PhrasesNavigationProps) => {
  const {backgroundColorWithText, accent} = useTheme();
  const colors = backgroundColorWithText();

  return (
    <Stack.Navigator
      mode={'modal'}
      initialRouteName="PhrasesScreen"
      screenOptions={{
        headerLeft: (propsHeader) => {
          return (
            <View style={[styles.iconView]}>
              <Icon
                onPress={
                  props.route.params.onBack
                    ? props.route.params.onBack
                    : propsHeader.onPress
                }
                name="close"
                size={30}
                color={colors.color.toString()}
              />
            </View>
          );
        },
        headerStyle: {
          backgroundColor: accent(0.4).toString(),
        },
        headerTitleStyle: {
          color: colors.color.toString(),
        },
      }}>
      <Stack.Screen
        name="PhrasesScreen"
        component={PhrasesScreen}
        initialParams={{
          entity: props.route.params.entity,
        }}
        options={{
          title: 'Phrases',
        }}
      />
      <Stack.Screen
        name="PhrasesModal"
        component={PhrasesModal}
        options={{
          title: 'Phrases',
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
export default PhrasesNavigator;
