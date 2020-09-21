import {StackScreenProps} from '@react-navigation/stack';
import {DrawerScreenProps} from '@react-navigation/drawer/src/types';
import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs/src/types';
import {IEntity} from './IEntity';

export type AuthNavigationParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type MainScreenProps = StackScreenProps<AuthNavigationParamList, 'Main'>;
export type SignInScreenProps = StackScreenProps<
  AuthNavigationParamList,
  'SignIn'
>;
export type SignUpScreenProps = StackScreenProps<
  AuthNavigationParamList,
  'SignUp'
>;

export type MainNavigationParamList = {
  Create: undefined;
  Dictionary: undefined;
  Profile: undefined;
};

export type CreateScreenProps = DrawerScreenProps<
  MainNavigationParamList,
  'Create'
>;
export type DictionaryScreenProps = DrawerScreenProps<
  MainNavigationParamList,
  'Dictionary'
>;
export type ProfileScreenProps = DrawerScreenProps<
  MainNavigationParamList,
  'Profile'
>;

export type CreateNavigationParamList = {
  Words: {
    entity: IEntity;
    onBack: any;
  };
  Phrases: {
    entity: IEntity;
    onBack: any;
  };
  Sentences: {
    entity: IEntity;
    onBack: any;
  };
};

export type WordsNavigationProps = MaterialBottomTabScreenProps<
  CreateNavigationParamList,
  'Words'
>;
export type PhrasesNavigationProps = MaterialBottomTabScreenProps<
  CreateNavigationParamList,
  'Phrases'
>;
export type SentencesNavigationProps = MaterialBottomTabScreenProps<
  CreateNavigationParamList,
  'Sentences'
>;

export type WordsNavigationParamList = {
  WordsScreen: {
    entity: IEntity;
  };
  WordsModal: {
    setWords: any;
    entity: string;
    entityId: number;
  };
};

export type WordsScreenProps = StackScreenProps<
  WordsNavigationParamList,
  'WordsScreen'
>;
export type WordsModalProps = StackScreenProps<
  WordsNavigationParamList,
  'WordsModal'
>;

export type PhrasesNavigationParamList = {
  PhrasesScreen: {
    entity: IEntity;
  };
  PhrasesModal: {
    setPhrases: any;
    entity: string;
    entityId: number;
  };
};

export type PhrasesScreenProps = StackScreenProps<
  PhrasesNavigationParamList,
  'PhrasesScreen'
>;
export type PhrasesModalProps = StackScreenProps<
  PhrasesNavigationParamList,
  'PhrasesModal'
>;

export type SentencesNavigationParamList = {
  SentencesScreen: {
    entity: IEntity;
  };
  SentencesModal: undefined;
};

export type SentencesScreenProps = StackScreenProps<
  SentencesNavigationParamList,
  'SentencesScreen'
>;
export type SentencesModalProps = StackScreenProps<
  SentencesNavigationParamList,
  'SentencesModal'
>;
