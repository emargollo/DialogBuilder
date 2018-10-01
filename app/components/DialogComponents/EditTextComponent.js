import React from 'react';
import Textarea from 'react-textarea-autosize';

type Props = {
  message: string,
  onEdit: () => {}
};

const editTextComponent = (props: Props) => {
  const {message, onEdit} = props;

  return (
    <Textarea style={{width:'100%'}} onChange={onEdit} value={message}/>
  )
}

export default editTextComponent;
