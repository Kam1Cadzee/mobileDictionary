import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs/src/types';

type MainTabParamList = {
  Create: undefined;
  Words: undefined;
  Profile: undefined;
};

export interface CreateScreenProps
  extends MaterialBottomTabScreenProps<MainTabParamList, 'Create'> {}
export interface WordsScreenProps
  extends MaterialBottomTabScreenProps<MainTabParamList, 'Words'> {}
export interface ProfileScreenProps
  extends MaterialBottomTabScreenProps<MainTabParamList, 'Profile'> {}
