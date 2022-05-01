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
import Colors from '../constants/Colors';

import { RootStackScreenProps } from '../types';
import moment from 'moment';
export default function MemoDetailScreen({
  navigation,
}: RootStackScreenProps<'MemoDetail'>) {
  {
    const [token, setToken] = useState('');
    const [memo, setMemo] = useState<memoType>({});

    const [user, setUser] = useState<userType>({
      Email: '',
      Image: '',
      Username: '',
    });

    const [weatherColor, setWeatherColor] = useState('');

    useEffect(() => {
      const getStore = async (): Promise<any> => {
        let weather = await AsyncStorage.getItem('weather');
        let user_info = await AsyncStorage.getItem('user');
        let token = await AsyncStorage.getItem('access');
        let memo_store = await AsyncStorage.getItem('memo');

        if (memo_store !== null) {
          setMemo(JSON.parse(memo_store));
        }

        setWeatherColor(`${weather}`);
        setToken(`${token}`);
        // setUser(user_info);
      };
      getStore();
    }, []);

    return (
      <View themeColor={weatherColor} style={styles.container}>
        <View themeColor={weatherColor} style={styles.inline}>
          <Pressable
            onPress={() => {
              navigation.navigate('Root');
            }}
          >
            <TabBarIcon name="arrow-left" color="#fff" />
          </Pressable>
          <Text themeColor={weatherColor} style={styles.title}>
            Memo
          </Text>
          <Text style={{ paddingLeft: 10 }} themeColor={weatherColor}>
            {moment(memo.CreatedAt).format('dddd, DD MM yyyy')}
          </Text>
        </View>

        <Image
          style={styles.stretch}
          source={{
            uri: `https://img.youtube.com/vi/${memo.MusicUrl}/0.jpg`,
          }}
        />
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 20,
            fontSize: 30,
            fontWeight: 'bold',
            borderBottomWidth: 1,
            borderBottomColor: '#000',
          }}
          themeColor={weatherColor}
        >
          {memo.Title}
        </Text>
        <Text
          style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}
          themeColor={weatherColor}
        >
          {memo.Description}
        </Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inline: {
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

interface MusicCard {
  Title: string;
  YoutubeId: string;
}

interface MusicCards extends Array<MusicCard> {}
interface userType {
  ID?: number;
  Email: string;
  Image: string;
  Username: string;
}

interface memoType {
  ID?: number;
  AuthorID?: number;
  Title?: string;
  Body?: string;
  Comments?: string;
  Description?: string;
  Weather?: string;
  IsPublic?: boolean;
  MusicUrl?: string;
  SharedToken?: string;
  UpdatedAt?: Date;
  CreatedAt?: Date;
  DeletedAt?: Date;
}
