import React, {useState} from 'react';
import {Menu} from 'react-native-paper';
import {View, Text} from 'react-native';
import {useApolloClient} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from '../../context/ThemeContext';
import {ProfileScreenProps} from '../../typings/INavigationProps';
import Slider from 'react-native-slider';
import Color from 'color';
import {ScrollView} from 'react-native-gesture-handler';

const test = [
  0,
  0.1,
  0.2,
  0.3,
  0.4,
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1,
  2,
  4,
  6,
  8,
  10,
  12,
  14,
  16,
  20,
];
const f = [
  'lighten',
  'darken',
  'saturate',
  'desaturate',
  'whiten',
  'blacken',
  'fade',
  'opaquer',
];
const color = Color('#1d1d26');
const getCof = (i: number) => {
  if (i >= 0.1) return 1;
  return Math.abs(Math.log(i)) * 10;
};
const ProfileScreen = (props: ProfileScreenProps) => {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const {
    backgroundColor,
    primaryTest,
    primary,
    textColor,
    primaryWithText,
    backgroundColorWithText,
    accent,
    accentWithText,
  } = useTheme();
  const client = useApolloClient();
  const handleExit = async () => {
    await client.resetStore();
    AsyncStorage.removeItem('token');
  };

  const colors = accentWithText(value2, backgroundColor());
  const textcolor = textColor(value2);
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{flex: 1, margin: 50, backgroundColor: backgroundColor(value)}}>
        <Menu.Item icon="logout" onPress={handleExit} title="Exit" />
        <Slider value={value} onValueChange={(value) => setValue(value)} />
        <Slider value={value2} onValueChange={(value) => setValue2(value)} />

        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <View
            style={{
              flex: 1,
              height: 40,
              borderBottomColor: textColor(i / 10),
              borderBottomWidth: 1,
            }}></View>
        ))}
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <View
            style={{
              flex: 1,
              height: 40,
              borderBottomColor: backgroundColor(i / 10),
              borderBottomWidth: 1,
            }}></View>
        ))}

        <Text>
          {textcolor} {value2}
        </Text>
        <View
          style={{
            width: 300,
            height: 300,
            padding: 30,
            backgroundColor: color
              .lighten(value * getCof(color.luminosity()))
              .hex(),
          }}>
          <View
            style={{
              width: 200,
              height: 50,
              backgroundColor: colors.backgroundColor,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '900',
                margin: 10,
                color: colors.color,
              }}>
              {'hello'}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 82,
              fontWeight: '900',
              margin: 10,
              color: textcolor,
            }}>
            {'hello'}
          </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {f.map((j) => {
            return (
              <View style={{flex: 1, flexDirection: 'column'}}>
                {test.map((i) => {
                  return (
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: primaryTest(i, j),
                      }}>
                      <Text>{i}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
