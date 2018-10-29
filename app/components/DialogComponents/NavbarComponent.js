import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { remote } from 'electron';
import fs from 'fs';
import convert from 'xml-js'
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

  dialogsToXMLJson = (dialogs) => {
    console.log(dialogs);
    const dialogues = dialogs.map((d) => {
      const phrases = d.phrases.map((p, i) => {
        const pt = p.langs.filter(l => l.id === 'pt')[0];
        const en = p.langs.filter(l => l.id === 'en')[0];
        return {
          type: 'element',
          name: 'phrase',
          attributes: {
            id: `${(i+1)}`
          },
          elements: [
            {
              type: 'element',
              name: 'lang',
              attributes: {
                id: 'pt'
              },
              elements: [
                {
                  type: 'cdata',
                  cdata: pt.message
                }
              ]
            },
            {
              type: 'element',
              name: 'lang',
              attributes: {
                id: 'en'
              },
              elements: [
                {
                  type: 'cdata',
                  cdata: en.message
                }
              ]
            }
          ]
        }
      });
      return {
        type: 'element',
        name: 'dialogue',
        attributes: {
          name: d.name
        },
        elements: [
          ...phrases
        ]
      }
    })
    const data = {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'UTF-8',
          standalone: 'yes'
        }
      },
      elements:[
        {
        type: 'element',
        name: 'data',
        elements: [
          ...dialogues
        ]
      }]
    };
    return data;
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
        }));

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

    const options = {
      spaces: 2,
      fullTagEmptyElement: true,

    }
    const xml2 = convert.json2xml(this.dialogsToXMLJson(dialogs), options);

    remote.dialog.showSaveDialog({
      filters : [{
        name: 'XML File (*.xml)',
        extensions: ['xml']
      }]
    }, (file) => {
      fs.writeFile(file, xml2, (err) => {
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
          Novo
        </button>
        <button
          type='button'
          onClick={this.handleOpenFile}
        >
          Abrir
        </button>
        <button
          type='button'
          onClick={this.handleExportFile}
        >
          Exportar
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
