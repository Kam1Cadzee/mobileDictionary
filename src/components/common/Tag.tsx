import React from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import {usePalletColorsForType} from '../../utils/getPalleteColorsForType';
import {IPartOfSpeech, PartOfSpeech} from '../../typings/PartOfSpeech';
import {useFindPartOfSpeech} from '../../useHooks/usePartOfSpeech';
import {useScaleText} from 'react-native-text';

interface IPartOfSpeechProps {
  type: PartOfSpeech;
  style?: any;
  styleText?: any;
  styleView?: any;
  onPress?: any;
  name?: 'en' | 'ru' | 'ua';
}

const Tag = ({
  style,
  type,
  onPress,
  styleText,
  name = 'en',
}: IPartOfSpeechProps) => {
  const colors = usePalletColorsForType(type);
  const findType: IPartOfSpeech | any = useFindPartOfSpeech(type);
  const {fontSize} = useScaleText({fontSize: 14});

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={[
        styles.type,
        {
          backgroundColor: 'transparent',
          borderColor: colors.medium,
        },
        style,
      ]}>
      <Text style={[{color: colors.dark, fontSize}, styleText]}>
        {findType[name] ? findType[name] : findType}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const Tags = ({style, type, styleText, styleView}: IPartOfSpeechProps) => {
  const colors = usePalletColorsForType(type);
  const findType: IPartOfSpeech | any = useFindPartOfSpeech(type);

  if (findType.en) {
    return (
      <View style={[styles.tags, styleView]}>
        <View
          style={[
            styles.type,
            {
              backgroundColor: 'transparent',
              borderColor: colors.medium,
            },
            style,
          ]}>
          <Text style={[{color: colors.dark}, styleText]}>{findType.en}</Text>
        </View>
        <View
          style={[
            styles.type,
            {
              backgroundColor: 'transparent',
              borderColor: colors.medium,
            },
            style,
          ]}>
          <Text style={[{color: colors.dark}, styleText]}>{findType.ru}</Text>
        </View>
        <View
          style={[
            styles.type,
            {
              backgroundColor: 'transparent',
              borderColor: colors.medium,
            },
            style,
          ]}>
          <Text style={[{color: colors.dark}, styleText]}>{findType.ua}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.type,
          {
            backgroundColor: 'transparent',
            borderColor: colors.medium,
          },
          style,
        ]}>
        <Text style={[{color: colors.dark}, styleText]}>{findType}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  type: {
    borderWidth: 0.5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontWeight: '100',
  },
  tags: {},
});

export {Tags};
export default Tag;
