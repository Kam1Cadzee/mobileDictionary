import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Keyboard, Platform} from 'react-native';

interface IKeyboardContext {
  isShow: boolean;
}
const KeyboardContext = React.createContext({
  isShow: false,
} as IKeyboardContext);

const useKeyboard = () => {
  const context = useContext(KeyboardContext);
  return context.isShow;
};

const ProviderKeyboard = ({children}: any) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', handleShow);
      Keyboard.addListener('keyboardWillHide', handleHide);
      return () => {
        Keyboard.removeListener('keyboardWillShow', handleShow);
        Keyboard.removeListener('keyboardWillHide', handleHide);
      };
    } else {
      Keyboard.addListener('keyboardDidShow', handleShow);
      Keyboard.addListener('keyboardDidHide', handleHide);
      return () => {
        Keyboard.removeListener('keyboardDidShow', handleShow);
        Keyboard.removeListener('keyboardDidHide', handleHide);
      };
    }
  }, []);

  const handleShow = () => {
    console.log('show');
    setIsShow(true);
  };
  const handleHide = () => {
    console.log('hide');
    setIsShow(false);
  };
  return (
    <KeyboardContext.Provider value={{isShow}}>
      {children}
    </KeyboardContext.Provider>
  );
};

export {useKeyboard};
export default ProviderKeyboard;
