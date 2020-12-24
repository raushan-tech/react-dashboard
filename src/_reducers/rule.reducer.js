import {productConstants, ruleConstants} from '../_constants';

const defaultRuleState = {
  rules: [], rule: {}, showEditModal: false,
  errorInAddRule: false, busyInAddRule: false,
  errorInEditRule: false,
  fetchingRules: false, errorFetchingRules: false,
  pageNumber: 1, itemsPerPage: 3, totalItems: 0
};

export function ruleReducer(state = defaultRuleState, action) {
  switch (action.type) {

    case ruleConstants.getAll:
      return {
        ...state,
        rules: [...action.payload.rules],
        totalItems: action.payload.count

      };

    case ruleConstants.addOne:
      return {
        ...state,
        rules: [action.payload, ...state.rules]
      }

    case ruleConstants.editOne:
      return {
        ...state,
        rules: state.rules.map(rule => {
          if (rule._id === action.payload._id){
            return action.payload;
          }
          return rule
        })
      }

    case ruleConstants.showEditModal:
      return {
        ...state,
        rule: {...action.payload.rule},
        showEditModal: action.payload.showEditModal
      };

    case ruleConstants.busyInAddRule:
      return {
        ...state,
        busyInAddRule: action.payload
      };

    case ruleConstants.errorInAddRule:
      return {
        ...state,
        errorInAddRule: action.payload
      };
    case ruleConstants.fetchingRules:
      return {
        ...state,
        fetchingRules: action.payload
      };
    case ruleConstants.errorFetchingRules:
      return {
        ...state,
        errorFetchingRules: action.payload
      };
    case productConstants.pagination:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state
  }
}