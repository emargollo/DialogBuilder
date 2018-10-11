import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import 'array.prototype.move';
import * as BuilderActions from '../../actions/builder';
import PhraseComponent from './PhraseComponent';
import PhraseDropComponent from './PhraseDropComponent';
import styles from './Dialog.css';

type Props = {
  selectedLang: string,
  phrases: array,
  langs: array,
  name: string,
  id: string,
  updateDialogName: () => {},
  deleteDialog: () => {},
  addPhrase: () => {},
  reorderPhrases: () => {}
};

class DialogComponent extends Component<Props> {
  state = {
    edit: false,
    title: '',
    phrases: [],
    dragIndex: null
  }

  componentDidMount = () => {
    const {name, phrases} = this.props;
    this.setState({title: name, phrases});
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

  handleDragOverPhrase = (event, index) => {
    event.preventDefault();
    const {dragIndex, phrases} = this.state;
    if(dragIndex !== index) {
      console.log(`Dragging ${dragIndex} over ${index}, horray`);
      phrases.move(dragIndex, index);
      this.setState({
        phrases,
        dragIndex: index
      });
    }
  }

  handleDragStart = (event, index) => {
    event.target.style.opacity = '0.2'; // eslint-disable-line no-param-reassign
    this.setState({dragIndex: index});
  }

  handleDragEnd = (event) => {
    // TODO: send action to update reducer
    const {phrases} = this.state;
    const {id, reorderPhrases} = this.props;
    reorderPhrases(id, phrases);
    event.target.style.opacity = '1'; // eslint-disable-line no-param-reassign
  }

  render() {
    const {langs, id, name, selectedLang} = this.props;
    const {edit, title, phrases, dragIndex} = this.state;
    const renderPhrases = phrases.map((phrase, index) => (
      <PhraseDropComponent
        key={phrase.id}
        index={index}
        dragOver={this.handleDragOverPhrase}
      >
        <PhraseComponent
          index={index}
          dialogId={id}
          langs={phrase.langs}
          selectedLang={selectedLang}
          langOpts={langs}
          dragStart={this.handleDragStart}
          dragEnd={this.handleDragEnd}
          show={dragIndex !== index}
        />
      </PhraseDropComponent>
    ));

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
