import fs from 'fs';
import {promisify} from 'util';
import xml2js from 'xml2js';
import uuid from 'uuid/v4';

const readFile = promisify(fs.readFile);
const parser = new xml2js.Parser();
const parseString = promisify(parser.parseString);

export const LANGUAGE_SELECTED = 'LANGUAGE_SELECTED';
export const TEXT_EDITED = 'TEXT_EDITED';
export const TEXT_ADDED = 'TEXT_ADDED';
export const DIALOG_ADDED = 'DIALOG_ADDED';
export const TEXT_DELETED = 'TEXT_DELETED';
export const FILE_OPENED = 'FILE_OPENED';
export const DIALOG_DELETED = 'DIALOG_DELETED';
export const DIALOG_NAME_EDITED = 'DIALOG_NAME_EDITED';
export const DATA_CLEARED = 'DATA_CLEARED';
export const PHRASES_REORDERED = 'PHRASES_REORDERED';

export function reorderPhrases(dId, phrases) {
  return {
    type: PHRASES_REORDERED,
    id: dId,
    phrases
  }
}

export function deleteDialog(dId) {
  return {
    type: DIALOG_DELETED,
    id: dId
  }
}

export function clearData() {
  return {
    type: DATA_CLEARED
  }
}

export function updateDialogName(name, id) {
  return {
    type: DIALOG_NAME_EDITED,
    name,
    id
  }
}

export function addDialog(selectedLang) {
  return {
    type: DIALOG_ADDED,
    payload: {
      id: uuid(),
      name:'New Dialog',
      phrases: [
        // {
        //   id: uuid(),
        //   langs:[{
        //     id: selectedLang,
        //     message: ''
        //   }]
        // }
      ]
    }
  };
}

export function deleteText(pIndex, dId) {
  return {
    type: TEXT_DELETED,
    dId,
    pIndex
  }
}

export function addPhrase(dId) {
  return {
    type: TEXT_ADDED,
    dId
  }
}

export function editText(lang, pIndex, dId) {
  return {
    type: TEXT_EDITED,
    lang,
    pIndex,
    dId
  }
}

export function openFile(filename) {
  return dispatch => {
    handleFile(filename, dispatch);
  }
}

export function languageSelect(event) {
  return {
    type: LANGUAGE_SELECTED,
    value: event.target.value
  };
}

const handleFile = async (filename, dispatch) => {
  const file = (await readFile(filename, {mergeAttrs: true, async: true})).toString('utf-8');
  const result = await parseString(file);

  const dialogs = result.data.dialogue.map((dialog) => {
    const {$:{name}, phrase} = dialog;
    const phrases = phrase.map((p) => {
      const {lang} = p;
      const langs = lang.map((l) => {
        const {$:{id}, _} = l;
        return {
          id,
          message: _
        }
      });
      return {
        id: uuid(),
        langs
      }
    });
    return {
      id: uuid(),
      name,
      phrases
    }
  });

  dispatch({
    type: FILE_OPENED,
    dialogs
  })
}
