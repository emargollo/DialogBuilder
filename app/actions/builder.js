import fs from 'fs';
import {promisify} from 'util';
import xml2js from 'xml2js';

const readFile = promisify(fs.readFile);
const parser = new xml2js.Parser();
const parseString = promisify(parser.parseString);

export const LANGUAGE_SELECTED = 'LANGUAGE_SELECTED';
export const TEXT_EDITED = 'TEXT_EDITED';
export const FILE_OPENED = 'FILE_OPENED';

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

  const builder = new xml2js.Builder({cdata:true});

  const xml = builder.buildObject(result);
  console.log(result);

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