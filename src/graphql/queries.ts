import {gql} from 'apollo-boost';
import FRAGMENTS from './fragments';

const QUERIES = {
  LOGIN: gql`
      mutation login($loginData: LoginUserInput!) {
          login(data: $loginData) {
              user {
                  ${FRAGMENTS.user}
              }
              token
          }
      }
  `,
  SIGNUP: gql`
      mutation signUp($data: UserSignUpInput!) {
          signup(data: $data) {
              user {
                  ${FRAGMENTS.user}
              }
              token
          }
      }
  `,
  CURRENT_USER: gql`
      {
          currentUser @client {
              ${FRAGMENTS.user}
          }
      }
  `,
  CURRENT_ERROR: gql`
    {
      notification @client
    }
  `,
  GET_STEP_CLIENT: gql`
    {
      step @client
    }
  `,
  REFRESH_USER: gql`
      mutation {
          refreshUser {
              ${FRAGMENTS.user}
          }
      }
  `,
  IS_AUTH: gql`
    {
      isAuth @client
    }
  `,
  USERS: gql`
      query users {
          users {
              ${FRAGMENTS.user}
          }
      }
  `,
  COUNT_ENTITY: gql`
    query countEntity {
      aggregateEntity {
        count
      }
    }
  `,
  COUNT_WORDS: gql`
    query countWords {
      aggregateWord {
        count
      }
    }
  `,
  COUNT_TRANSLATE: gql`
    query countTranslate {
      aggregateTranslate {
        count
      }
    }
  `,
  GET_ENTITIES: gql`
      query getEntities($id: Int, $skip: Int, $first: Int) {
          entities(skip: $skip, first: $first, where: {userId: {equals: $id}, isCreate: {equals: true}}, orderBy: {updatedAt: desc}) {
              ${FRAGMENTS.entity}
          }
      }
  `,
  getEntity: gql`
    query getEntity($id: Int!) {
      getEntity(id: $id) @client
    }
  `,
  words: gql`
    query words($skip: Int, $first: Int) {
      translates(skip: $skip, first: $first, orderBy: {updatedAt: desc}) {
        ru
        updatedAt
        id
      }
    }
  `,
  GET_ENTITIES_BY_WORD_CLIENT: gql`
      query getEntitiesByWord($word: String!) {
          getEntitiesByWord(word: $word) @client {
              ${FRAGMENTS.entity}
          }
      }
  `,
  GET_PART_OF_SPEECH: gql`
    query PartOfSpeech {
      partOfSpeechDescs {
        id
        type
        ru
        ua
        en
      }
    }
  `,
  GET_WORD: gql`
    query getWord($entityId: Int!) {
      entity(where: {id: $entityId}) {
        id
        words {
          id
          en
          type
          disconnectEntities {
            id
          }
          translate {
            id
            ru
            type
            disconnectWords {
              id
            }
          }
        }
      }
    }
  `,
  GET_COUNT_ENTITIES: gql`
    query getCountEntities {
      getCountEntities
    }
  `,
};

export default QUERIES;
