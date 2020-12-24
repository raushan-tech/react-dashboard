import {userService} from '../_services';
import {userConstants} from '../_constants';

export const getUsers = (dispatch) => (query) => {
  userService.getAll(query)
    .then(
      result => {
        dispatch({type: userConstants.getAll, payload: result.data || []});
      }
    ).catch(e => console.log(e));
}

export const showUserProfile = dispatch => user => {
  return new Promise((resolve, reject) => {
    dispatch({type: userConstants.showProfile, payload: user});
    resolve();
  })
}

export const removeUserProfile = (dispatch) => () => {
  return new Promise((resolve, reject) => {
    dispatch({type: userConstants.removeProfile});
    resolve();
  })
}