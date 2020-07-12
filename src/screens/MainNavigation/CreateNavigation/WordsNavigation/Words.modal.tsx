import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FAB, IconButton, Portal, TextInput} from 'react-native-paper';
import {PartOfSpeech} from '../../../../typings/PartOfSpeech';
import Tag from '../../../../components/common/Tag';
import ModalChangeType from '../../../../components/screens/WordsScreen/ModalChangeType';
import {WordsModalProps} from '../../../../typings/INavigationProps';
import {IWord} from '../../../../typings/IEntity';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../../graphql/mutation';

const WordsModal = ({navigation, route}: WordsModalProps) => {
  const [mutationTranslateWord] = useMutation(MUTATION.TRANSLATE_WORD);
  const [mutationCreateWord, {loading}] = useMutation(
    MUTATION.createOrUpdateWordWithTranslate,
  );
  const [en, setEn] = useState('');
  const [type, setType] = useState(PartOfSpeech.NOUN);
  const [visible, setVisible] = useState(false);
  const {control, handleSubmit, getValues} = useForm({});
  const {fields, append, prepend, remove} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'ru', // unique name for your Field Array,
    // keyName: "id", default to "id", you can change the key name
  });

  const changeType = (id: number, t: PartOfSpeech) => {
    setType(t);
  };

  const onSubmit = async (data: any) => {
    const res = await mutationCreateWord({
      variables: {
        entityId: route.params.entityId,
        type,
        en,
        translate: data.ru.filter((r) => !!r),
      },
    });
    const word: IWord = res.data.createOrUpdateWordWithTranslate;
    route.params.setWords((words) => {
      return [word, ...words];
    });
    navigation.goBack();
  };
  useEffect(() => {
    append({ru: ''});
  }, []);

  const handleTranslate = async () => {
    if (en === '') return;
    const res = await mutationTranslateWord({
      variables: {
        word: en,
        entity: route.params.entity,
      },
    });

    if (res.data === null) return;
    const translateWord: any = res.data.translateWord;
    setType(translateWord.type);
    const items = getValues().ru;
    const data = translateWord.translate
      .filter((t) => !items.some((item) => item === t.ru))
      .map((t) => ({
        ru: t.ru,
      }));
    prepend(data);
  };
  const handleBlur = (index: number) => {
    const items = getValues().ru;
    const value = items[index];
    if (items.length > 1) {
      if (value) {
        if (index === items.length - 1) {
          append({ru: ''});
        }
      } else {
        if (index !== items.length - 1) {
          remove(index);
        }
      }
    } else {
      if (value) {
        append({ru: ''});
      }
    }
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.all}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.con}>
          <View style={styles.search}>
            <TextInput
              style={styles.textInput}
              value={en}
              onChangeText={(text) => setEn(text)}
            />
            <IconButton icon="search-web" size={40} onPress={handleTranslate} />
          </View>
          <Tag
            type={type}
            onPress={() => setVisible(true)}
            styleText={styles.tagText}
          />
          <Portal>
            <ModalChangeType
              visible={visible}
              onDismiss={() => setVisible(false)}
              wordId={1}
              onSubmit={changeType}
              value={type}
            />
          </Portal>
          {fields.map((filed, index) => {
            return (
              <View key={filed.id} style={styles.rowRu}>
                <Controller
                  control={control}
                  name={`ru[${index}]`}
                  defaultValue={filed.ru}
                  render={({onChange, value}) => (
                    <TextInput
                      style={styles.textInput}
                      onBlur={() => handleBlur(index)}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                />
                {index !== fields.length - 1 && (
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleRemove(index)}
                  />
                )}
              </View>
            );
          })}
          <FAB
            style={styles.btn}
            icon="plus"
            loading={loading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  all: {
    flex: 1,
  },
  con: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
  },
  search: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  textInput: {
    flex: 1,
  },
  tagText: {
    fontSize: 22,
  },
  btn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  rowRu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WordsModal;
