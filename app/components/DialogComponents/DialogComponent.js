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
  id: string,
  updateDialogName: () => {},
  deleteDialog: () => {},
  addPhrase: () => {}
};

class DialogComponent extends Component<Props> {
  state = {
    edit: false,
    title: ''
  }

  componentDidMount = () => {
    const {name} = this.props;
    this.setState({title: name});
  }

  handleAddPhrase = () => {
    const {id, addPhrase} = this.props;
    addPhrase(id);
  }

  handleDeleteDialog = () => {
    const {id, deleteDialog} = this.props;
    deleteDialog(id);
  }

  handleEditToggle = () => {
    this.setState(prevState => ({ edit: !prevState.edit }), () => {
      const {name, updateDialogName, id} = this.props;
      const {title} = this.state;
      if(name !== title) {
        updateDialogName(title, id);
      }
    });
  }

  onEnterPress = (e) => {
    if((e.keyCode || e.which) === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.handleEditToggle();
    }
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  render() {
    const {langs, phrases, id, name, selectedLang} = this.props;
    const {edit, title} = this.state;
    const renderPhrases = phrases.map((phrase, index) => <PhraseComponent
      key={phrase.id}
      index={index}
      dialogName={id}
      langs={phrase.langs}
      selectedLang={selectedLang}
      langOpts={langs}
      />);

    const titleArea = edit ? 
      (<input value={title} onChange={this.handleTitleChange} onKeyPress={this.onEnterPress}/>)
      : (<span role='presentation' onKeyPress={() => {}} onClick={this.handleEditToggle}>{name}</span>);

    return (
      <div className={styles.Dialog}>
        {titleArea}
        <button type='button' onClick={this.handleAddPhrase}>
          AddPhrase
        </button>
        <button type='button' onClick={this.handleDeleteDialog}>
          DeleteDialog
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
