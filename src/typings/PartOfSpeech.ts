export enum PartOfSpeech {
  ADJ = 'ADJ',
  ADV = 'ADV',
  CONJ = 'CONJ',
  DET = 'DET',
  MODAL = 'MODAL',
  NOUN = 'NOUN',
  PREP = 'PREP',
  PRON = 'PRON',
  VERB = 'VERB',
  OTHER = 'OTHER',
}

export interface IPartOfSpeech {
  id: number;
  type: PartOfSpeech;
  ru: string;
  ua: string;
  en: string;
}
