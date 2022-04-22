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

import RNLocation from 'react-native-location';

let locationNow;

// RNLocation.configure({
//   distanceFilter: 5.0,
// });

// RNLocation.requestPermission({
//   ios: 'whenInUse',
//   android: {
//     detail: 'coarse',
//   },
// })

const permissionHandle = async () => {
  console.log('here');
  let permission = await RNLocation.checkPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse', // or 'fine'
    },
  });
  console.log('here2');
  console.log(permission);
  if (!permission) {
    permission = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    });
    console.log('2', permission);
  }
};
permissionHandle();

// .then(granted => {
//   if (granted) {
//     locationNow = RNLocation.subscribeToLocationUpdates(locations => {
//       console.log(location);

//       /* Example location returned
//         {
//           speed: -1,
//           longitude: -0.1337,
//           latitude: 51.50998,
//           accuracy: 5,
//           heading: -1,
//           altitude: 0,
//           altitudeAccuracy: -1
//           floor: 0
//           timestamp: 1446007304457.029,
//           fromMockProvider: false
//         }
//         */
//     });
//   }
// });

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  let weather: weatherType;
  let setWeather: any;

  const [locationStatus, setLocationStatus] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');

  [weather, setWeather] = useState<weatherType>({
    data: '',
    status: '',
  });

  return (
    <View>
      <WeatherWidget weather={weather.data} name={''} />
      <View style={styles.container}>
        <Text style={styles.title}>Home {currentLongitude}</Text>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="/screens/HomeScreen.tsx" />
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
