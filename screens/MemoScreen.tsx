import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Layout, Input, Button } from '@ui-kitten/components';
import { useState, useCallback } from 'react';
import BaseUrl from '../constants/BaseUrl';
import axios from 'axios';
import _ from 'lodash';

const searchMusic = (text: string) => {
  axios
    .post(`${BaseUrl.baseurl}youtube/search`, {
      data: text,
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      alert(err);
    });
};

const handleSearch = _.debounce(value => searchMusic(value), 500);

export default function MemoScreen() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  return (
    <View themeColor="cloud" style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} />
      <Input
        label="Title"
        placeholder="Username"
        value={text}
        onChangeText={nextValue => setText(nextValue)}
      />
      <Input
        label="Music"
        placeholder="Input your music title here"
        value={searchUrl}
        onChangeText={nextValue => {
          setSearchUrl(nextValue);
          if (nextValue) {
            handleSearch(nextValue);
          }
        }}
      />
      <Input
        multiline={true}
        textStyle={{ minHeight: 100 }}
        placeholder="Multiline"
        value={text}
        onChangeText={nextValue => setText(nextValue)}
      />
      <TextInput
        multiline={true}
        numberOfLines={10}
        style={{ height: 200, textAlignVertical: 'top' }}
      />
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
