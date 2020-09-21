import React, {useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {PhrasesScreenProps} from '../../../../typings/INavigationProps';
import {IPhrase} from '../../../../typings/IEntity';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../../graphql/mutation';
import SwipeableNative from 'react-native-gesture-handler/Swipeable';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isEmptyObject} from '../../../../utils/isEmptyObject';
import {useTheme} from '../../../../context/ThemeContext';
import InputText from '../../../../components/controls/InputText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width} = Dimensions.get('window');

interface ICache {
  [id: string]: IPhrase;
}

const PhrasesScreen = ({route, navigation}: PhrasesScreenProps) => {
  const entity = route.params.entity;
  const {backgroundColor, textColor, primaryWithText} = useTheme();
  const cache = useRef({} as ICache);
  const [mutationUpdate, {loading}] = useMutation(
    MUTATION.updatePhraseByEntity,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [phrases, setPhrases] = useState(entity.phrases);
  const [deletedPhrases, setDeletedPhrases] = useState(
    entity.disconnectPhrases,
  );

  const colors = {
    backgroundColor: backgroundColor().toString(),
    borderColor: textColor(0.7).toString(),
  };

  const handleDeletedPhrase = (id: number) => {
    setDeletedPhrases((phrases) => {
      return [...phrases, {id}];
    });
  };
  const handleChangePhrase = (phrase: IPhrase) => {
    setPhrases((phrases) => {
      const findIndex = phrases.findIndex((p) => p.id === phrase.id);
      phrases[findIndex] = phrase;
      cache.current[phrase.id] = phrases[findIndex];
      return [...phrases];
    });
  };

  const handleSubmit = () => {
    mutationUpdate({
      variables: {
        data: {
          entityId: entity.id,
          disconnectPhrases: deletedPhrases.map((d) => d.id),
          phrases: Object.values(cache.current).map((p) => ({
            id: p.id,
            ru: p.ru,
            phrase: p.phrase,
          })),
        },
      },
    }).then(() => {
      cache.current = {};
    });
  };
  const actions = [
    {
      icon: 'ios-add',
      label: 'Add phrase',
      size: 40,
      onPress: () =>
        navigation.push('PhrasesModal', {
          setPhrases,
          entity: entity.title,
          entityId: entity.id,
        }),
    },
  ];
  if (!isEmptyObject(cache.current)) {
    actions.push({
      icon: 'ios-save',
      size: 50,
      label: 'Save',
      onPress: handleSubmit,
    });
  }

  const colorsBtn = primaryWithText(0.2);

  const filterPhrases = phrases.filter(
    (p) => !deletedPhrases.some((d) => d.id === p.id),
  );
  return (
    <View
      style={[
        styles.con,
        {
          backgroundColor: colors.backgroundColor.toString(),
        },
      ]}>
      <KeyboardAwareScrollView
        renderToHardwareTextureAndroid={true}
        extraScrollHeight={-76}
        viewIsInsideTabBar={false}>
        {filterPhrases.map((p) => {
          return (
            <PhraseBlock
              phrase={p}
              key={p.id}
              onChangePhrase={handleChangePhrase}
              onDeletePhrase={handleDeletedPhrase}
            />
          );
        })}
      </KeyboardAwareScrollView>
      <ActionButton
        size={60}
        buttonColor={colorsBtn.backgroundColor.toString()}
        hideShadow={true}
        renderIcon={(active) => (
          <Ionicons
            name="ios-add"
            size={30}
            color={colorsBtn.color.toString()}
          />
        )}
        style={{
          opacity: loading ? 0.2 : 1,
        }}>
        {actions.map((a, index) => {
          return (
            <ActionButton.Item
              textContainerStyle={{
                borderColor: colors.borderColor.toString(),
                backgroundColor: colorsBtn.backgroundColor.fade(0.7).toString(),
              }}
              textStyle={{
                color: textColor().toString(),
                borderColor: colors.borderColor.toString(),
              }}
              buttonColor={colorsBtn.backgroundColor.fade(0.2).toString()}
              title={a.label}
              onPress={a.onPress}
              size={a.size}>
              <Ionicons
                size={20}
                name={a.icon}
                color={colorsBtn.color.toString()}
              />
            </ActionButton.Item>
          );
        })}
      </ActionButton>
    </View>
  );
};

interface IPhraseBlockProps {
  onChangePhrase: (o: IPhrase) => any;
  onDeletePhrase: (id: number) => any;
  phrase: IPhrase;
}
const PhraseBlock = ({
  onChangePhrase,
  onDeletePhrase,
  phrase,
}: IPhraseBlockProps) => {
  const {textColor, accent} = useTheme();
  const [en, setEn] = useState(phrase.phrase);
  const [ru, setRU] = useState(phrase.ru);
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-width, 0],
      outputRange: ['#ef5350', '#fff'],
    });
    return (
      <Animated.View style={[styles.wordRightBtn, {backgroundColor: trans}]}>
        <Text style={styles.textRightBtn}>To deleted?</Text>
        <Text style={styles.textRightBtn}>Continue swiping to the left!</Text>
      </Animated.View>
    );
  };

  const handleChangePhrase = () => {
    onChangePhrase({
      phrase: en,
      id: phrase.id,
      ru,
    });
  };

  const borderColor = textColor(0.7).toString();
  return (
    <SwipeableNative
      renderRightActions={renderRightActions}
      useNativeAnimations={false}
      onSwipeableRightOpen={() => onDeletePhrase(phrase.id)}>
      <View
        style={[
          styles.phraseItem,
          {
            borderBottomColor: borderColor,
          },
        ]}>
        <InputText
          size="high"
          value={en}
          backgroundColor={accent(0.5).fade(0.8)}
          onChangeText={(text) => setEn(text)}
          onBlur={handleChangePhrase}
        />
        <InputText
          size="high"
          value={ru}
          onChangeText={(text) => setRU(text)}
          onBlur={handleChangePhrase}
        />
      </View>
    </SwipeableNative>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  wordRightBtn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 8,
  },
  textRightBtn: {
    marginRight: 16,
    fontSize: 16,
  },
  btn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 16,
  },
  phraseItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
});
export default PhrasesScreen;
