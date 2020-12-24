import {ruleService} from '../_services';
import {ruleConstants} from '../_constants';

export const addRule = dispatch => rule => {
  dispatch({type: ruleConstants.busyInAddRule, payload: true});
  ruleService.addOne(rule)
    .then(
      result => {
        dispatch({type: ruleConstants.busyInAddRule, payload: false});
        dispatch({type: ruleConstants.addOne, payload: result.rule});
        dispatch({type: ruleConstants.showEditModal, payload: {rule: {}, showEditModal: false}});
      }
    ).catch(e => {
    dispatch({type: ruleConstants.busyInAddRule, payload: false});
    dispatch({type: ruleConstants.errorInAddRule, payload: true});
    console.log(e)
  });
}

export const editRule = dispatch => (_id, rule) => {
  dispatch({type: ruleConstants.busyInEditRule, payload: true});
  ruleService.editOne(_id, rule)
    .then(
      result => {
        dispatch({type: ruleConstants.showEditModal, payload: {rule: {}, showEditModal: false}});
        dispatch({type: ruleConstants.busyInEditRule, payload: false});
        dispatch({type: ruleConstants.editOne, payload: result.rule || {}});

      }
    ).catch(e => {
    dispatch({type: ruleConstants.busyInEditRule, payload: false});
    dispatch({type: ruleConstants.errorInEditRule, payload: true});
    console.log(e)
  });
}

export const showRuleModal = dispatch => (rule, open) => {
  return new Promise((resolve, reject) => {
    dispatch({type: ruleConstants.showEditModal, payload: {rule, showEditModal: open}});
    resolve();
  })
}

export const getRules = (dispatch) =>  (query, pagination) => {
  dispatch({type: ruleConstants.fetchingRules, payload: true});
  ruleService.getAll(query, pagination)
    .then(
      result => {
        dispatch({type: ruleConstants.fetchingRules, payload: false});
        dispatch({type: ruleConstants.getAll, payload: result});
        dispatch({type: ruleConstants.paginationRule, payload: pagination})
      }
    ).catch(e => {
    dispatch({type: ruleConstants.fetchingRules, payload: false});
    dispatch({type: ruleConstants.errorFetchingRules, payload: true});
    console.log(e)
  });
}

export const removeUserProfile = (dispatch) => () => {
  return new Promise((resolve, reject) => {
    dispatch({type: ruleConstants.removeProfile});
    resolve();
  })
}