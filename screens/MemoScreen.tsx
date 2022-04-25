import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Layout, Input, Button } from '@ui-kitten/components';
import { useState } from 'react';

export default function MemoScreen() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Input
        label="Username"
        placeholder="Username"
        value={text}
        onChangeText={nextValue => setText(nextValue)}
      />
      <Input
        multiline={true}
        textStyle={{ minHeight: 100 }}
        placeholder="Multiline"
        value={text}
        onChangeText={nextValue => setText(nextValue)}
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
