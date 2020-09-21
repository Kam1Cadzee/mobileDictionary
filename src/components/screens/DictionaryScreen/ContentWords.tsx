import {IWord} from '../../../typings/IEntity';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Tag, {Tags} from '../../common/Tag';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from '../../../context/ThemeContext';
import {useScaleText} from 'react-native-text';
import {getStyleFont} from '../../../utils/getStyleFont';

interface IContentWordsProps {
  words: IWord[];
}
const ContentWords = ({words}: IContentWordsProps) => {
  const {backgroundColor, textColor} = useTheme();
  const {fontSize: textSizeEn} = useScaleText({fontSize: 18});
  const {fontSize: textSizeRu} = useScaleText({fontSize: 14});

  const colorEn = textColor(0.1).toString();
  const colorRu = textColor(0.3).toString();
  const borderColor = textColor(0.6).toString();

  return (
    <View style={styles.con}>
      <FlatList
        data={words}
        keyExtractor={(item) => item.id.toString()}
        style={{backgroundColor: backgroundColor().fade(0.1).toString()}}
        renderItem={(info) => (
          <ContentWord
            word={info.item}
            colorEn={colorEn}
            colorRu={colorRu}
            textSizeEn={textSizeEn}
            textSizeRu={textSizeRu}
            borderColor={borderColor}
          />
        )}
      />
    </View>
  );
};

interface IContentWordProps {
  word: IWord;
  colorEn: string;
  colorRu: string;
  textSizeEn: any;
  textSizeRu: any;
  borderColor: string;
}
const ContentWord = ({
  word,
  colorEn,
  colorRu,
  textSizeEn,
  textSizeRu,
  borderColor,
}: IContentWordProps) => {
  return (
    <View style={[styles.conWord, {borderBottomColor: borderColor}]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.textEn,
            {
              color: colorEn,
              fontSize: textSizeEn,
            },
          ]}>
          {word.en.toLowerCase()}
        </Text>
        <Tag
          style={styles.tag}
          type={word.type}
          styleText={{
            textAlign: 'center',
          }}
        />
      </View>
      <View>
        {word.translate.map((t) => {
          return (
            <Text
              style={[
                styles.textRu,
                {
                  color: colorRu,
                  fontSize: textSizeRu,
                },
              ]}>
              {t.ru.toLowerCase()}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  conWord: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 0,
    flex: 1,
    borderBottomWidth: 0.5,
  },
  textEn: {
    flex: 1,
    ...getStyleFont('400-Regular'),
  },
  textRu: {},
  tag: {
    padding: 0,
    flex: 1,
    width: 100,
  },
  header: {
    flexDirection: 'row',
  },
});
export default ContentWords;
