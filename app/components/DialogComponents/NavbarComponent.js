import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { remote } from 'electron';
import fs from 'fs';
import xml2js from 'xml2js';
import styles from './Dialog.css';
import * as BuilderActions from '../../actions/builder';

type Props = {
  selectedLang: string,
  langList: Array,
  onLanguageSelect: () => {},
  onFileSelected: () => {},
  clearData: () => {},
  builder: {}
};

class NavbarComponent extends Component<Props> {
  props: Props;

  handleNewFile = () => {
    const { clearData } = this.props;
    clearData();
  }

  handleOpenFile = () => {
    remote.dialog.showOpenDialog({ properties: [ 'openFile']}, (path) => {
      const { onFileSelected } = this.props;
      onFileSelected(path[0]);
    });
  }

  handleExportFile = () => {
    const {builder: { data: { dialogs } }} = this.props;
    const dialogue = dialogs.map((dialog) => {
      const phrases = dialog.phrases.map((phrase, index) => {
        const langs = phrase.langs.map(lang => ({
          $: {
            id: lang.id
          },
          _: lang.message
        }))

        return {
          $: {
            id: `${(index+1)}`
          },
          lang: langs
        }
      });

      return {
        $: {
          name: dialog.name
        },
        phrase: phrases
      }
    });

    const data = {
      data: {
        dialogue
      }
    };

    const builder = new xml2js.Builder({cdata:true});
    const xml = builder.buildObject(data);

    remote.dialog.showSaveDialog({
      filters : [{
        name: 'XML File (*.xml)',
        extensions: ['xml']
      }]
    }, (file) => {
      fs.writeFile(file, xml, (err) => {
        if (err) throw err;
      });
    });

  }

  render() {
    const {
      selectedLang,
      langList,
      onLanguageSelect
    } = this.props;

    return (
      <div className={styles.Navbar}>
        <select value={selectedLang} onChange={onLanguageSelect}>
          {langList.map(lang => <option key={lang} value={lang}>{lang}</option>)}
        </select>
        <button
          type='button'
          onClick={this.handleNewFile}
        >
          New File
        </button>
        <button
          type='button'
          onClick={this.handleOpenFile}
        >
          Open File
        </button>
        <button
          type='button'
          onClick={this.handleExportFile}
        >
          Export File
        </button>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    builder: state.builder
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BuilderActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent);
