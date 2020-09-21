import {gql} from 'apollo-boost';

const FRAGMENTS = {
  user: `
      name
      lastName
      email
      id
      role
  `,
  entity: `
   id,
    title,
    irrverb {
      form1EN,
      form2EN,
      form3EN,
      ru
    },
    isNeededEdit,
    isCreate,
    words(orderBy: {
      updatedAt:desc
    }) {
      id,
      en,
      type,
      disconnectTranslate {
        id
      },
    createdAt,
    updatedAt,
      translate(orderBy: {
      updatedAt: desc
    }) {
        ru,
        id,
        type
      },
    },
    phrases(orderBy: {
      updatedAt: desc
    }) {
      id,
      phrase,
      ru
    },
    sentences(orderBy: {
      updatedAt: desc
    }) {
      id, 
      sentence,
      ru
    },
    disconnectWords {
      id
    },
    disconnectPhrases {
      id
    },
    disconnectSentences {
      id
    },
    createdAt,
    updatedAt,
  `,
};

export default FRAGMENTS;
