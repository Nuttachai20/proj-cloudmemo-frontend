import { StyleSheet, Image, Platform } from 'react-native';
import { Button } from '@ui-kitten/components';

import axios from 'axios';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import WeatherWidget from '../components/Weather';
import CalendarComp from '../components/Calendar';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../constants/BaseUrl';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  let weather: weatherType;
  let setWeather: any;

  [weather, setWeather] = useState<weatherType>({
    data: '',
    status: '',
  });

  const [weatherColor, setWeatherColor] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState<userType>({
    Username: '',
    Email: '',
    Image: '',
  });
  const [memo, setMemo] = useState<MemoType>([]);

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
      let weatherTheme = await AsyncStorage.getItem('weather');
      setWeatherColor(`${weatherTheme}`);

      let token = await AsyncStorage.getItem('access');
      setToken(`${token}`);

      let user_info = await AsyncStorage.getItem('user');
      console.log('user_info', user_info);

      if (user_info !== null) {
        let User = JSON.parse(user_info);
        console.log('User', User.ID);
        let Memos = await GetAllMemo(User.ID, `${token}`);
        console.log(Memos);

        setUser({
          ID: User.ID,
          Email: User.Email,
          Image: User.Image,
          Username: User.Username,
        });
        setMemo(Memos);
      }
    };

    GetCurrentWeather();
  }, []);

  return (
    <View style={{ height: '100%' }} themeColor={weatherColor}>
      <WeatherWidget weather={weather.data} name={''} />
      <View themeColor={weatherColor}>
        <CalendarComp></CalendarComp>
        {/* <Button
          onPress={() => {
            navigation.navigate('Login');
          }}
        ></Button> */}
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
      console.log(res.data.weather[0].main);
      AsyncStorage.setItem('weather', res.data.weather[0].main);
      return res;
    })
    .catch(error => {
      console.log(error);
    });
  return nowWeather;
};

const GetAllMemo = (id: number | undefined, token: string) => {
  let All_memo = axios
    .get(`${BaseUrl.baseurl}/memo/get/all/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      console.log(err);
    });

  return All_memo;
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

interface userType {
  ID?: number;
  Email: string;
  Image: string;
  Username: string;
}

interface MemoType extends Array<Memo> {}
interface Memo {
  ID: number;
  AuthorID: number;
  CreatedAt: Date;
  Title: string;
  Weather: string;
  Description: string;
  IsPublic: boolean;
  MusicUrl: string;
  SharedToken: string;
}
