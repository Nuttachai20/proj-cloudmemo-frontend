import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { registerRootComponent } from 'expo';
import { getDeviceTypeAsync } from 'expo-device';
import { OrientationLock, lockAsync } from 'expo-screen-orientation';

// import Geolocation from 'react-native-geolocation-service';
// import { Text } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { useEffect } from 'react';
import { AppRegistry, Platform } from 'react-native';

import * as Location from 'expo-location';

console.log('proj-cloudmemo-frontend');

AppRegistry.registerComponent('cloudmemo', () => App);
AppRegistry.registerComponent('cloudmemo'.toLowerCase(), () => App);

if (Platform.OS === 'web') {
  const rootTag =
    document.getElementById('root') || document.getElementById('cloudmemo');
  AppRegistry.runApplication('cloudmemo', { rootTag });
}

if (Platform.OS === 'ios') {
  console.log('ios platform');
  AppRegistry.registerComponent('cloudmemo', () => App);
  // Geolocation.requestAuthorization('whenInUse');
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const checkDevice = async () => {
    let type = await getDeviceTypeAsync();
    if (type == 2) {
      lockAsync(OrientationLock.PORTRAIT_UP);
    }
  };

  const checkLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('status access location', status);

    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
  };
  useEffect(() => {
    checkDevice();
    checkLocationPermission();
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    console.log('isLoadingComplete');

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
