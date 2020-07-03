import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './src/navigation/Main.navigation';
import AuthNavigator from './src/navigation/Auth.navigator';
import {useCurrentUser} from './src/useHooks/useCurrentUser';
import {useMutation} from '@apollo/react-hooks';
import QUERIES from './src/graphql/queries';
import SplashScreen from './src/screens/Splash.screen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  const {user} = useCurrentUser();
  const [refresh, {loading}] = useMutation(QUERIES.REFRESH_USER, {
    update: (proxy, mutationResult) => {
      proxy.writeData({
        data: {
          isAuth: true,
          currentUser: mutationResult.data.refreshUser,
        },
      });
    },
  });

  useEffect(() => {
    refresh();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator headerMode={'none'}>
        {user ? (
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default App;
