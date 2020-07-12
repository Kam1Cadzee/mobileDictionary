import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getPalletColorsForType} from '../../utils/getPalleteColorsForType';
import {IPartOfSpeech, PartOfSpeech} from '../../typings/PartOfSpeech';
import {Text} from 'react-native-paper';
import {useFindPartOfSpeech} from '../../useHooks/usePartOfSpeech';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface IPartOfSpeechProps {
  type: PartOfSpeech;
  style?: any;
  styleText?: any;
  styleView?: any;
  onPress?: any;
}

const Tag = ({style, type, onPress, styleText}: IPartOfSpeechProps) => {
  const colors = getPalletColorsForType(type);
  const findType: IPartOfSpeech | any = useFindPartOfSpeech(type);

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={[
        styles.type,
        {
          backgroundColor: colors.light,
          borderColor: colors.medium,
        },
        style,
      ]}>
      <Text style={[{color: colors.dark}, styleText]}>
        {findType.en ? findType.en : findType}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const Tags = ({style, type, styleText, styleView}: IPartOfSpeechProps) => {
  const colors = getPalletColorsForType(type);
  const findType: IPartOfSpeech | any = useFindPartOfSpeech(type);

  if (findType.en) {
    return (
      <View style={[styles.tags, styleView]}>
        <View
          style={[
            styles.type,
            {
              backgroundColor: colors.light,
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
              backgroundColor: colors.light,
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
              backgroundColor: colors.light,
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
            backgroundColor: colors.light,
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
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tags: {},
});

export {Tags};
export default Tag;
