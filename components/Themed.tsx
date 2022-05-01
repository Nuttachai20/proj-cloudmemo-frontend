/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const weather = async () => {
  return await AsyncStorage.getItem('weather');
};

export function useThemeColor(
  theme: keyof typeof Colors,
  colorName: keyof typeof Colors.cloud &
    keyof typeof Colors.light &
    keyof typeof Colors.dark,
) {
  return Colors[theme][colorName];
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  themeColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, themeColor, ...otherProps } = props;
  // console.log(' themeColor:', themeColor);

  const color = useThemeColor(
    themeColor === 'Clouds'
      ? 'cloud'
      : themeColor === 'Rain'
      ? 'dark'
      : 'light',
    'text',
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, themeColor, ...otherProps } = props;
  // console.log(themeColor);

  const backgroundColor = useThemeColor(
    themeColor === 'Clouds'
      ? 'cloud'
      : themeColor === 'Rain'
      ? 'dark'
      : 'light',
    'background',
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
