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
      <ProviderKeyboard>
        <ProviderTheme>
          <SafeAreaProvider>
            <NavigationContainer>
              <PaperProvider theme={theme}>
                <App />
              </PaperProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </ProviderTheme>
      </ProviderKeyboard>
    </ProviderApollo>
  );
};

AppRegistry.registerComponent(appName, () => Main);
