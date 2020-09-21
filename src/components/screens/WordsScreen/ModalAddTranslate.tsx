import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ITranslate} from '../../../typings/IEntity';
import CustomModal from '../../common/CustomModal';
import {useMutation} from '@apollo/react-hooks';
import {MUTATION} from '../../../graphql/mutation';
import InputText from '../../controls/InputText';

interface IModalAddTranslateProps {
  visible: boolean;
  onDismiss: any;
  wordId: number;
  onSubmit: (idWord: number, data: ITranslate) => any;
}
const ModalAddTranslate = ({
  onDismiss,
  visible,
  onSubmit,
  wordId,
}: IModalAddTranslateProps) => {
  const [mutationAdd, {loading}] = useMutation(MUTATION.upsertTranslate);
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (text === '') {
      return;
    }
    const res = await mutationAdd({
      variables: {
        idWord: wordId,
        ru: text,
      },
    });
    const data: ITranslate = res.data.upsertTranslate;
    onSubmit(wordId, data);
    onDismiss();
    setText('');
  };

  return (
    <CustomModal
      visible={visible}
      onDismiss={onDismiss}
      title={'Add new translate'}
      loading={loading}
      onSubmit={handleSubmit}>
      <View style={styles.content}>
        <InputText
          size={'high'}
          label="Translate"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  content: {},
});
export default ModalAddTranslate;
