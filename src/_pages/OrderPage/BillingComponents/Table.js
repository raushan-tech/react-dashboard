import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import CurrencyIcon from '@material-ui/icons/AttachMoney';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {addOrder, removeOrder} from '../../../_actions';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const getToatalDiscount = (orders, customer, rules) => {
  let customerRules = rules.filter(rule => rule.name === customer);
  let totalDiscount = 0, totalPrice= 0;
  let distinctOrderType = {};
  orders.forEach(order => {
    totalPrice += parseFloat(order.retailPrice);
    if(distinctOrderType.hasOwnProperty(order._id)){
      distinctOrderType[order._id] = distinctOrderType[order._id] + 1;
    }else {
      distinctOrderType[order._id] = 1;
    }
  });

  customerRules.forEach(rule => {
        if (distinctOrderType.hasOwnProperty(rule.productId._id) && parseInt(distinctOrderType[rule.productId._id] / rule.count)) {
          totalDiscount += (rule.discount * parseInt(distinctOrderType[rule.productId._id] / rule.count));
        }
  });

  return `(${totalPrice} - ${totalDiscount}) = $ ${totalPrice - totalDiscount}`;
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    maxHeight: "100xp"
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: "auto"
  },
  tableContainer: {
    maxHeight: "700px"
  }
});

export default function OrderTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {orders, customer, rules} = useSelector(state => state.orderReducer);

  const handleAddOrder = (product) => () => addOrder(dispatch)(product);
  const handleRemoveOrder = (product) => () => removeOrder(dispatch)(product);


  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tolal Price</TableCell>
            <TableCell style={{color: 'red'}}>$
              {
                orders.reduce(
                  (accumulator, currentValue) => accumulator + parseInt(currentValue.retailPrice)
                  , 0)
              }
            </TableCell>
            <TableCell align="center">Total Discounted Price</TableCell>
            <TableCell align="right" style={{color: 'blue'}}>{getToatalDiscount(orders, customer, rules)}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Actions</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Size</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Retail Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <StyledTableRow key={order._id + index}>
              <StyledTableCell align="center">
                <Button size="small" color="primary" onClick={handleAddOrder(order)}>
                  <AddIcon/>
                </Button>
                <Button size="small" color="primary" onClick={handleRemoveOrder(order)}>
                  <RemoveIcon/>
                </Button>
              </StyledTableCell>
              <StyledTableCell component="th" scope="order">
                {order.name}
              </StyledTableCell>
              <StyledTableCell align="center">{order.size}</StyledTableCell>
              <StyledTableCell align="center">{order.type}</StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h4">
                  {order.retailPrice && <CurrencyIcon/>}
                  {order.retailPrice || 'NA'}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}