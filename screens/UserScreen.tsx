import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Button } from '@ui-kitten/components';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserScreen({ navigation }: RootTabScreenProps<'User'>) {
  const [weatherColor, setWeatherColor] = useState('');

  useEffect(() => {
    const getWeather = async (): Promise<any> => {
      let weather = await AsyncStorage.getItem('weather');
      setWeatherColor(`${weather}`);
    };
    getWeather();
  }, []);
  return (
    <View themeColor={weatherColor} style={styles.container}>
      <Text themeColor={weatherColor} style={styles.title}>
        User
      </Text>

      <Button
        onPress={() => {
          alert('logout');
          navigation.navigate('Login');
        }}
      >
        logout
      </Button>
      <View themeColor={weatherColor} style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
