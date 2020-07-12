import React, {useCallback, useEffect, useState} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCurrentUser} from '../../useHooks/useCurrentUser';
import {useQuery} from '@apollo/react-hooks';
import QUERIES from '../../graphql/queries';
import {IEntity} from '../../typings/IEntity';
import EntityItem from '../../components/screens/DictionaryScreen/EntityItem';

const DictionaryScreen = () => {
  const perPage = 6;
  const [loadMore, setLoadMore] = useState(true);
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
      console.log(data1);
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

  //const entities: IEntity[] = data ? data.entities : [];
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

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        onScroll={handleEventScroll}
        scrollEnabled={!loading}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={(props) => <EntityItem key={props.index} {...props} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 22,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default DictionaryScreen;
