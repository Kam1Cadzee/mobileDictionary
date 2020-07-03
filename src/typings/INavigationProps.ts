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
  };
  Phrases: undefined;
  Sentences: undefined;
};

export type WordsScreenProps = MaterialBottomTabScreenProps<
  CreateNavigationParamList,
  'Words'
>;
export type PhrasesScreenProps = MaterialBottomTabScreenProps<
  CreateNavigationParamList,
  'Phrases'
>;
export type SentencesScreenProps = MaterialBottomTabScreenProps<
  CreateNavigationParamList,
  'Sentences'
>;
