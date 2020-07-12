import {IWord} from '../../../typings/IEntity';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Tags} from '../../common/Tag';
import {FlatList} from 'react-native-gesture-handler';

interface IContentWordsProps {
  words: IWord[];
}
const ContentWords = ({words}: IContentWordsProps) => {
  return (
    <View style={styles.con}>
      <FlatList
        data={words}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(info) => <ContentWord word={info.item} />}
      />
    </View>
  );
};

interface IContentWordProps {
  word: IWord;
}
const ContentWord = ({word}: IContentWordProps) => {
  return (
    <View style={styles.conWord}>
      <View style={styles.header}>
        <Text style={styles.textEn}>{word.en}</Text>
        <Tags style={styles.tag} type={word.type} styleView={styles.tags} />
      </View>
      <View>
        {word.translate.map((t) => {
          return <Text>{t.ru}</Text>;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: 'white',
  },
  conWord: {
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
  textEn: {
    fontSize: 22,
    flex: 1,
    textAlign: 'center',
  },
  tags: {
    flexDirection: 'row',
    flex: 1,
  },
  tag: {
    margin: 2,
    padding: 0,
  },
  header: {
    flexDirection: 'column',
    flex: 1,
  },
});
export default ContentWords;
