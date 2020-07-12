import {IPhrase, ISentence, IWord} from '../../../typings/IEntity';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

interface IContentWordsProps {
  sentences: ISentence[];
}
const ContentSentences = ({sentences}: IContentWordsProps) => {
  return (
    <View style={styles.con}>
      <FlatList
        data={sentences}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(info) => <ContentSentence sentence={info.item} />}
      />
    </View>
  );
};

interface IContentWordProps {
  sentence: ISentence;
}
const ContentSentence = ({sentence}: IContentWordProps) => {
  return (
    <View style={styles.conPhrase}>
      <Text>{sentence.sentence}</Text>
      <Text>{sentence.ru}</Text>
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

export default ContentSentences;
