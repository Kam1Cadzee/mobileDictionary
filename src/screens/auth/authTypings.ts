import {StackScreenProps} from '@react-navigation/stack';

type AuthStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export interface MainScreenProps
  extends StackScreenProps<AuthStackParamList, 'Main'> {}
export interface SignInScreenProps
  extends StackScreenProps<AuthStackParamList, 'SignIn'> {}
export interface SignUpScreenProps
  extends StackScreenProps<AuthStackParamList, 'SignUp'> {}
