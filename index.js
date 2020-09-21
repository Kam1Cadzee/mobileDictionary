import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import ProviderApollo from './src/components/common/ProviderApollo';
import ProviderTheme from './src/context/ThemeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ProviderKeyboard from './src/context/KeyboardContext';
import { AppearanceProvider } from 'react-native-appearance';
import ProviderNotification from './src/context/NotificationContext';
import * as Sentry from '@sentry/react-native';

/*Sentry.init({
  dsn: 'https://3b99536ff2d040b5a14b8b0da69b01de@o345313.ingest.sentry.io/5373821',
  attachStacktrace: true,
});*/

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#90caf9',
    accent: '#000',
    text: '#455a64',
  },
};

const Main = () => {
  return (
    <ProviderApollo>
      <ProviderTheme>
      <ProviderNotification>
        <ProviderKeyboard>
          <AppearanceProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <PaperProvider theme={theme}>
                  <App />
                </PaperProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </AppearanceProvider>
        </ProviderKeyboard>
      </ProviderNotification>
      </ProviderTheme>
    </ProviderApollo>
  );
};

AppRegistry.registerComponent(appName, () => Main);
