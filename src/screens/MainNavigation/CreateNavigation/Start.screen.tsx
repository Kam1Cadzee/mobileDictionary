import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {MUTATION} from '../../../graphql/mutation';
import {useMutation} from '@apollo/react-hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../../context/ThemeContext';
import InputText from '../../../components/controls/InputText';
import DismissKeyboard from '../../../components/common/DismissKeyboard';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IStartScreenProps {
  setEntity: any;
}
const StartScreen = ({setEntity}: IStartScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('impress');
  const [mutationGetEntities, {loading}] = useMutation(
    MUTATION.GET_ENTITIES_BY_WORD,
  );
  const {top} = useSafeAreaInsets();
  const {backgroundColor, accentWithText, primaryWithText} = useTheme();

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    const res = await mutationGetEntities({
      variables: {
        word: searchQuery.toLowerCase(),
      },
    });
    if (res.data) {
      setEntity(res.data.getEntitiesByWord[0]);
    }
  };

  const colors = accentWithText(0.4);
  const colorsBtn = primaryWithText(0.2);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={{
        backgroundColor: colors.backgroundColor.toString(),
        flex: 1,
      }}
      style={{flex: 1}}>
      <DismissKeyboard>
        <View
          style={[
            styles.con,
            {
              backgroundColor: backgroundColor().toString(),
            },
          ]}>
          <InputText
            placeholder={'Search by word'}
            placeholderTextColor={colors.color.fade(0.4).toString()}
            keyboardType={'default'}
            onChangeText={(value) => setSearchQuery(value)}
            backgroundColor={colors.backgroundColor}
            value={searchQuery}
            size={'high'}
            style={{
              paddingTop: top,
            }}
          />
          <ActionButton
            size={60}
            buttonColor={colorsBtn.backgroundColor.toString()}
            hideShadow={true}
            style={{
              opacity: loading ? 0.2 : 1,
            }}
            fixNativeFeedbackRadius={true}
            renderToHardwareTextureAndroid={false}
            onPress={handleSubmit}
            renderIcon={(active) => (
              <Ionicons
                name="md-search"
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default StartScreen;
