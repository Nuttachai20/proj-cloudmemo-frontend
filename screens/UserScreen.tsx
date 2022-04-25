import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Button } from '@ui-kitten/components';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { RootTabScreenProps } from '../types';

export default function UserScreen({ navigation }: RootTabScreenProps<'User'>) {
  const navigationRef = useNavigationContainerRef();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <Button
        onPress={() => {
          alert('goback');
          navigationRef.navigate('Login');
        }}
      >
        logout
      </Button>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/MemoScreen.tsx" />
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
