import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './src/screens/main/MainNavigation';
import AuthNavigator from './src/screens/auth/AuthNavigator';
import {useCurrentUser} from './src/useHooks/useCurrentUser';
import {useMutation} from '@apollo/react-hooks';
import QUERIES from './src/graphql/queries';
import SplashScreen from './src/screens/SplashScreen';

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

  console.log(user);
  useEffect(() => {
    refresh();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator headerMode={'none'}>
      {user ? (
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default App;
