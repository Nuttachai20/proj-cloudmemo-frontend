import { StatusBar } from 'expo-status-bar';

import { FontAwesome } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import { Layout, Input, Button } from '@ui-kitten/components';
import { useState, useEffect } from 'react';
import BaseUrl from '../constants/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

import { RootTabScreenProps } from '../types';
export default function MemoScreen({ navigation }: RootTabScreenProps<'Memo'>) {
  {
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
        <Text themeColor={weatherColor} style={styles.title}>
          Memo
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Memo');
          }}
        >
          <TabBarIcon name="arrow-left" color="#fff" />
        </Pressable>
        <Input
          label="Title"
          style={{ width: '80%', marginBottom: 10 }}
          placeholder="Title"
          value={title}
          onChangeText={nextValue => setTitle(nextValue)}
        />
        <Input
          label="description"
          style={{ width: '80%', marginBottom: 10 }}
          multiline={true}
          textStyle={{ minHeight: 100 }}
          placeholder="Description"
          value={desc}
          onChangeText={nextValue => setDesc(nextValue)}
        />

        {url.Title ? (
          <View>
            <Text themeColor={weatherColor}>{url.Title}</Text>
            <Pressable
              onPress={() => {
                setUrl({ Title: '', YoutubeId: '' });
              }}
            >
              <TabBarIcon name="eject" color="#fff" />
            </Pressable>
          </View>
        ) : (
          <View
            themeColor={weatherColor}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Input
              label="Music"
              style={{ width: '75%', marginBottom: 10, marginRight: 5 }}
              placeholder="Input your music title here"
              value={searchInput}
              onChangeText={nextValue => {
                setSearchInput(nextValue);
              }}
            />
            <Pressable
              onPress={() => {
                searchMusic(searchInput);
              }}
            >
              <TabBarIcon name="search" color="#fff" />
            </Pressable>
          </View>
        )}

        {musicCards?.length > 0 && url.YoutubeId == '' ? (
          <ScrollView style={{ width: '90%' }}>
            {musicCards.slice().map(item => {
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
                  <Text
                    style={{ paddingLeft: 10, width: '85%' }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    themeColor={weatherColor}
                  >
                    {item.Title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}

        {url.YoutubeId !== '' ? null : null}

        <Button
          onPress={() => CreateMemo(title, desc, url.YoutubeId)}
          status="primary"
        >
          Create Memo
        </Button>
      </View>
    );
  }
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
    width: '100%',
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
    width: '100%',
    color: '#000',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

interface MusicCard {
  Title: string;
  YoutubeId: string;
}

interface MusicCards extends Array<MusicCard> {}
