import React, {useEffect, useState} from 'react';
import {
  Divider, InputAdornment, TextField,
  Typography, Button
} from "@material-ui/core";
import {SearchRounded} from "@material-ui/icons";
import {productService, ruleService} from "../../_services";
import BorderLinearProgress from '../../_components/layout/BorderLinearProgress';
import SelectPrivilegeCustomer from "./SelectPrivilegeCustomer";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from './Table';
import {setCustomerToReducer, setOrderRules, removeAllOrders} from '../../_actions'
import {useDispatch} from "react-redux";
var searchTimeOut;

function OrderForm() {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [fetchProduct, setFetchProduct] = useState(false);
  const [privilegeCustomers, setPrivilegeCustomers] = useState([]);
  const [customer, setCustomer] = useState('');


  useEffect(() => {
    ruleService.getAll().then(result => {
      setOrderRules(dispatch)(result.rules);
      setPrivilegeCustomers(
        result.rules
          .map(rule => rule.name)
          .filter((value, index, self)=>self.indexOf(value)===index)
      );
    });
  },[])

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

  const onSelectCustomer = newCustomer => {
    setCustomer(newCustomer);
    setCustomerToReducer(dispatch)(newCustomer);
  };

  return (
    <>
      {customer &&
        <div>
          <Typography variant="h6" gutterBottom>
            Billing for  <span style={{color: 'blue'}}>{ customer }</span>
          </Typography>
        </div>
      }

      <SelectPrivilegeCustomer privilegeCustomers={privilegeCustomers}
                               onSelectCustomer={onSelectCustomer}>

      </SelectPrivilegeCustomer>

      {customer &&
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
          {products.length !== 0 &&
            <Table products={products}/>
          }
        </div>
      }
      <br/>
      {customer &&
      <Button
        variant="contained"
        color="secondary"
        size={"small"}
        onClick={() => {
          setCustomer('');
          removeAllOrders(dispatch)();
        }}
        startIcon={<DeleteIcon/>}
      >
        Cancel Order
      </Button>}
    </>
  );
}

export {OrderForm};