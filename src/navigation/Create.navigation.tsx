import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IEntity} from '../typings/IEntity';
import StartScreen from '../screens/MainNavigation/CreateNavigation/Start.screen';
import {CreateNavigationParamList} from '../typings/INavigationProps';
import WordsNavigator from './Words.navigation';
import PhrasesNavigator from './Phrases.navigation';
import SentencesNavigator from './Sentences.navigation';
import {useTheme} from '../context/ThemeContext';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useScaleText} from 'react-native-text';
import {getStyleFont} from '../utils/getStyleFont';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createBottomTabNavigator<CreateNavigationParamList>();

const CreateNavigation = (props: any) => {
  const [entity, setEntity] = useState(null as IEntity | null);
  const {bottom} = useSafeAreaInsets();
  const {fontSize} = useScaleText({fontSize: 14});
  const {accentWithText, primary} = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        const isHistory = !(props.route.state && props.route.state.history
          ? props.route.state.history.length > 1
          : false);

        if (entity && isHistory) {
          setEntity(null);
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [entity, props]),
  );

  if (!entity) {
    return <StartScreen setEntity={setEntity} />;
  }

  const handleBack = () => {
    setEntity(null);
  };
  const colors = accentWithText(0.4);

  return (
    <Tab.Navigator
      initialRouteName={'Words'}
      backBehavior={'history'}
      tabBar={(props) => {
        return (
          <View
            style={[
              styles.tabBar,
              {backgroundColor: colors.backgroundColor.toString()},
            ]}>
            {props.state.routeNames.map((route, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.tab,
                    {
                      paddingBottom: bottom || 16,
                      borderTopColor:
                        index === props.state.index
                          ? primary(0.2, colors.backgroundColor).toString()
                          : 'transparent',
                    },
                  ]}
                  onPress={() => props.navigation.navigate(route)}>
                  <Text
                    style={[
                      styles.text,
                      {color: colors.color.toString(), fontSize},
                    ]}>
                    {route}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen
        name="Words"
        component={WordsNavigator}
        initialParams={{
          entity,
          onBack: handleBack,
        }}
        options={{
          tabBarLabel: 'Words',
        }}
      />
      <Tab.Screen
        name="Phrases"
        component={PhrasesNavigator}
        initialParams={{
          entity,
          onBack: handleBack,
        }}
        options={{
          tabBarLabel: 'Phrases',
        }}
      />
      <Tab.Screen
        name="Sentences"
        component={SentencesNavigator}
        initialParams={{
          entity,
          onBack: handleBack,
        }}
        options={{
          tabBarLabel: 'Sentences',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 5,
  },
  text: {
    ...getStyleFont('600-SemiBold'),
  },
});
export default CreateNavigation;
