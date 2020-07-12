import React, {useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {PhrasesScreenProps} from '../../../../typings/INavigationProps';
import {IPhrase} from '../../../../typings/IEntity';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../../graphql/mutation';
import SwipeableNative from 'react-native-gesture-handler/Swipeable';
import {FAB, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEmptyObject} from '../../../../utils/isEmptyObject';
import {FlatList} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

interface ICache {
  [id: string]: IPhrase;
}

const PhrasesScreen = ({route, navigation}: PhrasesScreenProps) => {
  const entity = route.params.entity;
  const cache = useRef({} as ICache);
  const [mutationUpdate, {loading}] = useMutation(
    MUTATION.updatePhraseByEntity,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [phrases, setPhrases] = useState(entity.phrases);
  const [deletedPhrases, setDeletedPhrases] = useState(
    entity.disconnectPhrases,
  );

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
    console.log(cache.current);
    console.log(deletedPhrases);
  };
  const actions = [
    {
      icon: 'plus',
      label: 'Add phrase',
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
      icon: 'content-save',
      label: 'Save',
      onPress: handleSubmit,
    });
  }
  const filterPhrases = phrases.filter(
    (p) => !deletedPhrases.some((d) => d.id === p.id),
  );
  return (
    <View style={styles.con}>
      <FlatList
        data={filterPhrases}
        renderItem={(info) => {
          return (
            <PhraseBlock
              phrase={info.item}
              key={info.item.id}
              onChangePhrase={handleChangePhrase}
              onDeletePhrase={handleDeletedPhrase}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB.Group
        style={styles.btn}
        open={isOpen}
        icon={loading ? 'loading' : 'plus'}
        actions={actions}
        onStateChange={({open}) => setIsOpen(open)}
      />
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

  return (
    <SwipeableNative
      renderRightActions={renderRightActions}
      useNativeAnimations={false}
      onSwipeableRightOpen={() => onDeletePhrase(phrase.id)}>
      <View style={styles.phraseItem}>
        <TextInput
          value={en}
          onChangeText={(text) => setEn(text)}
          onBlur={handleChangePhrase}
        />
        <TextInput
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
    backgroundColor: 'white',
    margin: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export default PhrasesScreen;
