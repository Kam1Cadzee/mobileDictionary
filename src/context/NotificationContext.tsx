import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useApolloClient} from '@apollo/react-hooks';
import QUERIES from '../graphql/queries';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {useTheme} from './ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

interface INotification {
  text: string;
  type: 'error' | 'success' | 'info';
  time: number;
}
interface INotificationContext {
  notification: (data: INotification) => void;
}
const NotificationContext = React.createContext({
  notification: (data) => {},
} as INotificationContext);

const useNotification = () => {
  const context = useContext(NotificationContext);
  return context.notification;
};

const ProviderNotification = ({children}: any) => {
  const [data, setData] = useState(null as INotification | null);
  const idRef = useRef(null as any | null);
  const anim = useRef(new Animated.Value(0)).current;
  const {secondaryWithText} = useTheme();
  const colors = secondaryWithText(0.5);

  useEffect(() => {
    if (data) {
      if (idRef.current) {
        clearTimeout(idRef.current!);
        idRef.current = setTimeout(() => {
          handleTouch();
        }, data.time * 1000);
      } else {
        Animated.timing(anim, {
          toValue: -130,
          useNativeDriver: true,
          duration: 200,
        }).start(() => {
          idRef.current = setTimeout(() => {
            handleTouch();
          }, data.time * 1000);
        });
      }
    } else {
    }
  }, [data]);

  const handleTouch = () => {
    clearTimeout(idRef.current!);
    Animated.timing(anim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start(() => {
      setData(null);
      idRef.current = null;
    });
  };

  const notification = useCallback((n: INotification) => {
    setData(n);
  }, []);
  const client = useApolloClient();

  useEffect(() => {
    client
      .watchQuery({
        query: QUERIES.CURRENT_ERROR,
        fetchPolicy: 'cache-only',
      })
      .subscribe({
        next(value: any): void {
          console.log(value);
          client.writeQuery({
            query: QUERIES.CURRENT_ERROR,
            data: {
              notification: null,
            },
          });
          if (value.data.notification) {
            setData(value.data.notification);
          }
        },
      });
  }, [client]);

  return (
    <NotificationContext.Provider value={{notification}}>
      {children}
      {data && (
        <Animated.View
          onTouchStart={handleTouch}
          style={[
            styles.con,
            {
              backgroundColor: colors.backgroundColor.toString(),
              transform: [
                {
                  translateY: anim,
                },
              ],
            },
          ]}>
          <Icon
            name={getIcon(data.type)}
            size={30}
            color={colors.color.toString()}
          />
          <Text
            style={{
              color: colors.color.toString(),
              textAlign: 'center',
              flex: 1,
            }}>
            {data.text}
          </Text>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
};

const getIcon = (type: string) => {
  switch (type) {
    case 'info':
      return 'ios-information-circle-outline';
    case 'error':
      return 'ios-warning';
    default:
      return 'ios-star-outline';
  }
};
//ios-information-circle-outline ios-warning
const styles = StyleSheet.create({
  con: {
    position: 'absolute',
    bottom: -100,
    borderRadius: 5,
    left: 10,
    right: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export {useNotification};
export default ProviderNotification;
