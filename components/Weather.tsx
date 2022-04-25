import { Layout, Input, Button } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';

import moment from 'moment';

const WeatherIcon = () => {
  return (
    <View themeColor="cloud">
      <Image
        style={styles.stretch}
        source={require('../assets/images/icon/icweather1.png')}
      />
    </View>
  );
};

export default function weatherWidget(prop: weatherType) {
  const { weather, base, main, name } = prop.weather;

  const listWeather = () => {
    let text: string;
    if (weather) {
      let item: exArray;
      for (item of weather) {
        console.log('item:', item);
        text = item.description;
        return text;
      }
    }
  };

  const KelvintoCelsius = (temp: number) => {
    return (temp - 273.15).toFixed(0) + 'º';
  };

  moment.locale('en');
  var dt: Date = new Date();

  return (
    <View themeColor="cloud" style={styles.container}>
      <Text themeColor="cloud" style={styles.header}>
        Today, {moment(dt).format('dddd DD  MMMM')}
      </Text>
      <Text themeColor="cloud" style={styles.header}>
        {name}
      </Text>
      <View themeColor="cloud" style={styles.weatherDisplay}>
        <View themeColor="cloud" style={{ width: '40%' }}>
          <WeatherIcon />
          {/* <Text themeColor="cloud">{KelvintoCelsius(main?.temp)}</Text> */}
          <Text themeColor="cloud">{listWeather()}</Text>
        </View>
        <View themeColor="cloud" style={styles.spilt}>
          <View themeColor="cloud" style={styles.header}>
            <Text themeColor="cloud" style={{ fontSize: 40 }}>
              {KelvintoCelsius(main?.temp)}
            </Text>
          </View>
          <View themeColor="cloud" style={styles.header}>
            <Image
              style={styles.stretch}
              source={require('../assets/images/icon/icthermometer1.png')}
            />
            <Text themeColor="cloud">{KelvintoCelsius(main?.temp_min)}</Text>
          </View>
          <View themeColor="cloud" style={styles.header}>
            <Image
              style={styles.stretch}
              source={require('../assets/images/icon/icthermometer6.png')}
            />
            <Text themeColor="cloud">{KelvintoCelsius(main?.temp_max)}</Text>
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
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  spilt: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
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
  name: string;
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
