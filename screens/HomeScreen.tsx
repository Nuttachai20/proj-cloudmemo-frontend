import {
  SafeAreaView,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

import axios from 'axios';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useRef, useState } from 'react';
import WeatherWidget from '../components/Weather';
import CalendarComp from '../components/Calendar';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  let weather: weatherType;
  let setWeather: any;

  [weather, setWeather] = useState<weatherType>({
    data: '',
    status: '',
  });

  useEffect(() => {
    const GetCurrentWeather = async (): Promise<any> => {
      let data = await GetWeatherData();
      // console.log("data:",data);
      setWeather({
        data: data?.data,
        status: data?.data.status,
      });
    };
    GetCurrentWeather();
  }, []);

  return (
    <View style={{ flex: 1 }} themeColor="cloud">
      <WeatherWidget weather={weather.data} name={''} />
      <View themeColor="cloud">
        <Text themeColor="cloud" style={styles.title}>
          Home
        </Text>
        <CalendarComp></CalendarComp>
      </View>
    </View>
  );
}

const GetWeatherData = () => {
  let nowWeather = axios
    .get(
      'https://api.openweathermap.org/data/2.5/weather?lat=13.722931837203577&lon=100.73457812172875&appid=9ca38f662ad44e37bc3d88934c32bb4d',
    )
    .then(res => {
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
  speed: number;
  longitude: number;
  latitude: number;
  accuracy: number;
  heading: number;
  altitude: number;
  altitudeAccuracy: number;
  floor: number;
  timestamp: number;
  fromMockProvider: boolean;
}
