import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

type Props = {
  message: string,
  onEdit: () => {},
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

  render() {
    const {msg} = this.state;

    return (
      <Textarea autoFocus style={{width:'100%'}} onChange={this.handleMessageEdit} onKeyDown={this.checkEnterPressed} value={msg}/>
    )
  }
}

export default EditTextComponent;
