import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PhrasesModalProps} from '../../../../typings/INavigationProps';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../../graphql/mutation';
import {IPhrase} from '../../../../typings/IEntity';
import {useNotification} from '../../../../context/NotificationContext';
import InputText from '../../../../components/controls/InputText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import {useTheme} from '../../../../context/ThemeContext';
import DismissKeyboard from '../../../../components/common/DismissKeyboard';

const PhrasesModal = ({route, navigation}: PhrasesModalProps) => {
  const {entityId, entity, setPhrases} = route.params;
  const [mutationTranslate, {loading: loadingTranslate, called}] = useMutation(
    MUTATION.translatePhrase,
  );
  const notif = useNotification();
  const [mutationAddPhrase, {loading}] = useMutation(MUTATION.upsertPhrase);
  const [en, setEn] = useState('');
  const [ru, setRU] = useState('');
  const {backgroundColor, accent, primaryWithText} = useTheme();

  const handleTranslate = async () => {
    if (en === '') {
      notif({
        text: 'Please enter for phrase input',
        time: 2,
        type: 'info',
      });
      return;
    }
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
    if (en === '') {
      notif({
        text: 'Please enter for phrase input',
        time: 2,
        type: 'info',
      });
    } else if (ru === '') {
      notif({
        text: 'Please enter for translation input',
        time: 2,
        type: 'info',
      });
    } else {
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
    }
  };

  const colorsBtn = primaryWithText(0.2);
  const bgInputText = accent(0.5).fade(0.8);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <DismissKeyboard>
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
              isBorder
              value={en}
              onChangeText={(text) => setEn(text)}
              style={{
                flex: 1,
              }}
              backgroundColor={bgInputText}
              afterIcon={(props) => (
                <Ionicons
                  name="ios-search"
                  onPress={handleTranslate}
                  {...props}
                />
              )}
            />
          </View>
          <InputText
            value={ru}
            onChangeText={(text) => setRU(text)}
            backgroundColor={bgInputText}
            size={'high'}
          />
          <ActionButton
            size={60}
            buttonColor={colorsBtn.backgroundColor.toString()}
            hideShadow={true}
            fixNativeFeedbackRadius={true}
            renderToHardwareTextureAndroid={false}
            onPress={called ? handleSubmit : handleTranslate}
            renderIcon={(active) => (
              <Ionicons
                name={called ? 'ios-add' : 'ios-search'}
                size={30}
                color={colorsBtn.color.toString()}
              />
            )}
          />
        </View>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
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
