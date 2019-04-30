import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IDispatchProps, IPropsFromState, IProps } from "../components/ReadList";
import ReadList from "../components/ReadList";
import { IRootState } from "../reducers/root-reducer";
import { getReadList } from "../actions/read-actions";

const mapStateToProps = (state: IRootState): IPropsFromState => {
  return {
      readList: state.readState.readList
  };
};
 
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>): IDispatchProps => {
  return {
      getReadList: () => dispatch(getReadList(dispatch)),
  };
};

export default connect<any, IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(ReadList as any);