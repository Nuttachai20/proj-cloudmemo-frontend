import {
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Layout, Input, Button } from '@ui-kitten/components';
import { useState, useCallback, useEffect } from 'react';
import BaseUrl from '../constants/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { RootTabScreenProps } from '../types';

export default function MemoScreen({ navigation }: RootTabScreenProps<'Memo'>) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState<MusicCard>({ Title: '', YoutubeId: '' });
  const [desc, setDesc] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [token, setToken] = useState('');
  const [musicCards, setMusicCards] = useState<MusicCards>([]);

  // const [user, setUser] = useState('');

  const [weatherColor, setWeatherColor] = useState('');

  useEffect(() => {
    const getWeather = async (): Promise<any> => {
      let weather = await AsyncStorage.getItem('weather');
      let user_info = await AsyncStorage.getItem('user');
      let token = await AsyncStorage.getItem('access');
      setWeatherColor(`${weather}`);
      setToken(`${token}`);
      // setUser(user_info);
    };
    getWeather();
  }, []);

  const searchMusic = async (text: string) => {
    axios
      .post(
        `${BaseUrl.baseurl}/youtube/search`,
        {
          data: text,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(res => {
        console.log(res.data.data);
        setMusicCards(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
    console.log('token', token);
  };

  const CreateMemo = async (
    title: string,
    description: string,
    musicUrl: string,
  ) => {
    let token = await AsyncStorage.getItem('access');
    axios
      .post(
        `${BaseUrl.baseurl}/memo/create`,
        {
          title: title,
          desc: description,
          weather: weatherColor,
          music_url: musicUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View themeColor={weatherColor} style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Modal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <TabBarIcon name="plus-circle" color="#000" />
      </Pressable>
    </View>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

interface MusicCard {
  Title: string;
  YoutubeId: string;
}

interface MusicCards extends Array<MusicCard> {}
