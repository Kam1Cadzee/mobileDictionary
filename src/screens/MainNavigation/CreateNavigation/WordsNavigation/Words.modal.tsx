import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Portal} from 'react-native-paper';
import {IPartOfSpeech, PartOfSpeech} from '../../../../typings/PartOfSpeech';
import Tag from '../../../../components/common/Tag';
import ModalChangeType from '../../../../components/screens/WordsScreen/ModalChangeType';
import {WordsModalProps} from '../../../../typings/INavigationProps';
import {IWord} from '../../../../typings/IEntity';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../../graphql/mutation';
import InputText from '../../../../components/controls/InputText';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../../../context/ThemeContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../../components/controls/Button';
import {useFindPartOfSpeech} from '../../../../useHooks/usePartOfSpeech';
import {useNotification} from '../../../../context/NotificationContext';

const WordsModal = ({navigation, route}: WordsModalProps) => {
  const [mutationTranslateWord] = useMutation(MUTATION.TRANSLATE_WORD);
  const [mutationCreateWord, {loading}] = useMutation(
    MUTATION.createOrUpdateWordWithTranslate,
  );
  const notif = useNotification();
  const [en, setEn] = useState('');
  const [type, setType] = useState(PartOfSpeech.NOUN);
  const [visible, setVisible] = useState(false);
  const {control, handleSubmit, getValues} = useForm({});
  const {fields, append, prepend, remove} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'ru', // unique name for your Field Array,
    // keyName: "id", default to "id", you can change the key name
  });
  const {backgroundColor, accent, primaryWithText} = useTheme();
  const findType: IPartOfSpeech | any = useFindPartOfSpeech(type);

  const changeType = (id: number, t: PartOfSpeech) => {
    setType(t);
  };

  const onSubmit = async (data: any) => {
    if (en === '') {
      notif({
        text: 'Please enter for word input',
        time: 2,
        type: 'info',
      });
    } else if (data.ru.filter((r) => !!r).length === 0) {
      notif({
        text: 'Please enter for translation input',
        time: 2,
        type: 'info',
      });
    } else {
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
    }
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

  const colorsBtn = primaryWithText(0.2);
  const bgInputText = accent(0.5).fade(0.8);
  return (
    <View
      style={[
        styles.con,
        {
          backgroundColor: backgroundColor().toString(),
        },
      ]}>
      <View style={styles.search}>
        <InputText
          label={'Word'}
          size={'high'}
          value={en}
          onChangeText={(text) => setEn(text)}
          style={{
            flex: 1,
          }}
          backgroundColor={bgInputText}
          afterIcon={(props) => (
            <Ionicons name="ios-search" onPress={handleTranslate} {...props} />
          )}
        />
      </View>
      <Button color={'accent'} ration={0.6} onPress={() => setVisible(true)}>
        {findType.en ? findType.en : findType}
      </Button>
      <ModalChangeType
        visible={visible}
        onDismiss={() => setVisible(false)}
        wordId={1}
        onSubmit={changeType}
        value={type}
      />
      <KeyboardAwareScrollView
        renderToHardwareTextureAndroid={true}
        extraScrollHeight={-76}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode={'on-drag'}
        contentInsetAdjustmentBehavior={'always'}
        viewIsInsideTabBar={false}>
        {fields.map((filed, index) => {
          return (
            <View key={filed.id} style={styles.rowRu}>
              <Controller
                control={control}
                name={`ru[${index}]`}
                defaultValue={filed.ru}
                render={({onChange, value}) => (
                  <InputText
                    label={'Translate'}
                    size={'high'}
                    onBlur={() => handleBlur(index)}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    isBorder={true}
                    backgroundColor={bgInputText}
                    afterIcon={
                      index !== fields.length - 1
                        ? (props) => (
                            <Ionicons
                              name="md-close"
                              onPress={() => handleRemove(index)}
                              {...props}
                            />
                          )
                        : undefined
                    }
                  />
                )}
              />
            </View>
          );
        })}
      </KeyboardAwareScrollView>
      <ActionButton
        size={60}
        buttonColor={colorsBtn.backgroundColor.toString()}
        hideShadow={true}
        fixNativeFeedbackRadius={true}
        renderToHardwareTextureAndroid={false}
        onPress={handleSubmit(onSubmit)}
        renderIcon={(active) => (
          <Ionicons
            name="ios-add"
            size={30}
            color={colorsBtn.color.toString()}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  all: {
    flex: 1,
  },
  con: {
    flex: 1,
    flexDirection: 'column',
  },
  styleTag: {
    textTransform: 'uppercase',
  },
  search: {
    flexDirection: 'row',
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
