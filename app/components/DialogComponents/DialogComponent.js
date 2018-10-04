import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as BuilderActions from '../../actions/builder';
import PhraseComponent from './PhraseComponent';
import styles from './Dialog.css';

type Props = {
  selectedLang: string,
  phrases: array,
  langs: array,
  name: string,
  addPhrase: () => {}
};

class DialogComponent extends Component<Props> {
  handleAddPhrase = () => {
    const {name, addPhrase} = this.props;

    addPhrase(name);
  }

  render() {
    const {langs, phrases, name, selectedLang} = this.props;
    const renderPhrases = phrases.map((phrase, index) => <PhraseComponent
        key={phrase.id}
        index={index}
        dialogName={name}
        langs={phrase.langs}
        selectedLang={selectedLang}
        langOpts={langs}
        />);

    return (
      <div className={styles.Dialog}>
        <span >{name}</span>
        <button type='button' onClick={this.handleAddPhrase}>
          AddPhrase
        </button>
        <div className={styles.PhrasesWrapper}>
          {renderPhrases}
        </div>
      </div>
    );
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
)(DialogComponent);
