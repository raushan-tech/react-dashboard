import {combineReducers} from 'redux';
import {userReducer} from './user.reducer';
import {productReducer} from './product.reducer';
import {ruleReducer} from './rule.reducer';
import { orderReducer } from './order.reducer'

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  ruleReducer,
  orderReducer
});

export default rootReducer;