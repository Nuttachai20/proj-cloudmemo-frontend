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
import Geolocation from 'react-native-geolocation-service';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  let weather: weatherType;
  let setWeather: any;

  [weather, setWeather] = useState<weatherType>({
    data: '',
    status: '',
  });
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  useEffect(() => {
    const GetCurrentWeather = async (): Promise<any> => {
      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
          });
          let data = await GetWeatherData(latitude, longitude);
          setWeather({
            data: data?.data,
            status: data?.data.status,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
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
      {location ? (
        <View>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Latitude: {location.longitude}</Text>
        </View>
      ) : (
        <View>Loading...</View>
      )}
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

interface ILocation {
  latitude: number;
  longitude: number;
}
