import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useApolloClient} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Theme, useTheme} from '../../context/ThemeContext';
import {ProfileScreenProps} from '../../typings/INavigationProps';
import Icon from 'react-native-vector-icons/Ionicons';
import {useScaleText} from 'react-native-text';
import Logo from '../../components/common/Logo';
import {getStyleFont} from '../../utils/getStyleFont';
import PreviewTheme from '../../components/screens/ProfileScreen/PreviewTheme';

const {height, width} = Dimensions.get('window');

const ProfileScreen = (props: ProfileScreenProps) => {
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
  const {fontSize: fsTitle} = useScaleText({fontSize: 18});
  const client = useApolloClient();

  const handleExit = async () => {
    await client.resetStore();
    AsyncStorage.removeItem('token');
  };

  return (
    <SafeAreaView
      style={[
        styles.con,
        {
          backgroundColor: backgroundColor().toString(),
        },
      ]}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.exitItem}>
          <Text
            style={{
              fontSize: fsTitle,
              ...getStyleFont('600-SemiBold'),
            }}>
            Settings
          </Text>
          <Icon
            onPress={handleExit}
            name="ios-exit"
            size={50}
            color={textColor().toString()}
          />
        </View>
        <View
          style={[
            styles.top,
            {
              backgroundColor: accent(0.3).toString(),
              height: 200,
            },
          ]}>
          <Image
            source={require('../../assets/images/main-img-1.jpg')}
            style={[styles.img, {opacity: 0.5}]}
            resizeMode={'cover'}
          />
          <Logo size={130} loading={false} />
        </View>
        <View
          style={[
            styles.titleItem,
            {
              backgroundColor: accent(0.3).fade(0.7).toString(),
            },
          ]}>
          <Text style={styles.textItem}>THEME</Text>
        </View>
        <View
          style={[
            styles.preview,
            {
              backgroundColor: accent(0.6).fade(0.7).toString(),
            },
          ]}>
          <PreviewTheme theme={'light'} />
          <PreviewTheme theme={'dark'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  exitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textItem: {
    textTransform: 'uppercase',
    ...getStyleFont('600-SemiBold'),
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    width,
  },
  preview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
});
export default ProfileScreen;
