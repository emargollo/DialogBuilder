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
export const TEXT_DELETED = 'TEXT_DELETED';
export const FILE_OPENED = 'FILE_OPENED';

export function deleteText(pIndex, dName) {
  return {
    type: TEXT_DELETED,
    dName,
    pIndex
  }
}

export function addPhrase(dName) {
  return {
    type: TEXT_ADDED,
    dName
  }
}

export function editText(lang, pIndex, dName) {
  return {
    type: TEXT_EDITED,
    lang,
    pIndex,
    dName
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
      name,
      phrases
    }
  });

  dispatch({
    type: FILE_OPENED,
    dialogs
  })
}
