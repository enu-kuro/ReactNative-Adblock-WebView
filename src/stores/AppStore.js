import {AsyncStorage} from 'react-native';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter }  from 'events';
import AppConstants  from '../constants/AppConstants';
const ActionTypes = AppConstants.ActionTypes;
import _ from 'lodash';

let CHANGE_EVENT = 'change';
let currentViewName = '';
let storedValues = [];

let AppStore = _.assign({}, EventEmitter.prototype, {

  init() {
    AsyncStorage.getAllKeys()
      .then(keys => {
        return AsyncStorage.multiGet(keys)
      })
      .then(valueArray => {
        let values = {};
        valueArray.forEach((value) => {
          values[value[0]] = value[1];
        });
        console.log(storedValues);
        storedValues = values;
      })
      .catch(err => {
        console.log('AsyncStorage.err:' ,err);
      });
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrentViewName() {
    return currentViewName;
  },

  getStringForKey(key, defaultValue) {
    return storedValues[key] ? storedValues[key] : defaultValue ? defaultValue : '';
  },

  getBoolForKey(key, defaultValue) {
    let value = storedValues[key];
    if (typeof value === 'string'){
      value =  (storedValues[key] === 'true');
    }
    return value !== undefined ? value : defaultValue;
  },

});

AppDispatcher.register(function(action) {
  switch(action.type) {
  case ActionTypes.SET_CURRENT_VIEW:
    currentViewName = action.viewName;
    AppStore.emitChange();
    break;
  case ActionTypes.ENABLE_ADBLOCK:
    setAdblockSettings('enable_adblock', action.value);
    break;
  default:
  }
});

let setAdblockSettings = (key, value) => {
  AsyncStorage.setItem(key, String(value))
    .then(() => {
      storedValues[key] = value;
      console.log('AsyncStorage ' + key + ': ' + value);
    })
    .catch((error) => console.log('AsyncStorage error: ' + error.message))
    .done();
}

export default AppStore;
