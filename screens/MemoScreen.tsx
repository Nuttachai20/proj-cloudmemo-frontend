import {
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Layout, Input, Button } from '@ui-kitten/components';
import { useState, useCallback, useEffect } from 'react';
import BaseUrl from '../constants/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { RootTabScreenProps } from '../types';

export default function MemoScreen({ navigation }: RootTabScreenProps<'Home'>) {
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
        console.log(res.data);
        const { data } = res.data;
        setMusicCards(data);
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
      <Text themeColor={weatherColor} style={styles.title}>
        Memo
      </Text>
      {/* <View style={styles.separator} /> */}
      <Input
        label="Title"
        placeholder="Username"
        value={title}
        onChangeText={nextValue => setTitle(nextValue)}
      />
      <Input
        label="description"
        multiline={true}
        textStyle={{ minHeight: 100 }}
        placeholder="Multiline"
        value={desc}
        onChangeText={nextValue => setDesc(nextValue)}
      />
      <Input
        label="Music"
        placeholder="Input your music title here"
        value={searchInput}
        onChangeText={nextValue => {
          setSearchInput(nextValue);
        }}
      />
      <Button onPress={() => searchMusic(searchInput)} status="primary">
        Search memo
      </Button>
      <Button
        onPress={() => CreateMemo(title, desc, url.YoutubeId)}
        status="primary"
      >
        Create Memo
      </Button>

      <ScrollView>
        {musicCards.length > 0
          ? musicCards.slice().map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setUrl(item);
                  }}
                  style={[styles.card]}
                  key={item.YoutubeId}
                >
                  <Image
                    style={styles.stretch}
                    source={{
                      uri: `https://img.youtube.com/vi/${item.YoutubeId}/default.jpg`,
                    }}
                  />
                  <Text style={{ paddingLeft: 10 }} themeColor={weatherColor}>
                    {item.Title}
                  </Text>
                </TouchableOpacity>
              );
            })
          : ''}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
