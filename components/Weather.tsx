import { Layout, Input, Button } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import { useEffect, useState } from 'react';

export default function weatherWidget(prop: weatherType) {
  const { weather, main, name } = prop.weather;
  const { weatherColor } = prop;
  // const [weatherColor, setWeatherColor] = useState('');

  // useEffect(() => {
  //   const SetWeather = async (): Promise<any> => {
  //     let weather = await AsyncStorage.getItem('weather');
  //     setWeatherColor(`${weather}`);
  //   };
  //   SetWeather();
  //   setWeatherColor(`${weather}`);
  // }, []);

  const listWeather = () => {
    let text: string;
    if (weather) {
      let item: exArray;
      for (item of weather) {
        text = item.description;
        return text;
      }
    }
  };

  const KelvintoCelsius = (temp: number) => {
    return (temp - 273.15).toFixed(0) + 'º';
  };

  const WeatherIcon = () => {
    return (
      <View themeColor={weatherColor}>
        {weatherColor == 'Cloud' ? (
          <Image
            style={styles.stretch}
            source={require('../assets/images/icon/icweather1.png')}
          />
        ) : weatherColor == 'Rain' ? (
          <Image
            style={styles.stretch}
            source={require('../assets/images/icon/icweather22.png')}
          />
        ) : (
          <Image
            style={styles.stretch}
            source={require('../assets/images/icon/icweather1.png')}
          />
        )}
      </View>
    );
  };

  moment.locale('en');
  var dt: Date = new Date();

  return (
    <View themeColor={weatherColor} style={styles.container}>
      <View
        themeColor={weatherColor}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text themeColor={weatherColor} style={{ fontWeight: 'bold' }}>
          Today, {moment(dt).format('dddd DD  MMMM')}
        </Text>
        <Text themeColor={weatherColor} style={{ fontWeight: 'bold' }}>
          {name}
        </Text>
      </View>

      <View themeColor={weatherColor} style={styles.weatherDisplay}>
        <View themeColor={weatherColor} style={{ width: '40%' }}>
          <WeatherIcon />
          {/* <Text themeColor="cloud">{KelvintoCelsius(main?.temp)}</Text> */}
          <Text themeColor={weatherColor}>{listWeather()}</Text>
        </View>
        <View themeColor={weatherColor} style={styles.spilt}>
          <View themeColor={weatherColor} style={styles.header}>
            <Text themeColor={weatherColor} style={{ fontSize: 40 }}>
              {KelvintoCelsius(main?.temp)}
            </Text>
          </View>
          <View themeColor={weatherColor} style={styles.header}>
            <Image
              style={styles.stretch}
              source={require('../assets/images/icon/icthermometer1.png')}
            />
            <Text themeColor={weatherColor}>
              {KelvintoCelsius(main?.temp_min)}
            </Text>
          </View>
          <View themeColor={weatherColor} style={styles.header}>
            <Image
              style={styles.stretch}
              source={require('../assets/images/icon/icthermometer6.png')}
            />
            <Text themeColor={weatherColor}>
              {KelvintoCelsius(main?.temp_max)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    display: 'flex',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  spilt: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  weatherDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface weatherType {
  weatherColor: string;
  weather: {
    base: string;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    name: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      pressure: number;
      humidity: number;
      feels_like: number;
    };
  };
}

interface weatherArray extends Array<exArray> {}
interface exArray {
  id: number;
  main: string;
  description: string;
  icon: string;
}
