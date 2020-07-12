import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomModal from '../../common/CustomModal';
import {PartOfSpeech} from '../../../typings/PartOfSpeech';
import {usePartOfSpeech} from '../../../useHooks/usePartOfSpeech';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Tag from '../../common/Tag';

interface IModalAddTranslateProps {
  visible: boolean;
  onDismiss: any;
  wordId: number;
  onSubmit: (idWord: number, type: PartOfSpeech) => any;
  value: PartOfSpeech;
}
const ModalChangeType = ({
  onDismiss,
  visible,
  onSubmit,
  wordId,
  value,
}: IModalAddTranslateProps) => {
  const types = usePartOfSpeech();
  const [type, setType] = useState(value);
  const handleSubmit = async () => {
    onSubmit(wordId, type);
    onDismiss();
  };
  return (
    <CustomModal
      visible={visible}
      onDismiss={onDismiss}
      textCancel={null}
      title={'Change part of speech'}
      loading={false}
      onSubmit={handleSubmit}>
      <View style={styles.content}>
        {types.map((t) => {
          return (
            <Tag
              type={t.type}
              style={t.type === type ? styles.typeActive : styles.type}
              styleText={styles.typeText}
              onPress={() => setType(t.type)}
            />
          );
        })}
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  content: {},
  type: {
    borderRadius: 0,
    margin: 4,
  },
  typeActive: {
    borderRadius: 0,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  typeText: {
    fontSize: 18,
    padding: 4,
  },
});
export default ModalChangeType;
