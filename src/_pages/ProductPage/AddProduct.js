import React, {useEffect, useState} from 'react';
import {
  InputAdornment, TextField, Button, Dialog, DialogActions, FormControl, Input,
  DialogContent, DialogTitle, CircularProgress, MenuItem, InputLabel
} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {addProduct, showProductModal, editProduct} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";

const productSizes = ['Small', 'Medium', 'Large'],
  productTypes = ["Pizza", "Cookies", "Drinking Water"];

export default function FormDialog() {
  const {enqueueSnackbar} = useSnackbar();
  const productReducer = useSelector(state => state.productReducer.product);
  const showEditModal = useSelector(state => state.productReducer.showEditModal);
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [isSubmit, setSubmit] = useState(false);


  useEffect(() => {
    setProduct(productReducer);
    return () => {
      setSubmit(false);
    }
  }, [productReducer]);

  const handleProduct = (key) => (e) => {
    e.persist();
    setProduct(prevState => ({...prevState, [key]: e.target.value}))
  }

  const handleSubmit = () => {
    let isError = false;
    if (!Boolean(product.name)) {
      isError = true;
      enqueueSnackbar('Name is required', {variant: "warning"});
    }
    if (!Boolean(product.size)) {
      isError = true;
      enqueueSnackbar('Size is required', {variant: "warning"});
    }
    if (!Boolean(product.type)) {
      isError = true;
      enqueueSnackbar('Type is required', {variant: "warning"});
    }
    if (!Boolean(product.retailPrice)) {
      isError = true;
      enqueueSnackbar('Retail Price is required', {variant: "warning"});
    }
    if (!isError) {
      setSubmit(true);
      if(productReducer._id){
        editProduct(dispatch)(productReducer._id, product);
        enqueueSnackbar('Product is submitted successfully.', {variant: "success"});
      }else {
        addProduct(dispatch)(product)
        enqueueSnackbar('Product is submitted successfully.', {variant: "success"});
      }
    }
  }

  const handleClose = () => showProductModal(dispatch)({}, false);

  return (
    <div>
      <Dialog open={showEditModal} onClose={handleClose} disableBackdropClick aria-labelledby="form-dialog-title">
        <DialogTitle>
          {productReducer._id && 'Edit '}
          {!productReducer._id && 'Add '}
           Product
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Product Name"
            value={product.name || ''}
            onChange={handleProduct('name')}
            type="text"
            fullWidth
          />
          <TextField
            select
            label="Select Product Size"
            value={product.size || ''}
            onChange={handleProduct('size')}
            type="text"
            fullWidth
          >
            {productSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select Product Type"
            value={product.type || ''}
            onChange={handleProduct('type')}
            type="text"
            fullWidth
          >
            {productTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">Retail Price</InputLabel>
            <Input
              value={product.retailPrice || ''}
              onChange={handleProduct('retailPrice')}
              type="number"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={isSubmit} onClick={handleSubmit} color="primary">
            {productReducer._id && 'Edit'}
            {!productReducer._id && 'Submit'}
            {isSubmit && <CircularProgress size={10}/>}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
