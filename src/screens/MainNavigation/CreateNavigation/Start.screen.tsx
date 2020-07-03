import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB, Searchbar} from 'react-native-paper';
import {MUTATION} from '../../../graphql/mutation';
import {useMutation} from '@apollo/react-hooks';

interface IStartScreenProps {
  setEntity: any;
}
const StartScreen = ({setEntity}: IStartScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('impress');
  const [mutationGetEntities] = useMutation(MUTATION.GET_ENTITIES_BY_WORD);

  const handleSubmit = async () => {
    const res = await mutationGetEntities({
      variables: {
        word: searchQuery.toLowerCase(),
      },
    });
    if (res.data) {
      setEntity(res.data.getEntitiesByWord[0]);
    }
  };

  return (
    <View style={styles.con}>
      <Searchbar
        placeholder="Search"
        onChangeText={(q) => setSearchQuery(q)}
        value={searchQuery}
        onIconPress={handleSubmit}
      />
      <View style={styles.con}>
        <FAB style={styles.fab} icon="search-web" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default StartScreen;
