import { StyleSheet, Image, Platform } from 'react-native';
import { Button } from '@ui-kitten/components';

import axios from 'axios';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import WeatherWidget from '../components/Weather';

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../constants/BaseUrl';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tueday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

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
        // console.log('User', User.ID);
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

  // '2022-04-15': {
  //   selected: true,
  //   marked: true,
  //   selectedColor: 'blue',
  // },
  // '2022-04-14': { marked: true },
  // '2022-04-13': { marked: true, dotColor: 'red', activeOpacity: 0 },
  // '2022-04-12': { disabled: true, disableTouchEvent: true },

  return (
    <View style={{ height: '100%' }} themeColor={weatherColor}>
      <WeatherWidget weather={weather.data} name={''} />

      <View
        themeColor={weatherColor}
        style={[styles.Container, styles.shadowProp]}
      >
        <Calendar
          style={{ backgroundColor: '#fff' }}
          // markedDates={Memos}
          hideArrows={false}
          // renderArrow={left}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#b6c1cd',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        ></Calendar>
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
  console.log(token);

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
  shadowProp: {
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  Container: {
    paddingTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ffffff',
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
