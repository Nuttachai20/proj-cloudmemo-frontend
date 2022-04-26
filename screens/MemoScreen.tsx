import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Layout, Input, Button } from '@ui-kitten/components';
import { useState, useCallback } from 'react';
import BaseUrl from '../constants/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { RootTabScreenProps } from '../types';

const searchMusic = async (text: string) => {
  let token = await AsyncStorage.getItem('access');
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
    })
    .catch(err => {
      console.log(err);
    });
  console.log('token', token);
};

const handleSearch = _.debounce(value => searchMusic(value), 500);

export default function MemoScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

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
          weather: 'Weather',
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
    <View themeColor="cloud" style={styles.container}>
      <Text themeColor="cloud" style={styles.title}>
        Tab Two
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
        value={searchUrl}
        onChangeText={nextValue => {
          setSearchUrl(nextValue);
          if (nextValue && nextValue !== searchUrl && nextValue !== '') {
            handleSearch(nextValue);
          }
        }}
      />

      <Button
        onPress={() => CreateMemo(title, desc, searchUrl)}
        status="primary"
      >
        Create Memo
      </Button>
    </View>
  );
}

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
