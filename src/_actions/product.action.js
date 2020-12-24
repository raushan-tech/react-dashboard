import {productService} from '../_services';
import {productConstants} from '../_constants';

export const addProduct = dispatch => product => {
  dispatch({type: productConstants.busyInAddProduct, payload: true});
  productService.addOne(product)
    .then(
      result => {
        dispatch({type: productConstants.busyInAddProduct, payload: false});
        dispatch({type: productConstants.addOne, payload: result.product});
        dispatch({type: productConstants.showEditModal, payload: {product: {}, showEditModal: false}});
      }
    ).catch(e => {
    dispatch({type: productConstants.busyInAddProduct, payload: false});
    dispatch({type: productConstants.errorInAddProduct, payload: true});
    console.log(e)
  });
};

export const editProduct = dispatch => (_id, product) => {
  dispatch({type: productConstants.busyInEditProduct, payload: true});
  productService.editOne(_id, product)
    .then(
      result => {
        dispatch({type: productConstants.busyInEditProduct, payload: false});
        dispatch({type: productConstants.editOne, payload: result.product || {}});
        dispatch({type: productConstants.showEditModal, payload: {product: {}, showEditModal: false}});

      }
    ).catch(e => {
    dispatch({type: productConstants.busyInEditProduct, payload: false});
    dispatch({type: productConstants.errorInEditProduct, payload: true});
    console.log(e)
  });
};

export const showProductModal = dispatch => (product, open) => {
  return new Promise((resolve, reject) => {
    dispatch({type: productConstants.showEditModal, payload: {product, showEditModal: open}});
    resolve();
  });
};

export const getProducts = (dispatch) => (query, pagination) => {
  return new Promise((resolve, reject) => {
    dispatch({type: productConstants.fetchingProducts, payload: true});
    productService.getAll(query, pagination)
      .then(
        result => {
          dispatch({type: productConstants.fetchingProducts, payload: false});
          dispatch({type: productConstants.getAll, payload: result});
          dispatch({type: productConstants.paginationProduct, payload: pagination})
          resolve(result.products);
        }
      ).catch(e => {
      dispatch({type: productConstants.fetchingProducts, payload: false});
      dispatch({type: productConstants.errorFetchingProducts, payload: true});
      reject([]);
      console.log(e)
    });
  });
};

export const removeUserProfile = (dispatch) => () => {
  return new Promise((resolve, reject) => {
    dispatch({type: productConstants.removeProfile});
    resolve();
  });
};