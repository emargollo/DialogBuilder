import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Builder from '../components/Builder';
import * as BuilderActions from '../actions/builder';

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
)(Builder);
