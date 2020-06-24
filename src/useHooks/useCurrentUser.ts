import {useQuery} from '@apollo/react-hooks';
import QUERIES from '../graphql/queries';
import {IUser, UserRole} from '../typings/IUser';

export const useCurrentUser = () => {
  const {data} = useQuery(QUERIES.CURRENT_USER);
  let user: IUser | null = null;
  let isAdmin = false;
  if (data && data.currentUser) {
    user = data.currentUser;
    isAdmin = user!.role === UserRole.ADMIN;
  }
  return {user, isAdmin};
};
