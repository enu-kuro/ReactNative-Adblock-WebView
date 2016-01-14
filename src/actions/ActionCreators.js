import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
var ActionTypes = AppConstants.ActionTypes;

var ActionCreators = {
  transitionTo(viewName) {
    AppDispatcher.dispatch({
      type: ActionTypes.SET_CURRENT_VIEW,
      viewName: viewName
    });
  },
  
  enableAdblock(value) {
    AppDispatcher.dispatch({
      type: ActionTypes.ENABLE_ADBLOCK,
      value: value
    });
  }
};

export default ActionCreators;
