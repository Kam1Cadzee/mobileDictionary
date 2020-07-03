import React from 'react';
import {Menu} from 'react-native-paper';
import {View} from 'react-native';
import {useApolloClient} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {ProfileScreenProps} from '../../typings/mainTypings';

const ProfileScreen = (props: ProfileScreenProps) => {
  const client = useApolloClient();
  const handleExit = async () => {
    await client.resetStore();
    AsyncStorage.removeItem('token');
  };

  return (
    <View style={{flex: 1}}>
      <Menu.Item icon="logout" onPress={handleExit} title="Exit" />
    </View>
  );
};

export default ProfileScreen;
