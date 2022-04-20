import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export default function weatherWidget(prop: weatherType) {
  console.log(prop.weather);
  // const { weather , base ,clouds , cod ,coord , main , name , timezone ,wind } = prop.weather
  console.log("???", prop.weather.weather);
  let ex_array = [{ name: "a" }, { name: "b" }];

  //   const listWeather = () => {
  //     if (prop.weather.weather) {
  //       for (let item of prop.weather.weather) {
  //         console.log(item);
  //         <Text>{item.main}</Text>;
  //       }
  //     }
  //   };
  const ListWeather = prop.weather?.weather?.map((item) => {
    console.log(item);
    <Text>{item.main}</Text>;
  });

  return (
    <Layout>
      <Text>{prop.weather.name}</Text>
    </Layout>
  );
}

interface weatherType {
  name: string;
  weather: {
    weather: MyInterface;
    name: string;
  };
}

interface MyInterface extends Array<exArray> {}

interface weatherArray {
  [index: number]: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

interface exArray {
  id: number;
  main: string;
  description: string;
  icon: string;
}
