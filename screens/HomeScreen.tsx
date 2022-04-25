import { StyleSheet, Image, Platform } from 'react-native';
import { Button } from '@ui-kitten/components';

import axios from 'axios';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import WeatherWidget from '../components/Weather';
import CalendarComp from '../components/Calendar';
import * as Location from 'expo-location';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  let weather: weatherType;
  let setWeather: any;

  [weather, setWeather] = useState<weatherType>({
    data: '',
    status: '',
  });

  const navigationRef = useNavigationContainerRef();
  useEffect(() => {
    const GetCurrentWeather = async (): Promise<any> => {
      let location = await Location.getCurrentPositionAsync();
      let data = await GetWeatherData(
        location.coords.latitude,
        location.coords.longitude,
      );
      setWeather({
        data: data?.data,
        status: data?.data.status,
      });
    };
    GetCurrentWeather();
  }, []);

  return (
    <View themeColor="cloud">
      <WeatherWidget weather={weather.data} name={''} />
      <View themeColor="cloud">
        <CalendarComp></CalendarComp>
        <Button
          onPress={() => {
            if (navigationRef.isReady()) {
              alert('goback');
              // Perform navigation if the react navigation is ready to handle actions
              navigationRef.navigate('Login');
            } else {
              alert('nope');
            }
          }}
        ></Button>
      </View>
    </View>
  );
}

const GetWeatherData = (latitude: number, longitude: number) => {
  //https://api.openweathermap.org/data/2.5/weather?lat=13.722931837203577&lon=100.73457812172875&appid=9ca38f662ad44e37bc3d88934c32bb4d
  let nowWeather = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9ca38f662ad44e37bc3d88934c32bb4d`,
    )
    .then(res => {
      // console.log('send api');
      return res;
    })
    .catch(error => {
      console.log(error);
    });
  return nowWeather;
};

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

interface weatherType {
  data: any;
  status: any;
}

interface locationType {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface ILocation {
  latitude: number;
  longitude: number;
}
