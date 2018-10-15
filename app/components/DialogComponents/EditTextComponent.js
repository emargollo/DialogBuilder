import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import { Button } from 'react-bootstrap';
import HOC from '../../hoc/HOC';
import Backdrop from '../AuxComponents/BackdropComponent';
import styles from './Dialog.css';

type Props = {
  message: string,
  onEdit: () => {},
  toggleEdit: () => {},
  onEnter: () => {}
};

class EditTextComponent extends Component<Props> {
  state = {
    msg: ''
  }

  componentDidMount = () => {
    const {message} = this.props;
    this.setState({msg: message});
  }

  handleMessageEdit = (event) => {
    this.setState({msg: event.target.value});
  }

  checkEnterPressed = (e) => {
    const {message, onEdit, onEnter} = this.props;
    const {msg} = this.state;
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      if(message !== msg) {
        onEdit({target:{value: msg}});
      }
    }
    onEnter(e);
  }

  handleSave = (e) => {
    console.log('salvar');
    const {message, onEdit, toggleEdit} = this.props;
    const {msg} = this.state;
    if(message !== msg) {
      onEdit({target:{value: msg}});
    }
    toggleEdit(e);
  }

  render() {
    const {msg} = this.state;
    const {toggleEdit} = this.props;

    return (
      <HOC>
        <Backdrop click={toggleEdit}/>
        <Textarea className={styles.editText} autoFocus onChange={this.handleMessageEdit} onKeyDown={this.checkEnterPressed} value={msg}/>
        <Button bsStyle="success" className={styles.saveBtn} onClick={this.handleSave} type='button'>Salvar</Button>
      </HOC>
    )
  }
}

export default EditTextComponent;
