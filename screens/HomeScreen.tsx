import { StyleSheet, Image, Platform } from 'react-native';
import { Button } from '@ui-kitten/components';

import axios from 'axios';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import WeatherWidget from '../components/Weather';
import moment from 'moment';
import _ from 'lodash';

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
  const [memoDate, setMemoDate] = useState({});

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
      if (!token) navigation.navigate('Login');

      let user_info = await AsyncStorage.getItem('user');
      if (user_info == null) navigation.navigate('Login');

      console.log('user_info', user_info);

      let User = JSON.parse(`${user_info}`);
      let Memos = await GetAllMemo(User.ID, `${token}`);
      let map_string: string = '';
      for (let i of Memos) {
        map_string =
          map_string +
          `${map_string == '' ? '' : ','}"${moment(i.CreatedAt).format(
            'YYYY-MM-DD',
          )}":{"marked": true,"selected": true}`;
      }
      map_string = '{' + map_string + '}';
      console.log(JSON.parse(map_string));

      setUser({
        ID: User.ID,
        Email: User.Email,
        Image: User.Image,
        Username: User.Username,
      });
      setMemoDate(JSON.parse(map_string));
      setMemo(Memos);
    };

    GetCurrentWeather();
  }, []);

  const ShowDetail = (date: any) => {
    let selectedMemo = memo.find(i => {
      return moment(i.CreatedAt).format('YYYY-MM-DD') == date.dateString;
    });
    if (selectedMemo) {
      console.log('selectedMemo:', selectedMemo);
      AsyncStorage.setItem('memo', JSON.stringify(selectedMemo))
        .then(() => {
          navigation.navigate('MemoDetail');
        })
        .catch(err => {
          console.log(err);
        });
    }
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
        if (err.message === 'Request failed with status code 401')
          navigation.navigate('Login');
      });

    return All_memo;
  };

  return (
    <View
      themeColor={weatherColor}
      style={{ height: '100%', justifyContent: 'flex-start' }}
    >
      <WeatherWidget weather={weather.data} weatherColor={weatherColor} />
      <View
        themeColor={weatherColor}
        style={[styles.Container, styles.shadowProp]}
      >
        <Calendar
          style={{ backgroundColor: '#fff' }}
          markedDates={memoDate}
          hideArrows={false}
          onDayPress={day => {
            // console.log('selected day', day);
            ShowDetail(day);
          }}
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
      AsyncStorage.setItem('weather', 'Clouds');
      // AsyncStorage.setItem('weather', res.data.weather[0].main);
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
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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

interface MemoDate {
  [id: string]: { marked: boolean; select: boolean };
}
