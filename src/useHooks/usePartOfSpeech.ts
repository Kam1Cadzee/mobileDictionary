import {useQuery} from '@apollo/react-hooks';
import QUERIES from '../graphql/queries';
import {IPartOfSpeech, PartOfSpeech} from '../typings/PartOfSpeech';

export const usePartOfSpeech = () => {
  const {data} = useQuery(QUERIES.GET_PART_OF_SPEECH, {
    fetchPolicy: 'cache-first',
  });
  return (data ? data.partOfSpeechDescs : []) as IPartOfSpeech[];
};

export const useFindPartOfSpeech = (type: PartOfSpeech) => {
  const parts = usePartOfSpeech();
  const findItem = parts.find((item) => item.type === type);
  if (!findItem) {
    return type;
  }
  return findItem;
};
