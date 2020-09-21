import {IPhrase, ISentence, IWord} from '../../../typings/IEntity';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from '../../../context/ThemeContext';
import {useScaleText} from 'react-native-text';

interface IContentWordsProps {
  sentences: ISentence[];
}
const ContentSentences = ({sentences}: IContentWordsProps) => {
  const {backgroundColor, textColor} = useTheme();
  const {fontSize: textSizeEn} = useScaleText({fontSize: 18});
  const {fontSize: textSizeRu} = useScaleText({fontSize: 14});

  const colorEn = textColor(0.1).toString();
  const colorRu = textColor(0.3).toString();
  const borderColor = textColor(0.6).toString();
  return (
    <View style={styles.con}>
      <FlatList
        data={sentences}
        keyExtractor={(item) => item.id.toString()}
        style={{backgroundColor: backgroundColor().fade(0.1).toString()}}
        renderItem={(info) => (
          <ContentSentence
            sentence={info.item}
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
  sentence: ISentence;
  colorEn: string;
  colorRu: string;
  textSizeEn: any;
  textSizeRu: any;
  borderColor: string;
}
const ContentSentence = ({
  sentence,
  textSizeEn,
  colorEn,
  borderColor,
  colorRu,
  textSizeRu,
}: IContentWordProps) => {
  return (
    <View
      style={[
        styles.conPhrase,
        {
          borderBottomColor: borderColor,
        },
      ]}>
      <Text style={{color: colorEn, fontSize: textSizeEn}}>
        {sentence.sentence}
      </Text>
      <Text style={{color: colorRu, fontSize: textSizeRu}}>{sentence.ru}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  conPhrase: {
    padding: 8,
    marginBottom: 0,
    flex: 1,
  },
});

export default ContentSentences;
