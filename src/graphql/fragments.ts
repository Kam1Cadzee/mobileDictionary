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
    words {
      id,
      en,
      type,
      disconnectTranslate {
        id
      }
      translate {
        ru,
        id,
        type
      },
    },
    phrases {
      id,
      phrase,
      ru
    },
    sentences {
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
