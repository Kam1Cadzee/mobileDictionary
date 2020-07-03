import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PhrasesScreen = () => {
  return (
    <View style={styles.con}>
      <Text>PhrasesView</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    backgroundColor: 'red',
    flex: 1,
  },
});
export default PhrasesScreen;
