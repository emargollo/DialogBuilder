import React from 'react';

type Props = {
  click: () => {}
};

export default function backdrop(props: Props) {
  const {click} = props;
  return (
    <div draggable={false} role='presentation' onClick={click} style={backDropStyle}/>
  )
}

const backDropStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: '1'
};
