import React, { Component } from 'react';
import DataComponent from './DialogComponents/DataComponent';
import NavbarComponent from './DialogComponents/NavbarComponent';
import HOC from '../hoc/HOC';

type Props = {
  builder: any,
  languageSelect: () => {},
  openFile: () => {}
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const { builder: {
      data: {dialogs}},
      builder: {langs},
      builder: {selectedLang},
      languageSelect,
      openFile
    } = this.props;
    return(
      <HOC>
        <NavbarComponent
          selectedLang={selectedLang}
          langList={langs}
          onLanguageSelect={languageSelect}
          onFileSelected={openFile}
        />
        <DataComponent
          dialogs={dialogs}
          langs={langs}
          selectedLang={selectedLang}
        />
      </HOC>
    );
  }
}
