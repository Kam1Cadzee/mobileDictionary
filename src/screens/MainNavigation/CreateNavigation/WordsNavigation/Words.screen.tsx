import React, {useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import SwipeableNative from 'react-native-gesture-handler/Swipeable';
import {WordsScreenProps} from '../../../../typings/INavigationProps';
import {ITranslate, IWord} from '../../../../typings/IEntity';
import {usePalletColorsForType} from '../../../../utils/getPalleteColorsForType';
import {PartOfSpeech} from '../../../../typings/PartOfSpeech';
import ModalAddTranslate from '../../../../components/screens/WordsScreen/ModalAddTranslate';
import Tag from '../../../../components/common/Tag';
import ModalChangeType from '../../../../components/screens/WordsScreen/ModalChangeType';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../../graphql/mutation';
import {isEmptyObject} from '../../../../utils/isEmptyObject';
import {useTheme} from '../../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/EvilIcons';
import InputText from '../../../../components/controls/InputText';
import Color from 'color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNotification} from '../../../../context/NotificationContext';
import {RectButton} from 'react-native-gesture-handler';

interface ICache {
  [id: string]: IWord;
}
const {width} = Dimensions.get('window');
const WordsScreen = ({route, navigation}: WordsScreenProps) => {
  const {backgroundColor, textColor, primaryWithText} = useTheme();
  const [mutationUpdate, {loading: loadingUpdate}] = useMutation(
    MUTATION.updateWordsByEntity,
  );
  const notif = useNotification();
  const [words, setWords] = useState(route.params.entity.words);
  const cache = useRef({} as ICache);
  const [deletedWords, setDeletedWords] = useState(
    route.params.entity.disconnectWords,
  );

  const colors = {
    backgroundColor: backgroundColor().toString(),
    borderColor: textColor(0.7).toString(),
    colorEn: textColor().toString(),
    colorRu: textColor(0.2).toString(),
  };

  const handleUpdateWord = () => {
    mutationUpdate({
      variables: {
        data: {
          entityId: route.params.entity.id,
          words: Object.values(cache.current).map((w) => ({
            type: w.type,
            id: w.id,
            disconnectTranslate: w.disconnectTranslate.map((d) => d.id),
            translate: w.translate.map((t) => ({
              id: t.id,
              type: t.type,
              ru: t.ru,
            })),
          })),
          disconnectWords: deletedWords.map((d) => d.id),
        },
      },
    }).then(() => {
      cache.current = {};
      notif({
        type: 'success',
        time: 5,
        text: 'Entity of words has succeeded in saving!',
      });
    });
  };

  const changeWord = (id: number, type: PartOfSpeech) => {
    setWords((words) => {
      const indexWord = words.findIndex((w) => w.id === id);
      words[indexWord] = {...words[indexWord], type};
      cache.current[id] = words[indexWord];
      return [...words];
    });
  };

  const changeTranslate = (idWord: number, id: number, value: string) => {
    setWords((words) => {
      const indexWord = words.findIndex((w) => w.id === idWord);
      const indexTranslate = words[indexWord].translate.findIndex(
        (t) => t.id === id,
      );
      words[indexWord].translate[indexTranslate].ru = value;

      cache.current[id] = words[indexWord];
      return [...words];
    });
  };

  const handleDeleteTranslate = (idWord: number, id: number) => {
    setWords((words) => {
      const indexWord = words.findIndex((w) => w.id === idWord);
      words[indexWord].disconnectTranslate = [
        ...words[indexWord].disconnectTranslate,
        {id},
      ];
      cache.current[idWord] = words[indexWord];
      return [...words];
    });
    notif({
      type: 'success',
      time: 2,
      text: 'Translation of word has been deleted',
    });
  };

  const handleAddTranslate = (idWord: number, data: ITranslate) => {
    const findIndex = words.findIndex((w) => w.id === idWord);
    const index = words[findIndex].translate.findIndex((t) => t.id === data.id);
    if (index === -1) {
      words[findIndex].translate.push(data);
      setWords([...words]);
    }

    notif({
      type: 'success',
      time: 2,
      text: 'Translation of word has been added',
    });
  };

  const handleDeleteWord = (id: number) => {
    setDeletedWords((words) => {
      return [...words, {id: id}];
    });

    notif({
      type: 'success',
      time: 2,
      text: 'Word has been deleted',
    });
  };
  const filterWords = words.filter(
    (w) => !deletedWords.some((d) => d.id === w.id),
  );

  const actions = [
    {
      icon: 'ios-add',
      label: 'Add word',
      size: 40,
      onPress: () =>
        navigation.push('WordsModal', {
          setWords,
          entity: route.params.entity.title,
          entityId: route.params.entity.id,
        }),
    },
  ];
  if (!isEmptyObject(cache.current)) {
    actions.push({
      icon: 'ios-save',
      size: 50,
      label: 'Save',
      onPress: handleUpdateWord,
    });
  }
  const colorsBtn = primaryWithText(0.2);

  return (
    <View
      style={[
        styles.con,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <KeyboardAwareScrollView
        renderToHardwareTextureAndroid={true}
        extraScrollHeight={-76}
        viewIsInsideTabBar={false}>
        {filterWords.map((word) => (
          <WordItem
            key={word.id}
            word={word}
            onDeleteWord={handleDeleteWord}
            changeWord={changeWord}
            changeTranslate={changeTranslate}
            onDeleteTranslate={handleDeleteTranslate}
            onAddTranslate={handleAddTranslate}
            {...colors}
          />
        ))}
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
          opacity: loadingUpdate ? 0.2 : 1,
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

interface IWordsItem {
  word: IWord;
  onDeleteWord: (id: number) => any;
  onDeleteTranslate: (idWord: number, id: number) => any;
  changeWord: (id: number, type: PartOfSpeech) => any;
  changeTranslate: (idWord: number, id: number, value: string) => any;
  onAddTranslate: (idWord: number, data: ITranslate) => any;
  borderColor: string;
  colorEn: string;
  colorRu: string;
}
const WordItem = ({
  word,
  onDeleteWord,
  changeWord,
  changeTranslate,
  onDeleteTranslate,
  onAddTranslate,
  borderColor,
  colorEn,
  colorRu,
}: IWordsItem) => {
  const colors = usePalletColorsForType(word.type);
  const {secondary} = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

  const renderRightActions = (progress, dragX) => {
    return (
      <RectButton
        style={{backgroundColor: secondary(0.5).toString()}}
        onPress={() => onDeleteWord(word.id)}>
        <Animated.View
          style={[
            {
              width: 80,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Icon size={40} name={'trash'} color={'white'} />
        </Animated.View>
      </RectButton>
    );
  };

  const onChangeTranslate = (id: number, value: string) => {
    changeTranslate(word.id, id, value);
  };

  const handleDeleteTranslate = (id: number) => {
    onDeleteTranslate(word.id, id);
  };

  const filterTranslate = word.translate.filter(
    (t) => !word.disconnectTranslate.some((d) => d.id === t.id),
  );
  return (
    <SwipeableNative
      renderRightActions={renderRightActions}
      useNativeAnimations={false}>
      <View
        style={[
          styles.wordItem,
          {
            backgroundColor: colors.light,
            borderBottomColor: borderColor,
          },
        ]}>
        <View style={styles.viewTopWord}>
          <Tag type={word.type} onPress={() => setVisible2(true)} />
          <Text style={[styles.textEn, {color: colorEn}]}>{word.en}</Text>
          <Icon
            name="plus"
            size={30}
            color={colorEn}
            onPress={() => setVisible(true)}
          />
          <ModalAddTranslate
            visible={visible}
            onDismiss={() => setVisible(false)}
            onSubmit={onAddTranslate}
            wordId={word.id}
          />
          <ModalChangeType
            visible={visible2}
            onDismiss={() => setVisible2(false)}
            wordId={word.id}
            onSubmit={changeWord}
            value={word.type}
          />
        </View>
        <View style={styles.conRu}>
          {filterTranslate.map((t, index) => {
            return (
              <TranslateItem
                key={t.id}
                translate={t}
                changeTranslate={onChangeTranslate}
                onDeleteTranslate={handleDeleteTranslate}
                canDelete={filterTranslate.length > 1}
                color={colorRu}
                backgroundColor={colors.light}
              />
            );
          })}
        </View>
      </View>
    </SwipeableNative>
  );
};

interface ITranslateItemProps {
  translate: ITranslate;
  changeTranslate: (id: number, value: string) => any;
  onDeleteTranslate: (id: number) => any;
  canDelete: boolean;
  color: string;
  backgroundColor: string;
}

const TranslateItem = ({
  translate,
  changeTranslate,
  onDeleteTranslate,
  canDelete,
  color,
  backgroundColor,
}: ITranslateItemProps) => {
  const [value, setValue] = useState(translate.ru);
  const left = useRef(new Animated.Value(0)).current;

  const handleBlur = () => {
    changeTranslate(translate.id, value);
  };

  const handleDelete = (id: number) => {
    Animated.timing(left, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      onDeleteTranslate(id);
    });
  };

  const height = left.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });
  const scaleY = left.interpolate({
    inputRange: [0, 0.6],
    outputRange: [1, 0],
  });

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        //height: height,
        opacity: scaleY,
        transform: [
          {
            scaleY: scaleY,
          },
        ],
      }}>
      <InputText
        backgroundColor={Color(backgroundColor)}
        style={{flex: 1}}
        size={'low'}
        onBlur={handleBlur}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      {canDelete && (
        <Icon
          name="close"
          size={30}
          color={color}
          onPress={() => handleDelete(translate.id)}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  btnRight: {
    width: 50,
    backgroundColor: 'black',
  },
  textRuEdit: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 0,
    margin: 0,
    height: 28,
    borderRadius: 0,
  },
  btnTopWord: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  viewTopWord: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 8,
  },
  wordRightBtn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 8,
    marginBottom: 0,
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
  wordItem: {
    marginBottom: 0,
    borderBottomWidth: 0.5,
  },
  textEn: {
    fontSize: 18,
    padding: 8,
  },
  conRu: {
    padding: 8,
  },
  textRu: {
    fontSize: 16,
    padding: 8,
    paddingHorizontal: 16,
  },
});
export default WordsScreen;
