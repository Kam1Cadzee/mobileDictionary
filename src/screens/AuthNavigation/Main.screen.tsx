import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme, Button, Paragraph, Title} from 'react-native-paper';
import {MainScreenProps} from '../../typings/authTypings';
import Award from '../../assets/images/book.svg';

const MainScreen = (props: MainScreenProps) => {
  const theme = useTheme();
  const {colors} = theme;
  return (
    <View style={[{backgroundColor: colors.primary}, styles.container]}>
      <View style={styles.top}>
        <Award width={'100%'} height={150} />
      </View>
      <View style={styles.bottom}>
        <Button
          theme={theme}
          style={[styles.btn]}
          onPress={() => props.navigation.push('SignIn')}>
          Sign in
        </Button>
        <Paragraph style={{color: 'white'}}>
          Don't have an account
          <Title> Sign up</Title>
        </Paragraph>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
  },
  top: {
    flex: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  btn: {
    backgroundColor: 'white',
    width: '80%',
    color: 'white',
  },
});
export default MainScreen;
