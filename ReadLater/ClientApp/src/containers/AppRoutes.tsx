import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { authenticate } from "../actions/user-actions";
import { IDispatchProps, IProps, IState, AppRoutes, IStateProps } from "../components/AppRoutes";
import { IRootState } from "../reducers/root-reducer";
import { getPocketAccount } from "../actions/pocket-actions";

const mapStateToProps = (state: IRootState, props: IProps): IStateProps => {
  return {
      isAuthenticated: state.userState.isAuthenticated,
      isPocketAuthorized: state.userState.userAccount ? state.userState.userAccount.isPocketAuthorized : false
  };
};

 
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>): IDispatchProps => {
  return {
      authenticate: () => dispatch(authenticate(dispatch)),
      getPocketAccount: () => dispatch(getPocketAccount(dispatch))
  };
};

export default connect<any, IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(AppRoutes as any);