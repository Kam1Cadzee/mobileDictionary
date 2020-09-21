import {PartOfSpeech} from '../typings/PartOfSpeech';
import {useTheme} from '../context/ThemeContext';
import Color from 'color';

export const usePalletColorsForType = (type: PartOfSpeech) => {
  const {theme, backgroundColor} = useTheme();
  const colors = getColors(type);
  if (theme === 'dark') {
    colors.light = backgroundColor().toString();
    colors.medium = Color(colors.medium).mix(Color('black'), 0.1).toString();
    colors.dark = Color(colors.dark).mix(Color('black'), 0.1).toString();
  }
  return colors;
};

const getColors = (type: PartOfSpeech) => {
  switch (type) {
    case PartOfSpeech.MODAL:
      return {
        light: '#e6f7ff',
        medium: '#91d5ff',
        dark: '#1890ff',
      };
    case PartOfSpeech.NOUN:
      return {
        light: '#f6ffed',
        medium: '#b7eb8f',
        dark: '#52c41a',
      };
    case PartOfSpeech.PREP:
      return {
        light: '#e6fffb',
        medium: '#87e8de',
        dark: '#13c2c2',
      };
    case PartOfSpeech.PRON:
      return {
        light: '#f9f0ff',
        medium: '#d3adf7',
        dark: '#722ed1',
      };
    case PartOfSpeech.VERB:
      return {
        light: '#f0f5ff',
        medium: '#adc6ff',
        dark: '#2f54eb',
      };
    case PartOfSpeech.OTHER:
      return {
        light: '#efebe9',
        medium: '#8d6e63',
        dark: '#5d4037',
      };
    case PartOfSpeech.ADV:
      return {
        light: '#fffbe6',
        medium: '#ffe58f',
        dark: '#faad14',
      };
    case PartOfSpeech.ADJ:
      return {
        light: '#fff0f6',
        medium: '#ffadd2',
        dark: '#eb2f96',
      };
    case PartOfSpeech.CONJ:
      return {
        light: '#fcffe6',
        medium: '#eaff8f',
        dark: '#a0d911',
      };
    case PartOfSpeech.DET:
      return {
        light: '#e0f2f1',
        medium: '#26a69a',
        dark: '#00695c',
      };
  }
};
