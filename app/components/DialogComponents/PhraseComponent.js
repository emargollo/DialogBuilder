import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LangComponent from './LangComponent';
import styles from './Dialog.css';
import * as BuilderActions from '../../actions/builder';

type Props = {
  selectedLang: string,
  langs: array,
  index: number,
  dialogId: string,
  editText: () => {},
  deleteText: () => {},
  dragStart: () => {},
  dragEnd: () => {}
};

class PhraseComponent extends Component<Props> {

  state = {
    edit: false
  }

  componentDidMount = () => {
    const {selectedLang, langs} = this.props;
    const currentLang = langs.filter(lang => lang.id === selectedLang)
      [0] || {id: selectedLang, message: ''};
    if(currentLang.message === '') {
      this.setState({edit: true});
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {selectedLang: nextLang} = nextProps;
    const {selectedLang: currLang} = this.props;

    if(nextLang !== currLang) {
      this.setState({edit: false});
    }
  }

  handleEditToggle = () => {
    this.setState(prevState => ({ edit: !prevState.edit }));
  }

  handleDeletePhrase = () => {
    const { index, dialogId, deleteText} = this.props;
    deleteText(index, dialogId);
  }

  handleLangEdit = (event) => {
    const { selectedLang, index, dialogId, editText} = this.props;
    const message = event.target.value;
    const lang = {
      id: selectedLang,
      message
    };
    editText(lang, index, dialogId);
  }

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.handleEditToggle();
    }
  }

  render() {
    const {selectedLang, langs, dragStart, dragEnd, index} = this.props;
    const {edit} = this.state;
    console.log(langs[0].message);
    const currentLang = langs.filter(lang =>
      lang.id === selectedLang)[0]
      || {id: selectedLang, message: ''};

    return (
      <div
        draggable
        className={styles.Phrase}
        onDragStart={(e) => dragStart(e, index)}
        onDragEnd={dragEnd}
      >
        <div>
          <span className={styles.idText}>ID:{index+1}</span>
          <IconButton className={styles.deleteBtn} onClick={this.handleDeletePhrase} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
        <LangComponent
          message={currentLang.message}
          edit={edit}
          onEdit={this.handleLangEdit}
          onEnter={this.onEnterPress}
          toggleEdit={this.handleEditToggle}
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
