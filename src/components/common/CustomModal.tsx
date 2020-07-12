import React from 'react';
import {Button, Modal, Portal, Title} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

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
    return (
      <Modal visible={visible} onDismiss={onDismiss}>
        <View style={styles.con}>
          <View style={styles.header}>
            <Title>{title}</Title>
          </View>
          <View style={styles.content}>{children}</View>
          <View style={styles.footer}>
            {textCancel && <Button onPress={onDismiss}>{textCancel}</Button>}
            {textOK && (
              <Button mode="contained" onPress={onSubmit} loading={loading}>
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
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    justifyContent: 'space-between',
    borderRadius: 5,
    flexDirection: 'column',
  },
  header: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 16,
  },
});

export default CustomModal;
