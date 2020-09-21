import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SentencesNavigationParamList,
  SentencesNavigationProps,
} from '../typings/INavigationProps';
import SentencesScreen from '../screens/MainNavigation/CreateNavigation/SentencesNavigation/Sentences.screen';
import SentencesModal from '../screens/MainNavigation/CreateNavigation/SentencesNavigation/Sentences.modal';
import {useTheme} from '../context/ThemeContext';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const Stack = createStackNavigator<SentencesNavigationParamList>();

const SentencesNavigator = (props: SentencesNavigationProps) => {
  const {backgroundColorWithText, accent} = useTheme();
  const colors = backgroundColorWithText();

  return (
    <Stack.Navigator
      mode={'modal'}
      initialRouteName="SentencesScreen"
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
        name="SentencesScreen"
        component={SentencesScreen}
        initialParams={{
          entity: props.route.params.entity,
        }}
        options={{
          title: 'Sentences',
        }}
      />
      <Stack.Screen
        name="SentencesModal"
        component={SentencesModal}
        options={{
          title: 'Sentences',
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
export default SentencesNavigator;
