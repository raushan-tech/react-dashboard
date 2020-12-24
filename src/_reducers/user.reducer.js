import {userConstants} from '../_constants';

export function userReducer(state = {users: [], user: {}}, action) {
  switch (action.type) {

    case userConstants.getAll:
      return {
        ...state,
        users: [...action.payload]
      };

    case userConstants.showProfile:
      return {
        ...state,
        user: {...action.payload}
      };

    case userConstants.removeProfile:
      return {
        ...state,
        user: {}
      };

    default:
      return state
  }
}