import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SentencesScreenProps} from '../../../../typings/INavigationProps';

const SentencesScreen = ({}: SentencesScreenProps) => {
  return (
    <View style={styles.con}>
      <Text>SentencesView</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
});
export default SentencesScreen;
