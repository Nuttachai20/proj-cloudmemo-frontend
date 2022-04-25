import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon, Layout, Text, Input, Button } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import BaseUrl from '../constants/BaseUrl';
import axios from 'axios';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const userRegister = async (
    email: string,
    username: string,
    password: string,
    rePassword: string,
  ) => {
    if (!email) {
      alert('Please input Email');
      return;
    }
    if (!username) {
      alert('Please input Username');
      return;
    }
    if (!password) {
      alert('Please input Password');
      return;
    }
    if (!rePassword || password !== rePassword) {
      alert('Comfirm Password invaild');
      return;
    }

    axios
      .post(`${BaseUrl.baseurl}user/sign/up`, {
        Email: email,
        Password: password,
        Username: username,
        Image: 'https://miro.medium.com/max/1290/1*c0ubNnhMPzRZ_KvBTYbLqQ.png',
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.separator} />
      <Text style={styles.title}>Register</Text>

      <Input
        label="Username"
        placeholder="Username"
        value={username}
        onChangeText={nextValue => setUsername(nextValue)}
      />
      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={nextValue => setEmail(nextValue)}
      />
      <Input
        value={password}
        label="Password"
        placeholder="Password"
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPassword(nextValue)}
      />
      <Input
        value={rePassword}
        label="Confirm Password"
        placeholder="Password"
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setRePassword(nextValue)}
      />
      <Button
        style={styles.button}
        status="primary"
        onPress={() => {
          userRegister(email, username, password, rePassword);
        }}
      >
        Register
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
    fontFamily: 'opensans-regular',
    color: '#8F9BB3',
  },
  button: {
    margin: 2,
  },
  icon: {
    height: 50,
    width: 50,
  },
});
