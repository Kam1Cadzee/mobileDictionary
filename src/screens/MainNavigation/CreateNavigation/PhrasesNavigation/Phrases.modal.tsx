import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PhrasesModalProps} from '../../../../typings/INavigationProps';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../../graphql/mutation';
import {FAB, IconButton, TextInput} from 'react-native-paper';
import {IPhrase} from '../../../../typings/IEntity';

const PhrasesModal = ({route, navigation}: PhrasesModalProps) => {
  const {entityId, entity, setPhrases} = route.params;
  const [mutationTranslate, {loading: loadingTranslate, called}] = useMutation(
    MUTATION.translatePhrase,
  );
  const [mutationAddPhrase, {loading}] = useMutation(MUTATION.upsertPhrase);
  const [en, setEn] = useState('');
  const [ru, setRU] = useState('');

  const handleTranslate = async () => {
    if (en === '') return;
    const res = await mutationTranslate({
      variables: {
        phrase: en,
        entity,
      },
    });
    if (res.data === null) return;
    const phrase: IPhrase = res.data.translatePhrase;
    setRU(phrase.ru);
  };

  const handleSubmit = async () => {
    const res = await mutationAddPhrase({
      variables: {
        phrase: en,
        ru,
        entityId,
      },
    });
    const phrase: IPhrase = res.data.upsertPhrase;
    setPhrases((phrases) => {
      return [phrase, ...phrases];
    });
    navigation.goBack();
  };

  return (
    <View style={styles.con}>
      <View style={styles.search}>
        <TextInput
          style={styles.textInput}
          value={en}
          onChangeText={(text) => setEn(text)}
        />
        <IconButton icon="search-web" size={40} onPress={handleTranslate} />
      </View>
      <TextInput value={ru} onChangeText={(text) => setRU(text)} />
      <FAB
        style={styles.btn}
        icon={called ? 'plus' : 'search-web'}
        loading={loading || loadingTranslate}
        onPress={called ? handleSubmit : handleTranslate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
    margin: 8,
  },
  search: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  textInput: {
    flex: 1,
  },
  btn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
export default PhrasesModal;
