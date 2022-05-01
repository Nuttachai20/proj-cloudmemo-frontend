import { StyleSheet } from 'react-native';

import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../constants/BaseUrl';
import { RootStackScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<'Login'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const userLogin = (username: any, password: any) => {
    if (!username || !password) {
      alert('invaild input');
      return;
    }
    console.log('username', username);
    console.log('password', password);
    axios
      .post(`${BaseUrl.baseurl}/user/sign/in`, {
        Email: username,
        Password: password,
      })
      .then(async (res: any) => {
        const { access, refresh } = res.data.tokens;

        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        await AsyncStorage.setItem('access', access);
        await AsyncStorage.setItem('refresh', refresh);

        navigation.navigate('Root');
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.separator} />
      <Text style={styles.title}>Login</Text>
      <Input
        label="Email Address"
        placeholder="Email"
        value={username}
        onChangeText={nextValue => setUsername(nextValue)}
      />

      <Input
        value={password}
        label="Password"
        placeholder="Password"
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPassword(nextValue)}
      />
      <Text
        style={styles.captionText}
        onPress={() => {
          navigation.navigate('Register');
        }}
      >
        Doesn't have account?
      </Text>

      <Button
        style={styles.button}
        onPress={() => userLogin(username, password)}
        status="primary"
      >
        Login
      </Button>
    </Layout>
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
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8F9BB3',
  },
  button: {
    margin: 2,
  },
});
