import uuid from 'uuid/v4';
import type { Action } from './types';
import {
  LANGUAGE_SELECTED,
  FILE_OPENED,
  TEXT_EDITED,
  TEXT_ADDED,
  TEXT_DELETED
} from '../actions/builder'

const defaultState = {
  data: {
    dialogs: [{
      name: 'begin_q11',
      phrases: [{
        id: uuid(),
        langs: [{
          id: 'en',
          message:`Cícera, I'm glad you've stopped by! I need your help.`,
        }, {
          id: 'pt',
          message:`Menina Cícera! Que bom que você passou por aqui. Eu preciso de ajuda.`,
        }],
      }, {
        id: uuid(),
        langs: [{
          id: 'pt',
          message: 'Qual o problema, Almira? Está tudo bem com o pequeno Miro?',
        }]
      }, {
        id: uuid(),
        langs: [{
          id: 'pt',
          message: 'Qual o problema, Almira? Está tudo bem com o pequeno Miro?',
        }]
      }, {
        id: uuid(),
        langs: [{
          id: 'pt',
          message: 'Qual o problema, Almira? Está tudo bem com o pequeno Miro?',
        }]
      }, {
        id: uuid(),
        langs: [{
          id: 'pt',
          message: 'Qual o problema, Almira? Está tudo bem com o pequeno Miro?',
        }]
      }],
    }, {
      name: 'middle_q11',
      phrases: [{
        id: uuid(),
        langs: [{
          id: 'pt',
          message: '<color=#FFD08A>Mandacaru</color> não falta por aqui. Esteja com o facão afiado.',
        }]
      }]
    }],
  },
  langs: ['en', 'pt'],
  selectedLang: 'pt',
}

const deleteText = (state, action) => {
  const {data:{dialogs}} = state;
  const alteredDialogs = dialogs.map((dialog) => {
    if(dialog.name === action.dName) {
      const phrases = dialog.phrases.filter((phrase, i) => i !== action.pIndex);
      return {
        name: dialog.name,
        phrases
      }
    }
    return dialog;
  });
  return {
    ...state,
    data: {
      dialogs: [...alteredDialogs]
    }
  }
}

const addText = (state, action) => {
  const {data:{dialogs}, langs} = state;

  const alteredDialogs = dialogs.map((dialog) => {
    if(dialog.name === action.dName) {
      const {phrases} = dialog;

      const l = langs.map(lang => ({id: lang, message: ''}));
      const newPhrase = {id: uuid(), langs: l};

      phrases.push(newPhrase);
      return {
        name: dialog.name,
        phrases
      };
    }
    return dialog;
  });

  return {
    ...state,
    data: {
      dialogs: [...alteredDialogs]
    }
  }
}

const updateText = (state, action) => {
  const {data:{dialogs}} = state;

  const alteredDialogs = dialogs.map((dialog) => {
    if(dialog.name === action.dName) {
      const phrases = dialog.phrases.map((phrase, index) => {
        if(index === action.pIndex) {
          const {langs, id} = phrase;
          let found = false;
          const modLangs = langs.map((lang) => {
            if(lang.id === action.lang.id) {
              found = true;
              return {
                id: lang.id,
                message: action.lang.message
              }
            }
            return lang;
          });
          if(!found) modLangs.push(action.lang);
          return {
            id,
            langs: modLangs
          }
        }
        return phrase;
      });
      return {
        name: dialog.name,
        phrases
      }
    }
    return dialog;
  });

  return {
    ...state,
    data: {
      dialogs: [...alteredDialogs]
    }
  }
}

export default function builder(state = defaultState, action: Action) {
  switch (action.type) {
    case TEXT_DELETED:
      return deleteText(state, action);
    case TEXT_ADDED:
      return addText(state, action);
    case TEXT_EDITED:
      return updateText(state, action);
    case FILE_OPENED:
      return {
        ...state,
        data: {
          dialogs: action.dialogs
        }
      }
    case LANGUAGE_SELECTED:
      return { ...state, selectedLang: action.value};
    default:
      return state;
  }
}
