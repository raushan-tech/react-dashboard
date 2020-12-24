import {orderConstants} from "../_constants";

export const addOrder = dispatch => order => {
  return new Promise((resolve, reject) => {
    dispatch({type: orderConstants.addOrder, payload: order});
    resolve();
  })
}

export const removeOrder = dispatch => order => {
  return new Promise((resolve, reject) => {
    dispatch({type: orderConstants.removeOrder, payload: order});
    resolve();
  });
}

export const removeAllOrders = dispatch => () => {
  return new Promise((resolve, reject) => {
    dispatch({type: orderConstants.removeAllOrders});
    resolve();
  });
}

export const setCustomerToReducer = dispatch => newCustomer => {
  return new Promise((resolve, reject) => {
    dispatch({type: orderConstants.setCustomerToReducer, payload: newCustomer});
    resolve();
  });
}

export const setOrderRules = dispatch => rules => {
  return new Promise((resolve, reject) => {
    dispatch({type: orderConstants.setOrderRules, payload: rules});
    resolve();
  });
}