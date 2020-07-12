import React, {useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  DataTable,
  FAB,
  IconButton,
  Modal,
  Portal,
  TextInput,
} from 'react-native-paper';
import Swipeable from 'react-native-swipeable';
import {FlatList, RectButton} from 'react-native-gesture-handler';
import SwipeableNative from 'react-native-gesture-handler/Swipeable';
import {WordsScreenProps} from '../../../../typings/INavigationProps';
import {ITranslate, IWord} from '../../../../typings/IEntity';
import {getPalletColorsForType} from '../../../../utils/getPalleteColorsForType';
import {PartOfSpeech} from '../../../../typings/PartOfSpeech';
import ModalAddTranslate from '../../../../components/screens/WordsScreen/ModalAddTranslate';
import Tag from '../../../../components/common/Tag';
import ModalChangeType from '../../../../components/screens/WordsScreen/ModalChangeType';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../../graphql/mutation';
import {isEmptyObject} from '../../../../utils/isEmptyObject';

interface ICache {
  [id: string]: IWord;
}
const {width} = Dimensions.get('window');
const WordsScreen = ({route, navigation}: WordsScreenProps) => {
  const [mutationUpdate, {loading: loadingUpdate}] = useMutation(
    MUTATION.updateWordsByEntity,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [words, setWords] = useState(route.params.entity.words);
  const cache = useRef({} as ICache);
  const [deletedWords, setDeletedWords] = useState(
    route.params.entity.disconnectWords,
  );

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
  };

  const handleAddTranslate = (idWord: number, data: ITranslate) => {
    const findIndex = words.findIndex((w) => w.id === idWord);
    const index = words[findIndex].translate.findIndex((t) => t.id === data.id);
    if (index === -1) {
      words[findIndex].translate.push(data);
      setWords([...words]);
    }
  };

  const handleDeleteWord = (id: number) => {
    setDeletedWords((words) => {
      return [...words, {id: id}];
    });
  };
  const filterWords = words.filter(
    (w) => !deletedWords.some((d) => d.id === w.id),
  );

  const actions = [
    {
      icon: 'plus',
      label: 'Add word',
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
      icon: 'content-save',
      label: 'Save',
      onPress: handleUpdateWord,
    });
  }
  return (
    <View style={styles.con}>
      <FlatList
        scrollEnabled={!isSwiping}
        data={filterWords}
        renderItem={(info) => {
          return (
            <WordItem
              word={info.item}
              onDeleteWord={handleDeleteWord}
              changeWord={changeWord}
              changeTranslate={changeTranslate}
              onDeleteTranslate={handleDeleteTranslate}
              onAddTranslate={handleAddTranslate}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB.Group
        style={styles.btn}
        open={isOpen}
        icon={loadingUpdate ? 'loading' : 'plus'}
        actions={actions}
        onStateChange={({open}) => setIsOpen(open)}
      />
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
}
const WordItem = ({
  word,
  onDeleteWord,
  changeWord,
  changeTranslate,
  onDeleteTranslate,
  onAddTranslate,
}: IWordsItem) => {
  const colors = getPalletColorsForType(word.type);
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

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
      useNativeAnimations={false}
      onSwipeableRightOpen={() => onDeleteWord(word.id)}>
      <View style={[styles.wordItem]}>
        <View style={styles.viewTopWord}>
          <Tag type={word.type} onPress={() => setVisible2(true)} />
          <Text style={[styles.textEn, {color: colors.dark}]}>{word.en}</Text>
          <IconButton icon="plus" onPress={() => setVisible(true)}></IconButton>
          <Portal>
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
          </Portal>
        </View>
        <View style={styles.conRu}>
          {filterTranslate.map((t, index) => {
            return (
              <TranslateItem
                key={t.id}
                translate={t}
                backgroundColor={index % 2 === 0 ? colors.medium : 'white'}
                changeTranslate={onChangeTranslate}
                onDeleteTranslate={handleDeleteTranslate}
                canDelete={filterTranslate.length > 1}
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
  backgroundColor?: string | undefined;
  changeTranslate: (id: number, value: string) => any;
  onDeleteTranslate: (id: number) => any;
  canDelete: boolean;
}

const TranslateItem = ({
  backgroundColor,
  translate,
  changeTranslate,
  onDeleteTranslate,
  canDelete,
}: ITranslateItemProps) => {
  const renderRightActions = (progress, dragX) => {
    return (
      <Animated.View style={[styles.btnRight]}>
        <Button icon="delete" onPress={() => onDeleteTranslate(translate.id)} />
      </Animated.View>
    );
  };
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(translate.ru);

  const handleBlur = () => {
    setIsEdit(false);
    changeTranslate(translate.id, value);
  };

  return (
    <SwipeableNative
      renderRightActions={canDelete ? renderRightActions : undefined}
      rightThreshold={canDelete ? 50 : 0}
      overshootRight={false}>
      {isEdit ? (
        <TextInput
          style={[styles.textRuEdit, {borderColor: backgroundColor}]}
          onBlur={handleBlur}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
      ) : (
        <Text
          onPress={() => setIsEdit(true)}
          style={[
            styles.textRu,
            {
              backgroundColor,
            },
          ]}>
          {value}
        </Text>
      )}
    </SwipeableNative>
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
    backgroundColor: 'white',
    margin: 8,
    marginBottom: 0,
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
