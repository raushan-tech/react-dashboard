import {orderConstants} from '../_constants';

const defaultOrderState = {orders: [], order: {}, customer: {}, rules: []};

export function orderReducer(state = defaultOrderState, action) {
  switch (action.type) {

    case orderConstants.addOrder:
      return {
        ...state,
        orders: [{...action.payload, customer: state.customer}, ...state.orders]
      };

    case orderConstants.removeOrder:
      let newOrders = [], count = 0;
      for(let i = 0; i < state.orders.length; i++){
        if(state.orders[i]._id === action.payload._id && count === 0){
          count = count + 1;
        }else {
          newOrders.push(state.orders[i]);
        }
      }
      return {
        ...state,
        orders: newOrders
      };

    case orderConstants.setCustomerToReducer:
      return {
        ...state,
        orders: state.orders.map(order => {
          return {...order, customer: action.payload}
        }),
        customer: action.payload
      };

    case orderConstants.setOrderRules:
      return {
        ...state,
        rules: action.payload,
      };

    case orderConstants.removeAllOrders:
      return {
        ...state,
        orders: []
      };

    default:
      return state
  }
}