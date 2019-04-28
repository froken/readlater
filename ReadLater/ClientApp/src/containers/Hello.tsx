import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IDispatchProps,  IState } from "../components/Hello";
import Hello from "../components/Hello";
import { loginWithPocket } from "../actions/pocket-actions";

const mapStateToProps = (state: IState, props: any): any => ({ });
 
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>): IDispatchProps => {
  return {
      loginWithPocket: () => dispatch(loginWithPocket(dispatch)),
  };
};

export default connect<any, IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(Hello as any);