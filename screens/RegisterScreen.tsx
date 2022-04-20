import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon,  Layout, Text , Input ,  Button } from '@ui-kitten/components';
import { useEffect, useState } from 'react';



export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);


    return (
      <Layout style={styles.container}>
        <Layout style={styles.separator}  />
        <Text style={styles.title}>Register</Text>
        <Input
        label='Username'
        placeholder='Username'
        value={username}
        onChangeText={nextValue => setUsername(nextValue)}
        />
      <Input
      value={password}
      label='Password'
      placeholder='Password'
      secureTextEntry={secureTextEntry}
      onChangeText={nextValue => setPassword(nextValue)}
    />
     <Input
      value={password}
      label='Confirm Password'
      placeholder='Password'
      secureTextEntry={secureTextEntry}
      onChangeText={nextValue => setPassword(nextValue)}
    />
        <Button style={styles.button} status='primary' >
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
      marginRight: 5
    },
    captionText: {
      fontSize: 12,
      fontWeight: "400",
      fontFamily: "opensans-regular",
      color: "#8F9BB3",
    },
    button: {
      margin: 2,
    },
  });
  