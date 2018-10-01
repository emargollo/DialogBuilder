import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import LangComponent from './LangComponent';
import styles from './Dialog.css';
import * as BuilderActions from '../../actions/builder';

type Props = {
  selectedLang: string,
  langs: array,
  index: number,
  dialogName: string,
  editText: () => {}
};

class PhraseComponent extends Component<Props> {

  state = {
    edit: false
  }

  handleEditToggle = () => {
    this.setState(prevState => ({ edit: !prevState.edit }));
  }

  handleLangEdit = (event) => {
    console.log(this.props)
    const { selectedLang, index, dialogName, editText} = this.props;
    const message = event.target.value;
    const lang = {
      id: selectedLang,
      message
    };
    editText(lang, index, dialogName);
  }

  render() {
    const {selectedLang, langs} = this.props;
    const {edit} = this.state;
    const currentLang = langs.filter(lang =>
      lang.id === selectedLang)[0]
      || {id: selectedLang, message: ''};

    return (
      <div className={styles.Phrase}>
        <div>
          <button
            onClick={this.handleEditToggle}
            type='button'
          >
            Edit
          </button>
        </div>
        <LangComponent
          message={currentLang.message}
          edit={edit}
          onEdit={this.handleLangEdit}
        />
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
)(PhraseComponent);
