import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomModal from '../../common/CustomModal';
import {PartOfSpeech} from '../../../typings/PartOfSpeech';
import {usePartOfSpeech} from '../../../useHooks/usePartOfSpeech';
import Tag from '../../common/Tag';
import {useTheme} from '../../../context/ThemeContext';

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
  const {textColor} = useTheme();
  const types = usePartOfSpeech();
  const [type, setType] = useState(value);
  const handleSubmit = async () => {
    onSubmit(wordId, type);
    onDismiss();
  };

  const color = textColor(0.5).toString();
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
              style={
                t.type === type
                  ? styles.typeActive
                  : [styles.type, {borderColor: color}]
              }
              styleText={[
                styles.typeText,
                t.type === type ? {} : {color: color},
              ]}
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
    marginBottom: 8,
  },
  typeActive: {
    borderRadius: 0,
    marginBottom: 8,
  },
  typeText: {
    fontSize: 18,
    padding: 4,
  },
});
export default ModalChangeType;
