import React from 'react';
import DisplayTextComponent from './DisplayTextComponent';
import EditTextComponent from './EditTextComponent';

type Props = {
  message: string,
  edit: boolean,
  onEdit: () => {}
};

const langComponent = (props: Props) => {
  const {
    message,
    edit,
    onEdit
  } = props;
  if(edit) {
    return (
      <EditTextComponent
        onEdit={onEdit}
        message={message}
      />
    );
  }
  return (
    <DisplayTextComponent
      message={message}
    />
  );
}

export default langComponent;
