import 'react-native-gesture-handler';
import React from 'react';
import {ApolloLink, from} from '@apollo/client';
import {ApolloProvider} from '@apollo/react-hooks';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from '@apollo/link-error';
import {ApolloClient, gql} from 'apollo-boost';
import {setContext} from '@apollo/link-context';
import AsyncStorage from '@react-native-community/async-storage';
import {isDevelopment} from '../../utils/env';

const linkError = onError(
  ({graphQLErrors = [], networkError, operation, forward, response}) => {
    console.log({graphQLErrors, networkError, operation, forward, response});
    if (isDevelopment) {
    } else {
    }
  },
);

const authLink = setContext(async (request) => {
  try {
    const value = await AsyncStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${value}`, // however you get your token
      },
    };
  } catch (e) {
    return {
      headers: {
        Authorization: 'Bearer ', // however you get your token
      },
    };
  }
});
const link = new HttpLink({
  uri: isDevelopment
    ? 'http://192.168.31.66:3005/graphql'
    : 'https://englishnew.herokuapp.com/graphql',
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  link: from([authLink, linkError, link]),
  connectToDevTools: true,
  defaultOptions: {
    mutate: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'ignore',
    },
  },
  resolvers: {
    Query: {
      getEntity: (_, {id}, {cache, getCacheKey}) => {
        /*const res = cache.readFragment({
          id: getCacheKey({__typename: 'Entity', id}),
          fragment: gql`
              fragment entity on Entity {
                  ${FRAGMENTS.entity}
              }
          `,
        });
        return res;*/
      },
    },
  },
});

cache.writeData({
  data: {
    isAuth: false,
    currentUser: null,
    step: 0,
  },
});

const ProviderApollo = (props: any) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ProviderApollo;
