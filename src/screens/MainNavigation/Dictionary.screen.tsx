import React, {useState} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCurrentUser} from '../../useHooks/useCurrentUser';
import {useQuery} from '@apollo/react-hooks';
import QUERIES from '../../graphql/queries';
import {IEntity, IWord} from '../../typings/IEntity';
import EntityItem from '../../components/screens/DictionaryScreen/EntityItem';
import {useTheme} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

type Showing = 'entity' | 'words';

const getConvertData = (entities: IEntity[], type: Showing) => {
  if (type === 'entity') {
    const OBJ = entities.reduce((previousValue, currentValue) => {
      const key = new Date(currentValue.updatedAt).toLocaleDateString();
      if (previousValue[key]) {
        previousValue[key].items.push(currentValue);
      } else {
        previousValue[key] = {
          items: [currentValue],
        };
      }
      return previousValue;
    }, {});
    const DATA = Object.keys(OBJ).map((key) => ({
      title: key,
      data: OBJ[key].items,
    }));
    return DATA;
  } else {
    const words: IWord[] = entities
      .map((e) => {
        return e.words.filter(
          (w) => !e.disconnectWords.some((d) => d.id === w.id),
        );
      })
      .flat();

    const OBJ = words.reduce((previousValue, currentValue) => {
      const key = new Date(currentValue.updatedAt).toLocaleDateString();
      if (previousValue[key]) {
        previousValue[key].items.push(currentValue);
      } else {
        previousValue[key] = {
          items: [currentValue],
        };
      }
      return previousValue;
    }, {});
    const DATA = Object.keys(OBJ).map((key) => ({
      title: key,
      data: OBJ[key].items,
    }));
    return DATA;
  }
};
const DictionaryScreen = () => {
  const perPage = 6;
  const {backgroundColor, accentWithText, textColor, secondary} = useTheme();
  const [loadMore, setLoadMore] = useState(true);
  const [type, setType] = useState('entity' as Showing);
  const [skip, setSkip] = useState(0);
  const {user} = useCurrentUser();
  const {loading} = useQuery(QUERIES.GET_ENTITIES, {
    variables: {
      id: user ? user.id : undefined,
      first: perPage,
      skip: skip * perPage,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data1) => {
      if (data1.entities.length === 0) {
        setLoadMore(false);
        return;
      }
      setEntities((w) => [...w, ...data1.entities]);
    },
  });
  const [entities, setEntities] = useState([] as IEntity[]);

  const handleLoad = ({height, y}) => {
    if (height - y <= 50) {
      setSkip((s) => {
        return s + 1;
      });
    }
  };

  const handleEventScroll = (event) => {
    if (event.nativeEvent && loadMore && !loading) {
      const {
        contentOffset: {y},
        layoutMeasurement,
        contentSize,
      } = event.nativeEvent;
      handleLoad({y, height: contentSize.height - layoutMeasurement.height});
    }
  };

  const DATA = getConvertData(entities, type);

  const bgColor = backgroundColor().toString();
  const headerColors = accentWithText(0.3);
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: 16,
        }}>
        <Icon
          size={40}
          color={
            type === 'words' ? secondary().toString() : textColor().toString()
          }
          name={'md-menu'}
          style={{paddingRight: 16}}
          onPress={() => setType('words')}
        />
        <Icon
          size={40}
          color={
            type === 'entity' ? secondary().toString() : textColor().toString()
          }
          onPress={() => setType('entity')}
          name={'ios-list'}
        />
      </View>
      <SectionList
        sections={DATA}
        onScroll={handleEventScroll}
        scrollEnabled={!loading}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={(props) => <EntityItem key={props.index} {...props} />}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              backgroundColor: headerColors.backgroundColor.toString(),
              color: headerColors.color.toString(),
              paddingLeft: 16,
              paddingVertical: 8,
              textAlignVertical: 'center',
            }}>
            {title}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DictionaryScreen;
