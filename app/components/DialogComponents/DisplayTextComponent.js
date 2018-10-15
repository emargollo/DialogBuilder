import React from 'react';
import styles from './Dialog.css';

type Props = {
  message: string,
  toggleEdit: () => {}
};

const checkForColorTags = (message: string) => {
  if(message.includes('<color')) {
    const tagStart = message.indexOf('<color');
    const tagEnd = message.indexOf('</color>') + ('</color>').length;
    const str1 = message.substring(0, tagStart);
    const str2 = message.substring(tagStart, tagEnd);
    const str3 = message.substring(tagEnd);
    return [str1, str2, ...checkForColorTags(str3)];
  }
  return [message];
}

const messageToSpam = (msg, index) => {
  let color = '#D89936';
  let message = msg;
  if(msg.includes('<color')) {
    color = msg.substr(msg.indexOf('=')+1, 7);
    message = msg.substr(msg.indexOf('>')+1);
    message = message.substring(0, message.indexOf('</color'));
  }
  return (
    <span key={index} style={{color}}>{message}</span>
  )
}

const displayTextComponent = (props: Props) => {
  const {message, toggleEdit} = props;
  let spams = (<span style={{color: '#777'}}>Insira a Frase aqui</span>);

  if (message !== '') {
    const messageParts = checkForColorTags(message);
    spams = messageParts.map((msg, index) => messageToSpam(msg, index));
  }

  return (
    <div className={styles.displayText} role='presentation' onClick={toggleEdit}>{spams}</div>
  )
}

export default displayTextComponent;
