import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WordsModal from '../screens/MainNavigation/CreateNavigation/WordsNavigation/Words.modal';
import WordsScreen from '../screens/MainNavigation/CreateNavigation/WordsNavigation/Words.screen';
import {
  WordsNavigationParamList,
  WordsNavigationProps,
} from '../typings/INavigationProps';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useTheme} from '../context/ThemeContext';

const Stack = createStackNavigator<WordsNavigationParamList>();

const WordsNavigator = (props: WordsNavigationProps) => {
  const {backgroundColorWithText, accent} = useTheme();
  const colors = backgroundColorWithText();
  return (
    <Stack.Navigator
      mode={'card'}
      headerMode={'float'}
      initialRouteName="WordsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: accent(0.4).toString(),
        },
        headerTitleStyle: {
          color: colors.color.toString(),
        },
        headerLeft: (propsHeader) => {
          return (
            <View style={[styles.iconView]}>
              <Icon
                onPress={
                  !propsHeader.canGoBack
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
      }}>
      <Stack.Screen
        name="WordsScreen"
        component={WordsScreen}
        options={{
          title: 'Words',
        }}
        initialParams={{
          entity: props.route.params.entity,
        }}
      />
      <Stack.Screen
        name="WordsModal"
        component={WordsModal}
        options={{
          title: 'Words',
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
export default WordsNavigator;
