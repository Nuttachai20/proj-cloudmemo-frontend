import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { StyleSheet, View } from 'react-native';

export default function weatherWidget(prop: weatherType) {
  console.log(prop.weather);
  const { weather, base, main, name } = prop.weather;
  console.log('???', prop.weather.weather);
  let ex_array = [{ name: 'a' }, { name: 'b' }];

  const listWeather = () => {
    if (prop.weather.weather) {
      for (let item of prop.weather.weather) {
        console.log(item);
        <Text>{item.main}</Text>;
      }
    }
  };
  const ListWeather = () => {
    return prop.weather?.weather?.map(item => {
      return item.main;
    });
  };

  return (
    <Layout style={styles.container}>
      <Text>
        {name} {base}
      </Text>
      <View>
        {prop.weather?.weather?.map(item => {
          item.main;
        })}
      </View>
      <Layout style={styles.spilt}></Layout>
      <Text style={styles.spilt}>
        {main?.temp} {main?.temp_min} {main?.temp_max}
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#61dafb',
    paddingTop: 10,
    paddingBottom: 10,
  },
  spilt: {
    width: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface weatherType {
  name: string;
  weather: {
    base: string;
    weather: weatherArray;
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
