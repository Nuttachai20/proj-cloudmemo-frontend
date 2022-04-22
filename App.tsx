import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerRootComponent } from 'expo';

// import { Text } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import { AppRegistry, Platform } from 'react-native';

AppRegistry.registerComponent('proj-cloudmemo-frontend', () => App);
AppRegistry.registerComponent(
  'proj-cloudmemo-frontend'.toLowerCase(),
  () => App,
);

if (Platform.OS === 'web') {
  const rootTag =
    document.getElementById('root') ||
    document.getElementById('proj-cloudmemo-frontend');
  AppRegistry.runApplication('proj-cloudmemo-frontend', { rootTag });
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApplicationProvider>
    );
  }
}

registerRootComponent(App);
