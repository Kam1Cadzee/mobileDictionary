import React from 'react';
import {StyleSheet, Text as TextRN, TextProps} from 'react-native';

type IText = TextProps & {
  children: any;
};
const Text = ({children, ...props}: IText) => {
  return <TextRN {...props}>{children}</TextRN>;
};

const style = StyleSheet.create({
  text: {},
});
export default Text;
