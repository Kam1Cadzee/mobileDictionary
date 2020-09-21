import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../controls/Button';
import {useTheme} from '../../context/ThemeContext';
import {getStyleFont} from '../../utils/getStyleFont';

interface ICustomModalProps {
  visible: boolean;
  onDismiss: any;
  children: any;
  title: string;
  textCancel?: string | null;
  textOK?: string | null;
  onSubmit: () => any;
  loading?: boolean;
}
const CustomModal = React.memo(
  ({
    onDismiss,
    visible,
    children,
    onSubmit,
    textCancel = 'Cancel',
    textOK = 'Ok',
    title,
    loading = false,
  }: ICustomModalProps) => {
    const {backgroundColorWithText} = useTheme();
    const colors = backgroundColorWithText();
    return (
      <Modal isVisible={visible} onDismiss={onDismiss}>
        <View
          style={[
            styles.con,
            {
              backgroundColor: colors.backgroundColor.toString(),
            },
          ]}>
          <View style={styles.header}>
            <Text style={[styles.title, {color: colors.color}]}>{title}</Text>
          </View>
          <View style={styles.content}>{children}</View>
          <View style={styles.footer}>
            {textCancel && (
              <Button
                color={'primary'}
                ration={0.22}
                style={styles.btn}
                size={'low'}
                onPress={onDismiss}>
                {textCancel}
              </Button>
            )}
            {textOK && (
              <Button
                color={'primary'}
                ration={0.22}
                onPress={onSubmit}
                style={styles.btn}
                size={'low'}>
                {textOK}
              </Button>
            )}
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  con: {
    margin: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  header: {
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  title: {
    ...getStyleFont('600-SemiBold'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 16,
  },
  btn: {
    paddingHorizontal: 32,
    marginHorizontal: 8,
  },
});

export default CustomModal;
