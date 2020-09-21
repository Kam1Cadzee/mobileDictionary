import {IPhrase} from '../../../typings/IEntity';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from '../../../context/ThemeContext';
import {useScaleText} from 'react-native-text';

interface IContentWordsProps {
  phrases: IPhrase[];
}
const ContentPhrases = ({phrases}: IContentWordsProps) => {
  const {backgroundColor, textColor} = useTheme();
  const {fontSize: textSizeEn} = useScaleText({fontSize: 18});
  const {fontSize: textSizeRu} = useScaleText({fontSize: 14});

  const colorEn = textColor(0.1).toString();
  const colorRu = textColor(0.3).toString();
  const borderColor = textColor(0.6).toString();

  return (
    <View style={styles.con}>
      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id.toString()}
        style={{backgroundColor: backgroundColor().fade(0.1).toString()}}
        renderItem={(info) => (
          <ContentPhrase
            phrase={info.item}
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
  phrase: IPhrase;
  colorEn: string;
  colorRu: string;
  textSizeEn: any;
  textSizeRu: any;
  borderColor: string;
}
const ContentPhrase = ({
  phrase,
  borderColor,
  colorEn,
  textSizeRu,
  colorRu,
  textSizeEn,
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
        {phrase.phrase}
      </Text>
      <Text style={{color: colorRu, fontSize: textSizeRu}}>{phrase.ru}</Text>
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
    borderBottomWidth: 0.5,
  },
});
export default ContentPhrases;
