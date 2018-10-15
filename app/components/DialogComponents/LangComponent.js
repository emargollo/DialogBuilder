import React from 'react';
import DisplayTextComponent from './DisplayTextComponent';
import EditTextComponent from './EditTextComponent';

type Props = {
  message: string,
  edit: boolean,
  onEdit: () => {},
  toggleEdit: () => {},
  onEnter: () => {}
};

const langComponent = (props: Props) => {
  const {
    message,
    edit,
    onEdit,
    onEnter,
    toggleEdit
  } = props;
  if(edit) {
    return (
      <EditTextComponent
        onEdit={onEdit}
        toggleEdit={toggleEdit}
        onEnter={onEnter}
        message={message}
      />
    );
  }
  return (
    <DisplayTextComponent
      message={message}
      toggleEdit={toggleEdit}
    />
  );
}

export default langComponent;
