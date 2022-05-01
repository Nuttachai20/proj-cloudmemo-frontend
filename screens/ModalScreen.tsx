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
          placeholder="Username"
          value={title}
          onChangeText={nextValue => setTitle(nextValue)}
        />
        <Input
          label="description"
          style={{ width: '80%', marginBottom: 10 }}
          multiline={true}
          textStyle={{ minHeight: 100 }}
          placeholder="Multiline"
          value={desc}
          onChangeText={nextValue => setDesc(nextValue)}
        />
        <Input
          label="Music"
          style={{ width: '80%', marginBottom: 10 }}
          placeholder="Input your music title here"
          value={searchInput}
          onChangeText={nextValue => {
            setSearchInput(nextValue);
          }}
        />
        <Button onPress={() => searchMusic(searchInput)} status="primary">
          Search memo
        </Button>
        {musicCards.length > 0 ? (
          <ScrollView>
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
                  <Text style={{ paddingLeft: 10 }} themeColor={weatherColor}>
                    {item.Title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          ''
        )}

        <Button
          onPress={() => CreateMemo(title, desc, url.YoutubeId)}
          status="primary"
        >
          Create Memo
        </Button>
        <Pressable
          onPress={() => navigation.navigate('Modal')}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Text>add</Text>
        </Pressable>
      </View>
    );
  }
}

// export default function ModalScreen({
//   navigation,
// }: RootTabScreenProps<'Memo'>) {
//   const [title, setTitle] = useState('');
//   const [url, setUrl] = useState<MusicCard>({ Title: '', YoutubeId: '' });
//   const [desc, setDesc] = useState('');
//   const [searchInput, setSearchInput] = useState('');
//   const [token, setToken] = useState('');
//   const [musicCards, setMusicCards] = useState<MusicCards>([]);

//   // const [user, setUser] = useState('');

//   const [weatherColor, setWeatherColor] = useState('');

//   useEffect(() => {
//     const getWeather = async (): Promise<any> => {
//       let weather = await AsyncStorage.getItem('weather');
//       let user_info = await AsyncStorage.getItem('user');
//       let token = await AsyncStorage.getItem('access');
//       setWeatherColor(`${weather}`);
//       setToken(`${token}`);
//       // setUser(user_info);
//     };
//     getWeather();
//   }, []);

//   const searchMusic = async (text: string) => {
//     axios
//       .post(
//         `${BaseUrl.baseurl}/youtube/search`,
//         {
//           data: text,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )
//       .then(res => {
//         console.log('res.data', res.data);
//         const { data } = res.data;
//         console.log(data);
//         setMusicCards(data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     console.log('token', token);
//   };

//   const CreateMemo = async (
//     title: string,
//     description: string,
//     musicUrl: string,
//   ) => {
//     let token = await AsyncStorage.getItem('access');
//     axios
//       .post(
//         `${BaseUrl.baseurl}/memo/create`,
//         {
//           title: title,
//           desc: description,
//           weather: weatherColor,
//           music_url: musicUrl,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )
//       .then(res => {
//         console.log(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   return (
//     <View>
//       <View>
//         <Pressable
//           onPress={() => {
//             navigation.navigate('Memo');
//           }}
//         >
//
//             <TabBarIcon name="arrow-left" color="#fff" />
//
//         </Pressable>
//         <Text themeColor={weatherColor} style={styles.title}>
//           Memo
//         </Text>
//       </View>
//       <View style={styles.container}>
//         <ScrollView>
//           <Input
//             label="Title"
//             placeholder="Username"
//             value={title}
//             onChangeText={nextValue => setTitle(nextValue)}
//           />
//           <Input
//             label="description"
//             multiline={true}
//             textStyle={{ minHeight: 100 }}
//             placeholder="Desciption"
//             value={desc}
//             onChangeText={nextValue => setDesc(nextValue)}
//           />
//           <Input
//             label="Music"
//             placeholder="Input your music title here"
//             value={searchInput}
//             onChangeText={nextValue => {
//               setSearchInput(nextValue);
//             }}
//           />
//           <Button onPress={() => searchMusic(searchInput)} status="primary">
//             Search memo
//           </Button>

//           <Button
//             onPress={() => CreateMemo(title, desc, url.YoutubeId)}
//             status="primary"
//           >
//             Create Memo
//           </Button>
//           <Text>{musicCards.length}</Text>
//           {musicCards.length > 0
//             ? musicCards.slice().map(item => {
//                 return (
//                   <TouchableOpacity
//                     onPress={() => {
//                       setUrl(item);
//                     }}
//                     style={[styles.card]}
//                     key={item.YoutubeId}
//                   >
//                     <Image
//                       style={styles.stretch}
//                       source={{
//                         uri: `https://img.youtube.com/vi/${item.YoutubeId}/default.jpg`,
//                       }}
//                     />
//                     <Text style={{ paddingLeft: 10 }} themeColor={weatherColor}>
//                       {item.Title}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })
//             : ''}
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

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
