import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SentencesModalProps} from '../../../../typings/INavigationProps';

const SentencesModal = ({}: SentencesModalProps) => {
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
export default SentencesModal;
