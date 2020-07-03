import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SentencesScreen = () => {
  return (
    <View style={styles.con}>
      <Text>SentencesView</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    backgroundColor: 'blue',
    flex: 1,
  },
});
export default SentencesScreen;
