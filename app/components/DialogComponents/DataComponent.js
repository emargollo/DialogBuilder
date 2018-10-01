import React from 'react';
import DialogComponent from './DialogComponent';
import styles from './Dialog.css';

type Props = {
  langs: any,
  selectedLang: string,
  dialogs: Array
};

const dataComponent = (props: Props) => {
  const {langs, selectedLang, dialogs} = props;

  const dialogObjects = dialogs
    .map(dialog => <DialogComponent
      key={dialog.name}
      name={dialog.name}
      phrases={dialog.phrases}
      selectedLang={selectedLang}
      langs={langs}
      />);

  return (
    <div className={styles.Data}>
      {dialogObjects}
    </div>
  );
}

export default dataComponent;
