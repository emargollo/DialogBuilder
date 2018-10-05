import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as BuilderActions from '../../actions/builder';
import DialogComponent from './DialogComponent';
import styles from './Dialog.css';

type Props = {
  langs: any,
  selectedLang: string,
  dialogs: Array,
  addDialog: () => {}
};
class DataComponent extends Component<Props> {

  handleAddDialog = () => {
    const {selectedLang, addDialog} = this.props;
    addDialog(selectedLang);
  }

  render() {
    const {langs, selectedLang, dialogs} = this.props;

    const dialogObjects = dialogs
      .map(dialog => <DialogComponent
        key={dialog.id}
        id={dialog.id}
        name={dialog.name}
        phrases={dialog.phrases}
        selectedLang={selectedLang}
        langs={langs}
        />);

    return (
      <div className={styles.Data}>
        {dialogObjects}
        <button type='button' onClick={this.handleAddDialog}>Add Dialog</button>
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
)(DataComponent);
