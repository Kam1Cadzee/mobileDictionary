import {IPhrase} from '../../../typings/IEntity';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

interface IContentWordsProps {
  phrases: IPhrase[];
}
const ContentPhrases = ({phrases}: IContentWordsProps) => {
  return (
    <View style={styles.con}>
      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(info) => <ContentPhrase phrase={info.item} />}
      />
    </View>
  );
};

interface IContentWordProps {
  phrase: IPhrase;
}
const ContentPhrase = ({phrase}: IContentWordProps) => {
  return (
    <View style={styles.conPhrase}>
      <Text>{phrase.phrase}</Text>
      <Text>{phrase.ru}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: 'white',
  },
  conPhrase: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

    padding: 8,
    margin: 8,
    marginBottom: 0,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
export default ContentPhrases;
