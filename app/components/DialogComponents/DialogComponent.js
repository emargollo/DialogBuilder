import React from 'react';
import PhraseComponent from './PhraseComponent';
import styles from './Dialog.css';

type Props = {
  selectedLang: string,
  phrases: array,
  langs: array,
  name: string
};

const dialogComponent = (props: Props) => {
  const {langs, phrases, name, selectedLang} = props;
  const renderPhrases = phrases.map((phrase, index) => <PhraseComponent
      key={index}
      index={index}
      dialogName={name}
      langs={phrase.langs}
      selectedLang={selectedLang}
      langOpts={langs}
      />);

  return (
    <div className={styles.Dialog}>
      <span >{name}</span>
      <div className={styles.PhrasesWrapper}>
        {renderPhrases}
      </div>
    </div>
  );
}

export default dialogComponent;
