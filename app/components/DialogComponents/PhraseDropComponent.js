
import React, {Component} from 'react';
import styles from './Dialog.css';

type Props = {
  children: any,
  index: number,
  dragOver: () => {}
};

export default class PhraseDropComponent extends Component<Props> {
  render () {
    const {children, dragOver, index} = this.props;
    return (
      <div className={styles.dropArea} onDragOver={(e) => dragOver(e, index)}>
        {children}
      </div>
    );
  }
}
