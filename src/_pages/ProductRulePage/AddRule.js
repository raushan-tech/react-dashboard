import React, {useEffect, useState} from 'react';
import {useSnackbar} from "notistack";
import {addRule, showRuleModal, editRule} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {productService} from '../../_services'
import {
  InputAdornment, List, ListItem, ListItemText, Divider, TextField, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, CircularProgress
} from "@material-ui/core";
import {SearchRounded} from "@material-ui/icons";
import BorderLinearProgress from '../../_components/layout/BorderLinearProgress'

// const BorderLinearProgress = withStyles((theme) => ({
//   root: {
//     height: 10,
//     borderRadius: 5,
//   },
//   colorPrimary: {
//     backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
//   },
//   bar: {
//     borderRadius: 5,
//     backgroundColor: '#1a90ff',
//   },
// }))(LinearProgress);

let searchTimeOut;

export default function FormDialog() {
  const {enqueueSnackbar} = useSnackbar();
  const {showEditModal, rule : ruleReducer} = useSelector(state => state.ruleReducer);
  const dispatch = useDispatch();

  const [rule, setRule] = useState({});
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [fetchProduct, setFetchProduct] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    setRule(ruleReducer);
    if (ruleReducer.productId && ruleReducer.productId._id) {
      setProductName(
        ruleReducer.productId.name + " | " +
        ruleReducer.productId.size + " | " +
        ruleReducer.productId.type + " | " +
        ruleReducer.productId.retailPrice
      );
    }
    if (Boolean(ruleReducer.productId) && !ruleReducer.productId._id) {
      setFetchProduct(true)
      productService.getOne(ruleReducer.productId)
        .then((result = {}) => {
          setFetchProduct(false);
          setProductName(
            result.name + " | " +
            result.size + " | " +
            result.type + " | " +
            result.retailPrice);
        })
        .catch(() => setFetchProduct(false));
    }
  }, [ruleReducer]);


  const handleRule = (key) => (e) => {
    e.persist();
    setRule(prevState => ({...prevState, [key]: e.target.value}))
  }

  const handleSubmit = () => {
    let isError = false;
    if (!Boolean(rule.name)) {
      isError = true;
      enqueueSnackbar('Privileged Customer Name is required', {variant: "warning"});
    }
    if (!Boolean(rule.count)) {
      isError = true;
      enqueueSnackbar('Count is required', {variant: "warning"});
    }
    if (!Boolean(rule.discount)) {
      isError = true;
      enqueueSnackbar('Discount is required', {variant: "warning"});
    }
    if (!Boolean(rule.productId)) {
      isError = true;
      enqueueSnackbar('Product Name is required', {variant: "warning"});
    }

    if (!isError) {
      setSubmit(true);
      if (ruleReducer._id) {
        editRule(dispatch)(ruleReducer._id, rule);
        enqueueSnackbar('Rule is submitted successfully.', {variant: "success"});
      } else {
        addRule(dispatch)(rule);
        enqueueSnackbar('Rule is submitted successfully.', {variant: "success"});
      }
    }
  }

  const handleClose = () => showRuleModal(dispatch)({}, false);

  const handleProductName = (e) => {
    e.persist();
    setFetchProduct(true);
    setProductName(e.target.value);
    if (searchTimeOut) clearTimeout(searchTimeOut);

    searchTimeOut = setTimeout(() => {
      productService.getAll({name: e.target.value})
        .then(result => {
          setFetchProduct(false);
          setProducts(result.products || [])
        }).catch(() => setFetchProduct(false));
    }, 400);
  }

  const handleProductClick = product => () => {
    setProductName(product.name + " | " + product.size + " | " + product.type + " | " + product.retailPrice);
    setRule(prevState => ({...prevState, productId: product._id}));
  }

  return (
    <div>
      <Dialog open={showEditModal} onClose={handleClose} disableBackdropClick aria-labelledby="form-dialog-title">
        <DialogTitle>
          {ruleReducer._id && 'Edit '}
          {!ruleReducer._id && 'Add '}
          Rule
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Privileged Customer Name"
            value={rule.name || ''}
            onChange={handleRule('name')}
            type="text"
            fullWidth
          />

          <TextField
            margin="dense"
            label="Enter product count"
            value={rule.count || ''}
            onChange={handleRule('count')}
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Enter discount"
            value={rule.discount || ''}
            onChange={handleRule('discount')}
            type="text"
            fullWidth
          />
          <div>
            <TextField
              margin="dense"
              label="Search By product name"
              value={productName || ''}
              onChange={handleProductName}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded/>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            {fetchProduct &&
            <BorderLinearProgress/>
            }
            <Divider/>
            <List component="nav" aria-label="secondary mailbox folders" dense>
              {
                products.map(product => (
                  <ListItem button key={product._id} onClick={handleProductClick(product)}
                            selected={product._id === rule.productId}>
                    <ListItemText
                      primary={product.name + " | " + product.size + " | " + product.type + " | " + product.retailPrice}/>
                  </ListItem>
                ))
              }
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button disabled={isSubmit} onClick={handleSubmit} color="primary">
            {ruleReducer._id && 'Edit'}
            {!ruleReducer._id && 'Submit'}
            {isSubmit && <CircularProgress size={10}/>}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
